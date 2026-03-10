import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-8 h-4 rounded-full bg-muted/50 border border-border/50 transition-colors duration-300">
        <div 
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-primary transition-all duration-300 ${
            theme === 'dark' ? 'left-0.5' : 'left-[calc(100%-14px)]'
          }`}
        />
      </div>
      <span className="flex items-center gap-1">
        {theme === 'dark' ? (
          <>
            <Moon className="w-3 h-3" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-3 h-3" />
            <span>Light</span>
          </>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;