import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, BookOpen, Flame, Users } from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 container max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col">
        <div className="space-y-12 flex-1">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-primary font-serif">
              MONARCH
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Your Gateway to DeFi Mastery
            </p>
            <p className="text-lg md:text-xl text-primary font-serif italic">
              "To know is to be free"
            </p>
            <div className="pt-4 flex gap-4 justify-center">
              <Link href="/login">
                <Button
                  className="px-8 py-6 text-lg"
                  data-testid="button-login"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg"
                  data-testid="button-signup"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 py-12">
            <Card className="bg-card p-6 text-center space-y-4">
              <div className="flex justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">30-Day Curriculum</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive lessons on DeFi fundamentals
              </p>
            </Card>

            <Card className="bg-card p-6 text-center space-y-4">
              <div className="flex justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Interactive Quizzes</h3>
              <p className="text-sm text-muted-foreground">
                Test your knowledge with engaging assessments
              </p>
            </Card>

            <Card className="bg-card p-6 text-center space-y-4">
              <div className="flex justify-center">
                <Flame className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Streak System</h3>
              <p className="text-sm text-muted-foreground">
                Build consistent learning habits daily
              </p>
            </Card>

            <Card className="bg-card p-6 text-center space-y-4">
              <div className="flex justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Weekly Reviews</h3>
              <p className="text-sm text-muted-foreground">
                Consolidate your learning with reflections
              </p>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-card to-muted/30 border-primary/30 p-8 md:p-12 text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Ready to Build Your Kingdom?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of DeFi learners on their journey to financial freedom through knowledge.
            </p>
            <Link href="/signup">
              <Button
                className="px-8 py-6 text-lg"
                data-testid="button-signup-cta"
              >
                Get Started Today
              </Button>
            </Link>
          </Card>
        </div>
      </main>

      <footer className="w-full border-t border-primary/30 bg-background py-8 mt-auto">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-6">
            <p 
              className="text-lg md:text-xl text-center text-primary font-serif italic"
              data-testid="text-quote"
            >
              "To know is to be free"
            </p>
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a
                href="mailto:talk2monarch77@gmail.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover-elevate transition-all"
                title="Email"
                data-testid="link-email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </a>
              <a
                href="https://x.com/OxMonarch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover-elevate transition-all"
                title="Twitter"
                data-testid="link-twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.241 3.746 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="https://discord.com/oxmonarch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover-elevate transition-all"
                title="Discord"
                data-testid="link-discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.942 3.506a15.624 15.624 0 0 0-3.95-.89c-.177.318-.375.734-.512 1.063a14.43 14.43 0 0 0-4.347 0c-.137-.33-.338-.745-.512-1.063a15.6 15.6 0 0 0-3.95.89 15.71 15.71 0 0 0-2.483 7.46 15.714 15.714 0 0 0 4.741 7.34 15.594 15.594 0 0 0 4.733-1.485c.314-.432.596-.893.835-1.378a10.27 10.27 0 0 1-1.55-.657c.13-.094.257-.192.38-.291a11.273 11.273 0 0 0 9.738 0c.123.099.25.197.38.291a10.253 10.253 0 0 1-1.55.657c.239.485.521.946.835 1.378a15.593 15.593 0 0 0 4.733 1.485 15.712 15.712 0 0 0-2.482-7.46zm-10.05 5.98a1.883 1.883 0 1 1 0-3.766 1.883 1.883 0 0 1 0 3.766zm6.108 0a1.883 1.883 0 1 1 0-3.766 1.883 1.883 0 0 1 0 3.766z"></path>
                </svg>
              </a>
              <a
                href="https://t.me/Ox_Monarch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover-elevate transition-all"
                title="Telegram"
                data-testid="link-telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-2-14.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zM12 9v6h-1V9h1zM8.5 9C7.12 9 6 10.12 6 11.5v3a2.5 2.5 0 0 0 5 0v-3c0-1.38-1.12-2.5-2.5-2.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
