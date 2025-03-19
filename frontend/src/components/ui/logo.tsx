import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

interface LogoProps {
  variant?: 'default' | 'small' | 'auth';
}

export const Logo = ({ variant = 'default' }: LogoProps) => {
  const baseIconSize = variant === 'small' ? 'w-16 h-16' : 'w-24 h-24';
  const baseTextSize = variant === 'small' ? 'text-2xl' : 'text-6xl';
  
  if (variant === 'auth') {
    return (
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-zinc-300 to-zinc-600 animate-pulse" />
          <div className="absolute inset-1 rounded-full bg-black" />
          <Brain className="absolute inset-0 w-full h-full p-2.5 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter">
          <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            Mind
          </span>
          <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-white bg-clip-text text-transparent">
            Blogging
          </span>
        </h1>
      </div>
    );
  }

  return (
    <Link to="/" className="flex flex-col items-center">
      <motion.div
        initial={variant === 'default' ? { opacity: 0, scale: 0.5 } : false}
        animate={variant === 'default' ? { opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`relative ${baseIconSize} mb-4`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-zinc-300 to-zinc-600 animate-pulse" />
          <div className="absolute inset-1 rounded-full bg-black" />
          <Brain className="absolute inset-0 w-full h-full p-5 text-white" />
        </div>
        <h1 className={`${baseTextSize} font-bold tracking-tighter`}>
          <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            Mind
          </span>
          <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-white bg-clip-text text-transparent">
            Blogging
          </span>
        </h1>
      </motion.div>
    </Link>
  );
};
