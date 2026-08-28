"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 w-full backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1380px] items-center justify-between px-4 sm:px-10">
        <Link
          href="/"
          className="site-brand flex items-center gap-2 text-sm font-semibold tracking-[-0.02em]"
        >
          <span className="logo-smoke-wrap">
            <span className="smoke-wisp smoke-wisp-1" aria-hidden="true" />
            <span className="smoke-wisp smoke-wisp-2" aria-hidden="true" />
            <span className="smoke-wisp smoke-wisp-3" aria-hidden="true" />
            <span className="smoke-wisp smoke-wisp-4" aria-hidden="true" />
            <span className="smoke-wisp smoke-wisp-5" aria-hidden="true" />
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link px-3 py-2 text-[11px] font-medium uppercase tracking-[0.13em] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-l border-white/10 bg-[#11120f] p-0 text-white">
              <div className="px-5 pt-5">
                <SheetTitle className="text-base font-bold tracking-tight text-white">
                  Rakesh<span className="text-[#6f8cff]">.</span>
                </SheetTitle>
              </div>
              <nav className="flex flex-col gap-1 px-3 pt-4 pb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-[#8ea3ff]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
