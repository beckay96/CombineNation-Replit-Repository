import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  console.log('ThemeToggle render - current theme:', theme);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        console.log('Toggle theme button clicked, current theme:', theme);
        toggleTheme();
        setTimeout(() => {
          console.log('After toggle, document class:', document.documentElement.className);
        }, 100);
      }}
      className="w-9 h-9 glass-panel"
    >
      {theme === 'neon' ? (
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-4 w-4 rotate-0 scale-100 transition-all" />
      )}
    </Button>
  );
}