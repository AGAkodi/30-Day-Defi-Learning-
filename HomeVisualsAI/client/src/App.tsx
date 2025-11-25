import { Switch, Route } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import Day from "@/pages/Day";
import Week from "@/pages/Week";
import StreakPage from "@/pages/Streak";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";
import type { Streak } from "@shared/schema";

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const { data: streak } = useQuery<Streak>({
    queryKey: ["/api/streak"],
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary font-serif">MONARCH</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated && (
        <>
          <Route path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={Login} />
        </>
      )}
      {isAuthenticated && (
        <>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header currentStreak={streak?.currentStreak || 0} />
            <main className="flex-1 container max-w-7xl mx-auto px-4 md:px-8 py-8">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/day/:id" component={Day} />
                <Route path="/week/:number" component={Week} />
                <Route path="/streak" component={StreakPage} />
                <Route path="/profile" component={Profile} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
        </>
      )}
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
