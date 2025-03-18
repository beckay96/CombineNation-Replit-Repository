import { SidebarNav } from "@/components/layout/sidebar-nav";
import { EducationTools } from "@/components/dashboard/education-tools";
import { FamilyManagement } from "@/components/dashboard/family-management";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-dyslexia font-bold text-primary">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your education and family tasks all in one place.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <EducationTools />
          <FamilyManagement />
        </div>
      </main>
    </div>
  );
}
