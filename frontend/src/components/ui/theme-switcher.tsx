import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { Button } from './button';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full hover:bg-platinum-400 dark:hover:bg-onyx"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-seasalt/90 hover:text-seasalt" />
      ) : (
        <Moon className="h-5 w-5 text-eerie-black hover:text-eerie-black/80" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}