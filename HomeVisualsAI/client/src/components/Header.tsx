import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Flame, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { StreakCounter } from "./StreakCounter";
import { queryClient } from "@/lib/queryClient";

interface HeaderProps {
  currentStreak?: number;
}

export function Header({ currentStreak = 0 }: HeaderProps) {
  const [location, navigate] = useLocation();
  const { user } = useAuth();
  const isLoggingOut = useRef(false);

  const handleLogout = async () => {
    if (isLoggingOut.current) return;
    isLoggingOut.current = true;
    
    try {
      await fetch("/api/logout", { method: "POST" });
      // Invalidate auth cache and redirect to home
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      isLoggingOut.current = false;
    }
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer" data-testid="link-home">
            <div className="text-2xl font-bold text-primary font-serif">MONARCH</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/">
            <Button
              variant={isActive("/") && !location.includes("/day") && !location.includes("/week") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              data-testid="button-nav-home"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
          </Link>
          <Link href="/streak">
            <Button
              variant={isActive("/streak") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              data-testid="button-nav-streak"
            >
              <Flame className="w-4 h-4" />
              <span>Streak</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant={isActive("/profile") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              data-testid="button-nav-profile"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <StreakCounter currentStreak={currentStreak} compact />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            title="Logout"
            data-testid="button-logout"
            className="gap-2 hidden md:flex"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      <nav className="md:hidden border-t border-border fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur z-50">
        <div className="flex items-center justify-around h-16">
          <Link href="/">
            <Button
              variant={isActive("/") && !location.includes("/day") && !location.includes("/week") ? "default" : "ghost"}
              size="icon"
              data-testid="button-mobile-nav-home"
            >
              <Home className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/streak">
            <Button
              variant={isActive("/streak") ? "default" : "ghost"}
              size="icon"
              data-testid="button-mobile-nav-streak"
            >
              <Flame className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant={isActive("/profile") ? "default" : "ghost"}
              size="icon"
              data-testid="button-mobile-nav-profile"
            >
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            data-testid="button-mobile-logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
