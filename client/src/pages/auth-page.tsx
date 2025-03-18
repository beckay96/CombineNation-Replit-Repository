import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { AuthForms } from "@/components/auth/auth-forms";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-8 bg-card/50">
        <AuthForms />
      </div>

      <div className="hidden md:flex items-center justify-center bg-primary/5 p-8">
        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-dyslexia font-bold text-primary">
            Welcome to CombineNation
          </h1>
          <p className="text-lg text-muted-foreground">
            Join our platform to access educational resources, family management tools,
            and emotional wellbeing support - all in one place.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2"
              alt="Education"
              className="rounded-lg object-cover h-32"
            />
            <img
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
              alt="Family Wellness"
              className="rounded-lg object-cover h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}