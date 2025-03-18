
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'neon' | 'light'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored as 'neon' | 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'neon' ? 'light' : 'neon';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme === 'neon' ? 'neon-mode' : 'light-mode';
  };

  return { theme, toggleTheme };
}
