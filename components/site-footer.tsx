import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Separator } from "@/components/ui/separator";
import { FooterTypewriter } from "@/components/footer-typewriter";

const socialLinks = [
  {
    href: "mailto:hsekar.bat@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://github.com/Rakesh-ops-sketch",
    label: "GitHub",
    icon: FaGithub,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/lucifermsloh/",
    label: "LinkedIn",
    icon: FaLinkedin,
    external: true,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-accent/30">
      <div className="mx-auto flex w-full flex-col gap-6 px-6 py-10 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <FooterTypewriter />
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label={label}
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Rakesh Biswal. All rights
            reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/Rakesh-ops-sketch"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Source on GitHub
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
