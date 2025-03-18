import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useTheme() {
  // Force default theme to be neon (dark)
  const [theme, setThemeState] = useState<'neon' | 'light'>('neon');

  useEffect(() => {
    // Initialize theme from localStorage or user profile
    const initializeTheme = async () => {
      try {
        console.log('Initializing theme...');

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
            console.log('Theme set from profile:', themeFromDB, 'class:', document.documentElement.className);
            return;
          }
        }

        // Fallback to localStorage if no user or profile
        const stored = localStorage.getItem('theme') as 'neon' | 'light' | null;

        // Default to 'neon' if no stored preference
        const themeToSet = stored === 'light' ? 'light' : 'neon';
        setThemeState(themeToSet);
        document.documentElement.className = themeToSet === 'neon' ? 'dark' : 'light';
        localStorage.setItem('theme', themeToSet);

        console.log('Theme set from localStorage or default:', themeToSet, 'class:', document.documentElement.className);
      } catch (error) {
        console.error('Error initializing theme:', error);

        // Fallback to dark mode on error
        setThemeState('neon');
        document.documentElement.className = 'dark';
        localStorage.setItem('theme', 'neon');
      }
    };

    initializeTheme();

    // Add a class observer to debug theme issues
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          console.log('Document class changed to:', document.documentElement.className);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const setTheme = async (newTheme: 'neon' | 'light') => {
    try {
      console.log('Setting theme to:', newTheme);
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.className = newTheme === 'neon' ? 'dark' : 'light';
      console.log('Updated document class to:', document.documentElement.className);

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
    console.log('Toggle theme - current theme:', theme);
    const newTheme = theme === 'neon' ? 'light' : 'neon';
    setTheme(newTheme);
  };

  return { theme, setTheme, toggleTheme };
}