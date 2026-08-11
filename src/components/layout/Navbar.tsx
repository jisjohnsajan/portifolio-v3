"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, SECTION_IDS } from "@/lib/site";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto-hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 320);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for the active section.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-120%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full border border-border px-4 py-2.5 transition-colors duration-300 sm:px-5",
            scrolled
              ? "bg-background/70 backdrop-blur-xl"
              : "bg-transparent",
          )}
        >
          <Link
            href="#hero"
            className="group flex items-center gap-1 font-display text-lg font-semibold tracking-tight"
            aria-label={`${profile.name} — home`}
            data-cursor="link"
          >
            {profile.initials}
            <span className="text-accent transition-transform duration-300 group-hover:translate-y-0.5">
              .
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    data-cursor="link"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:brightness-110 sm:inline-flex"
              data-cursor="link"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 border-b border-border py-4 font-display text-2xl font-medium"
                  >
                    <span className="font-mono text-xs text-accent">
                      0{i + 1}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-auto inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
