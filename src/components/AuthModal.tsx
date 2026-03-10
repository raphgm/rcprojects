import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, UserPlus, Github, Chrome } from 'lucide-react';
import { signInWithGoogle } from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>

            <div className="p-8 pt-12 text-center">
              <div className="bg-zinc-900 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-black text-2xl">R</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-zinc-500 text-sm mb-8">
                {mode === 'login' 
                  ? 'Sign in to continue your cloud engineering journey.' 
                  : 'Join 50,000+ engineers mastering the cloud today.'}
              </p>

              <div className="space-y-4">
                <button 
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-zinc-200 rounded-2xl font-bold text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm"
                >
                  <Chrome className="w-5 h-5" />
                  Continue with Google
                </button>
                <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-zinc-900 border border-zinc-900 rounded-2xl font-bold text-white hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10">
                  <Github className="w-5 h-5" />
                  Continue with GitHub
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-100">
                <p className="text-zinc-400 text-xs">
                  By continuing, you agree to our <br />
                  <span className="text-zinc-900 font-bold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-zinc-900 font-bold hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
