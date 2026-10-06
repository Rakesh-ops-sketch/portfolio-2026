"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavWater } from "@/components/nav-water";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        headerRef.current?.style.setProperty("--nav-progress", `${progress * 100}%`);
        setScrolled(window.scrollY > 12);
      });
    };
    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(document.body);
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header ref={headerRef} className={`site-header fixed z-50 w-full ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-8">
        <div className="site-header-fill" aria-hidden="true"><NavWater /></div>
        <Link href="/" className="site-brand" aria-label="Rakesh Biswal — home">
          <span className="site-logo-wrap">
            <Image
              src="/logo-wordmark-v2.png?v=20260821-2"
              alt="Rakesh"
              width={150}
              height={67}
              className="brand-wordmark"
              unoptimized
              priority
            />
          </span>
        </Link>

        <nav className="site-nav-capsule hidden items-center md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={item.href === "/playground" ? false : undefined}
                aria-current={active ? "page" : undefined}
                className={`site-nav-link ${active ? "is-active" : ""}`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="site-header-actions hidden items-center gap-2 md:flex">
          <div className="site-theme-control">
            <ThemeToggle />
          </div>
          <Link href="/contact" className={`site-contact-link ${pathname === "/contact" ? "is-active" : ""}`}>
            <span>Let&apos;s talk</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <div className="site-theme-control">
            <ThemeToggle />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="site-menu-trigger" variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-nav-panel w-[min(90vw,25rem)] p-0" showCloseButton>
              <div className="mobile-nav-head">
                <SheetTitle>Navigation</SheetTitle>
                <span>RB / 2026</span>
              </div>
              <nav className="mobile-nav-links" aria-label="Mobile navigation">
                {[...navItems, { href: "/contact", label: "Contact" }].map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={item.href === "/playground" ? false : undefined}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={active ? "is-active" : ""}
                    >
                      <span>0{index + 1}</span>
                      <strong>{item.label}</strong>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  );
                })}
              </nav>
              <div className="mobile-nav-foot">
                <span className="status-dot" aria-hidden="true" />
                Available for meaningful work
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
