import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="theme-toggle"
      aria-pressed={isDark}
      title="Toggle Dark Mode"
      style={{
        '--speed': '0.5s',
        '--ease': 'cubic-bezier(.4,-0.3,.6,1.3)',
      } as React.CSSProperties}
    >
      <span className="toggle__content">
        {/* Background gradient */}
        <span className={`toggle__backdrop ${isDark ? 'toggle__backdrop--night' : 'toggle__backdrop--day'}`}>
          {/* Stars */}
          <span className={`toggle__stars ${isDark ? 'opacity-100' : 'opacity-0'}`}>
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <circle cx="30" cy="20" r="1.5" fill="white" opacity="0.9" />
              <circle cx="60" cy="35" r="1" fill="white" opacity="0.7" />
              <circle cx="90" cy="15" r="1.8" fill="white" opacity="0.8" />
              <circle cx="120" cy="40" r="1" fill="white" opacity="0.6" />
              <circle cx="150" cy="22" r="1.5" fill="white" opacity="0.9" />
              <circle cx="170" cy="45" r="1.2" fill="white" opacity="0.7" />
              <circle cx="45" cy="50" r="1" fill="white" opacity="0.5" />
              <circle cx="140" cy="12" r="1.3" fill="white" opacity="0.8" />
            </svg>
          </span>

          {/* Clouds */}
          <span className={`toggle__clouds ${isDark ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <ellipse cx="50" cy="70" rx="25" ry="10" fill="white" opacity="0.8" />
              <ellipse cx="45" cy="65" rx="15" ry="8" fill="white" opacity="0.9" />
              <ellipse cx="60" cy="63" rx="12" ry="7" fill="white" opacity="0.7" />
              <ellipse cx="140" cy="55" rx="20" ry="8" fill="white" opacity="0.6" />
              <ellipse cx="135" cy="50" rx="12" ry="6" fill="white" opacity="0.7" />
              <ellipse cx="150" cy="48" rx="10" ry="5" fill="white" opacity="0.5" />
            </svg>
          </span>
        </span>

        {/* Sun / Moon orb */}
        <span
          className={`toggle__orb ${isDark ? 'toggle__orb--moon' : 'toggle__orb--sun'}`}
        >
          {/* Moon craters */}
          <span className={`toggle__craters ${isDark ? 'opacity-100' : 'opacity-0'}`}>
            <span className="toggle__crater toggle__crater--1" />
            <span className="toggle__crater toggle__crater--2" />
            <span className="toggle__crater toggle__crater--3" />
          </span>
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
