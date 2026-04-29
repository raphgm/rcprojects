import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit3, Trash2, Save, X, BookOpen, Calendar, Tag, Lock } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, canWriteTutorials, UserProfile } from '../firebase';

interface BlogPost {
  id: string;
  topic: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'realcloud_blog_posts';

const defaultPosts: BlogPost[] = [
  {
    id: 'welcome',
    topic: 'Getting Started',
    title: 'Welcome to the Realcloud Tutorials Blog',
    content: `# Welcome!

This blog is your space to write and share tutorials based on any cloud, DevOps, or Linux topic you're learning.

## How to use it

1. Click **New Tutorial** to start writing.
2. Pick a **Topic** (e.g. Kubernetes, Terraform, Linux Networking).
3. Use **Markdown** to format — headings (\`#\`), bullet lists (\`-\`), and \`\`\`fenced code blocks\`\`\`.
4. Hit **Save** — your tutorial stays in your browser.

## Example

\`\`\`bash
kubectl get pods -A
\`\`\`

Happy writing!`,
    author: 'Raphael',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

// Lightweight markdown renderer (headings, code blocks, inline code, bullet lists, paragraphs).
const renderMarkdown = (md: string): React.ReactNode[] => {
  const lines = md.split('\n');
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      out.push(
        <pre key={key++} className="bg-zinc-900 text-zinc-100 p-4 rounded-xl overflow-x-auto text-sm font-mono my-4">
          {lang && <div className="text-xs text-zinc-500 mb-2 font-mono uppercase tracking-wider">{lang}</div>}
          <code>{buf.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      out.push(<h3 key={key++} className="text-lg font-bold text-zinc-900 mt-5 mb-2">{line.slice(4)}</h3>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      out.push(<h2 key={key++} className="text-2xl font-bold text-zinc-900 mt-6 mb-3">{line.slice(3)}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      out.push(<h1 key={key++} className="text-3xl font-bold text-zinc-900 mt-6 mb-4">{line.slice(2)}</h1>);
      i++;
      continue;
    }

    // Bullet list
    if (line.match(/^[-*]\s+/) || line.match(/^\d+\.\s+/)) {
      const items: string[] = [];
      const ordered = !!line.match(/^\d+\.\s+/);
      while (
        i < lines.length &&
        (lines[i].match(/^[-*]\s+/) || lines[i].match(/^\d+\.\s+/))
      ) {
        items.push(lines[i].replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, ''));
        i++;
      }
      const ListTag = ordered ? 'ol' : 'ul';
      out.push(
        <ListTag
          key={key++}
          className={`${ordered ? 'list-decimal' : 'list-disc'} pl-6 my-3 space-y-1 text-zinc-700`}
        >
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph (consume consecutive non-special lines)
    const para: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].match(/^[-*]\s+/) &&
      !lines[i].match(/^\d+\.\s+/)
    ) {
      para.push(lines[i]);
      i++;
    }
    out.push(
      <p key={key++} className="text-zinc-700 leading-relaxed my-3">
        {renderInline(para.join(' '))}
      </p>
    );
  }

  return out;
};

// Inline: backticks for code, **bold**, *italic*
const renderInline = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('`')) {
      parts.push(
        <code key={key++} className="bg-zinc-100 text-rose-600 px-1.5 py-0.5 rounded text-sm font-mono">
          {tok.slice(1, -1)}
        </code>
      );
    } else if (tok.startsWith('**')) {
      parts.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('*')) {
      parts.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [canWrite, setCanWrite] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Watch auth state → resolve role → decide write permission
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCanWrite(false);
        setUserEmail(null);
        return;
      }
      setUserEmail(user.email);
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        const role = (snap.exists() ? (snap.data() as UserProfile).role : 'user') as UserProfile['role'];
        setCanWrite(canWriteTutorials(user.email, role));
      } catch {
        setCanWrite(canWriteTutorials(user.email, 'user'));
      }
    });
    return () => unsub();
  }, []);

  // Load posts on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setPosts(JSON.parse(raw));
      } else {
        setPosts(defaultPosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      }
    } catch {
      setPosts(defaultPosts);
    }
  }, []);

  // Persist posts
  const persist = (next: BlogPost[]) => {
    setPosts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const topics = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => p.topic && s.add(p.topic));
    return Array.from(s).sort();
  }, [posts]);

  const visiblePosts = useMemo(() => {
    const list = filter === 'all' ? posts : posts.filter((p) => p.topic === filter);
    return [...list].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [posts, filter]);

  const activePost = posts.find((p) => p.id === activeId) || null;

  const startNew = () => {
    setEditing({
      id: `post-${Date.now()}`,
      topic: '',
      title: '',
      content: '# Your tutorial title\n\nStart writing your tutorial here. Use Markdown for formatting.\n\n## Steps\n\n1. First step\n2. Second step\n\n```bash\n# Example command\necho "hello"\n```',
      author: 'You',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setActiveId(null);
  };

  const startEdit = (post: BlogPost) => {
    setEditing({ ...post });
    setActiveId(null);
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = () => {
    if (!editing) return;
    if (!editing.title.trim() || !editing.topic.trim()) {
      alert('Please provide both a Topic and a Title.');
      return;
    }
    const exists = posts.some((p) => p.id === editing.id);
    const next = exists
      ? posts.map((p) => (p.id === editing.id ? { ...editing, updatedAt: Date.now() } : p))
      : [...posts, { ...editing, updatedAt: Date.now() }];
    persist(next);
    setEditing(null);
    setActiveId(editing.id);
  };

  const deletePost = (id: string) => {
    if (!confirm('Delete this tutorial? This cannot be undone.')) return;
    persist(posts.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
  };

  return (
    <section id="blog" className="py-24 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-6">
            Tutorials Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            Write your own <span className="text-brand-blue font-mono font-medium">tutorials.</span>
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            An editable space — pick a topic, write in Markdown, save, and revisit anytime.
          </p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${
                filter === 'all'
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
              }`}
            >
              All
            </button>
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${
                  filter === t
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={startNew}
            disabled={!canWrite}
            title={canWrite ? 'Write a new tutorial' : 'Only editors and owners can write tutorials'}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              canWrite
                ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }`}
          >
            {canWrite ? <Plus className="w-4 h-4" /> : <Lock className="w-4 h-4" />} New Tutorial
          </button>
        </div>

        {!canWrite && (
          <div className="mb-8 flex items-start gap-3 px-5 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
            <Lock className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              Tutorials are read-only. {userEmail ? <>Signed in as <strong>{userEmail}</strong> — only editors and the owner can publish tutorials.</> : <>Sign in as an editor or the owner to publish tutorials.</>}
            </span>
          </div>
        )}

        {/* Editor or list / detail */}
        <AnimatePresence mode="wait">
          {editing ? (
            <Editor
              key="editor"
              post={editing}
              onChange={setEditing}
              onSave={saveEdit}
              onCancel={cancelEdit}
            />
          ) : activePost ? (
            <Detail
              key={`detail-${activePost.id}`}
              post={activePost}
              onBack={() => setActiveId(null)}
              onEdit={() => startEdit(activePost)}
              onDelete={() => deletePost(activePost.id)}
              canWrite={canWrite}
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visiblePosts.length === 0 ? (
                <div className="col-span-full bg-white border border-dashed border-zinc-300 rounded-3xl p-12 text-center">
                  <BookOpen className="w-10 h-10 text-zinc-300 mx-auto mb-4" />
                  <p className="text-zinc-500 text-sm">
                    No tutorials yet.{canWrite && <> Click <strong>New Tutorial</strong> to write one.</>}
                  </p>
                </div>
              ) : (
                visiblePosts.map((p) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-xl hover:border-zinc-300 transition-all cursor-pointer group"
                    onClick={() => setActiveId(p.id)}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <Tag className="w-3 h-3" /> {p.topic || 'Uncategorized'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-zinc-500 line-clamp-3 mb-4">
                      {p.content.replace(/[#*`]/g, '').slice(0, 160)}...
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(p.updatedAt).toLocaleDateString()}
                      </span>
                      <span>{p.author}</span>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-100">
                      {canWrite ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEdit(p);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePost(p.id);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400">
                          <BookOpen className="w-3 h-3" /> Read tutorial
                        </span>
                      )}
                    </div>
                  </motion.article>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Editor sub-component
// ──────────────────────────────────────────────────────────────────────────────
interface EditorProps {
  post: BlogPost;
  onChange: (p: BlogPost) => void;
  onSave: () => void;
  onCancel: () => void;
}
const Editor: React.FC<EditorProps> = ({ post, onChange, onSave, onCancel }) => {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white border border-zinc-200 rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-900">
          {post.title ? `Editing: ${post.title}` : 'New Tutorial'}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <button
            onClick={onSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 rounded-lg transition-colors shadow"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="p-6 grid sm:grid-cols-3 gap-4 border-b border-zinc-100">
        <div>
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
            Topic
          </label>
          <input
            type="text"
            value={post.topic}
            onChange={(e) => onChange({ ...post, topic: e.target.value })}
            placeholder="e.g. Kubernetes"
            className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
            Title
          </label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => onChange({ ...post, title: e.target.value })}
            placeholder="My Awesome Tutorial"
            className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
            Author
          </label>
          <input
            type="text"
            value={post.author}
            onChange={(e) => onChange({ ...post, author: e.target.value })}
            placeholder="Your name"
            className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
          />
        </div>
      </div>

      <div className="px-6 pt-4 border-b border-zinc-100 flex gap-2">
        <button
          onClick={() => setTab('write')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all ${
            tab === 'write' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Write
        </button>
        <button
          onClick={() => setTab('preview')}
          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all ${
            tab === 'preview' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Preview
        </button>
      </div>

      <div className="p-6">
        {tab === 'write' ? (
          <textarea
            value={post.content}
            onChange={(e) => onChange({ ...post, content: e.target.value })}
            className="w-full min-h-[400px] p-4 border border-zinc-200 rounded-xl text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-y"
            placeholder="# Tutorial title&#10;&#10;Write your tutorial in Markdown..."
          />
        ) : (
          <div className="prose max-w-none min-h-[400px] p-4 border border-zinc-200 rounded-xl bg-zinc-50">
            {renderMarkdown(post.content)}
          </div>
        )}
        <p className="mt-3 text-xs text-zinc-400">
          Supports Markdown: <code className="bg-zinc-100 px-1.5 py-0.5 rounded">#</code> headings,{' '}
          <code className="bg-zinc-100 px-1.5 py-0.5 rounded">- list</code>,{' '}
          <code className="bg-zinc-100 px-1.5 py-0.5 rounded">**bold**</code>,{' '}
          <code className="bg-zinc-100 px-1.5 py-0.5 rounded">`code`</code>, and{' '}
          <code className="bg-zinc-100 px-1.5 py-0.5 rounded">```fenced blocks```</code>.
        </p>
      </div>
    </motion.div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Detail / read view
// ──────────────────────────────────────────────────────────────────────────────
interface DetailProps {
  post: BlogPost;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canWrite: boolean;
}
const Detail: React.FC<DetailProps> = ({ post, onBack, onEdit, onDelete, canWrite }) => (
  <motion.article
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="bg-white border border-zinc-200 rounded-3xl shadow-lg overflow-hidden"
  >
    <div className="p-6 border-b border-zinc-100 flex items-center justify-between flex-wrap gap-3">
      <button
        onClick={onBack}
        className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        ← Back to all tutorials
      </button>
      <div className="flex gap-2">
        {canWrite && (
          <>
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </>
        )}
      </div>
    </div>
    <div className="p-8 md:p-12">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-[10px] font-bold uppercase tracking-wider">
          <Tag className="w-3 h-3" /> {post.topic || 'Uncategorized'}
        </span>
        <span className="text-xs text-zinc-400 font-mono">
          By {post.author} · Updated {new Date(post.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 tracking-tight">
        {post.title}
      </h1>
      <div className="max-w-3xl">{renderMarkdown(post.content)}</div>
    </div>
  </motion.article>
);
