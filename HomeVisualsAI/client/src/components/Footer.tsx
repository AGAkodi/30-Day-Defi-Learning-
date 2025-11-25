import { Mail, Twitter, MessageCircle, Send } from "lucide-react";

export function Footer() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:talk2monarch77@gmail.com",
      testId: "link-email"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/OxMonarch",
      testId: "link-twitter"
    },
    {
      icon: MessageCircle,
      label: "Discord",
      href: "https://discord.com/oxmonarch",
      testId: "link-discord"
    },
    {
      icon: Send,
      label: "Telegram",
      href: "https://t.me/Ox_Monarch",
      testId: "link-telegram"
    }
  ];

  return (
    <footer className="w-full border-t border-primary/30 bg-background py-8 mt-auto mb-16 md:mb-0">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-6">
          <p 
            className="text-lg md:text-xl text-center text-primary font-serif italic"
            data-testid="text-quote"
          >
            "To know is to be free"
          </p>
          
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.testId}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover-elevate transition-all"
                  title={link.label}
                  data-testid={link.testId}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
