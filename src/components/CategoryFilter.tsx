import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-0 no-scrollbar">
      <button
        onClick={() => onCategoryChange('All')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
          activeCategory === 'All'
            ? 'bg-cyan-500 text-zinc-950 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
            : 'bg-zinc-950/40 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
        }`}
      >
        All Projects
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
            activeCategory === category
              ? 'bg-cyan-500 text-zinc-950 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
              : 'bg-zinc-950/40 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
