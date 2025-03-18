import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useTheme() {
  const [theme, setThemeState] = useState<'neon' | 'light'>('light');

  useEffect(() => {
    // Initialize theme from localStorage or user profile
    const initializeTheme = async () => {
      try {
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
            document.documentElement.className = themeFromDB === 'neon' ? 'dark' : 'light';
            localStorage.setItem('theme', themeFromDB);
            return;
          }
        }

        // Fallback to localStorage if no user or profile
        const stored = localStorage.getItem('theme') as 'neon' | 'light' | null;
        if (stored === 'neon' || stored === 'light') {
          setThemeState(stored);
          document.documentElement.className = stored === 'neon' ? 'dark' : 'light';
        }
      } catch (error) {
        console.error('Error initializing theme:', error);
      }
    };

    initializeTheme();
  }, []);

  const setTheme = async (newTheme: 'neon' | 'light') => {
    try {
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.className = newTheme === 'neon' ? 'dark' : 'light';

      // Update user's profile in database if logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ neon_mode: newTheme === 'neon' })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating theme preference:', error);
        }
      }
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'neon' ? 'light' : 'neon';
    setTheme(newTheme);
  };

  return { theme, setTheme, toggleTheme };
}