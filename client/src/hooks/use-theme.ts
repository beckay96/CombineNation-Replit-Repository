import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useTheme() {
  const [theme, setThemeState] = useState<'neon' | 'light'>('light');

  useEffect(() => {
    // Initialize theme from localStorage or user profile
    const initializeTheme = async () => {
      const stored = localStorage.getItem('theme');

      // Try to get user's theme preference from their profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('neon_mode')
          .eq('id', user.id)
          .single();

        if (profile) {
          const themeFromDB = profile.neon_mode ? 'neon' : 'light';
          setThemeState(themeFromDB);
          localStorage.setItem('theme', themeFromDB);
          document.body.className = themeFromDB === 'neon' ? 'neon-mode' : 'light-mode';
          return;
        }
      }

      // Fallback to localStorage if no user or profile
      if (stored === 'neon' || stored === 'light') {
        setThemeState(stored);
        document.body.className = stored === 'neon' ? 'neon-mode' : 'light-mode';
      }
    };

    initializeTheme();
  }, []);

  const setTheme = async (newTheme: 'neon' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme === 'neon' ? 'neon-mode' : 'light-mode';

    // Update user's profile in database if logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ neon_mode: newTheme === 'neon' })
        .eq('id', user.id);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'neon' ? 'light' : 'neon';
    setTheme(newTheme);
  };

  return { theme, setTheme, toggleTheme };
}