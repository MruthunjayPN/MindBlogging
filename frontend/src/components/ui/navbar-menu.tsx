import React from "react";
import { motion } from "motion/react";
import { Link, useRouter } from '@tanstack/react-router';
import { useAuth } from '@/contexts/auth-context';
import { useTheme } from '@/contexts/theme-context';
import { Button } from './button';
import { Sun, Moon } from 'lucide-react';

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const Logo = () => {
  return (
    <Link to="/" className="text-2xl font-bold">
      <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        MindBlogging
      </span>
    </Link>
  );
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  isLastItem,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  isLastItem?: boolean;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={transition}
        className="cursor-pointer text-sm text-eerie-black dark:text-seasalt/90 hover:text-eerie-black/80 dark:hover:text-seasalt"
      >
        {item}
      </motion.p>
      {active === item && (
        <div className={`absolute ${isLastItem ? 'right-0' : 'left-1/2 -translate-x-1/2'} top-full pt-2`}>
          <div className="bg-platinum dark:bg-eerie-black border border-french-gray-200 dark:border-onyx rounded-lg shadow-lg overflow-hidden min-w-[200px]">
            <div className="p-2">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  
  // Check if we're on auth pages
  const isAuthPage = ['/login', '/register'].includes(currentPath);

  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent 
        bg-french-gray/50 dark:bg-french-gray/50
        shadow-input dark:shadow-none
        backdrop-blur-sm
        dark:border-onyx/50
        px-6 py-3
        flex items-center justify-between"
    >
      <div className="flex-none">
        <Logo />
      </div>
      <div className="flex items-center gap-8">
        {(!isAuthPage || user) && children}
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  to,
  imgSrc,
}: {
  title: string;
  description: string;
  to: string;
  imgSrc: string;
}) => {
  return (
    <Link to={to} className="flex items-center space-x-2 w-full">
      <img
        src={imgSrc}
        width={50}
        height={30}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold mb-0.5 text-black dark:text-white truncate">
          {title}
        </h4>
        <p className="text-neutral-700 text-xs truncate dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-eerie-black dark:text-seasalt/90 
        hover:bg-platinum-400 dark:hover:bg-onyx 
        rounded-md transition-colors duration-150"
    >
      {children}
    </Link>
  );
};

// Update ThemeSwitcher component size
export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-12 h-12 rounded-full hover:bg-platinum-400 dark:hover:bg-onyx"
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6 text-seasalt/90 hover:text-seasalt" />
      ) : (
        <Moon className="h-6 w-6 text-eerie-black hover:text-eerie-black/80" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
