import { SidebarNav } from "@/components/layout/sidebar-nav";
import { EducationTools } from "@/components/dashboard/education-tools";
import { FamilyManagement } from "@/components/dashboard/family-management";
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme";
import { useTheme } from "@/hooks/use-theme";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen">
      <SidebarNav />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-dyslexia font-bold text-primary">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your education and family tasks all in one place.
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Neon or Light Mode?
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
                const { toggleTheme } = useTheme();
                toggleTheme();
              }}
            >
              <span className="sr-only">Toggle theme</span>
              {theme === 'neon' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <EducationTools />
          <FamilyManagement />
        </div>
      </main>
    </div>
  );
}