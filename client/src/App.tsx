import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/use-auth";
import { AppStateProvider } from "./hooks/appState/AppStateContext";
import { ProtectedRoute } from "./lib/protected-route";

import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Wellbeing from "@/pages/wellbeing";
import NotFound from "@/pages/not-found";
import OnboardingInitial from "@/components/onboarding/OnboardingInitial";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/wellbeing" component={Wellbeing} />
      <ProtectedRoute path="/onboarding" component={OnboardingInitial} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppStateProvider>
          <Router />
          <Toaster />
        </AppStateProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;