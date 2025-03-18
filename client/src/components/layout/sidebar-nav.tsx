import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Book,
  Home,
  Heart,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/wellbeing", label: "Wellbeing", icon: Heart },
];

export function SidebarNav() {
  const [location] = useLocation();
  const { logoutMutation, user } = useAuth();
  const isMobile = useIsMobile();

  const NavContent = () => (
    <>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-dyslexia font-semibold tracking-tight">
          Welcome, {user?.fullName}
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <ScrollArea className="h-full">
            <NavContent />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden md:flex h-screen w-72 flex-col border-r">
      <ScrollArea className="flex-1">
        <NavContent />
      </ScrollArea>
    </div>
  );
}