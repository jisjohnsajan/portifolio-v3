"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-hover"
      data-cursor="link"
    >
      {/* Icons are driven by the theme class to avoid hydration mismatch. */}
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="block h-4 w-4 dark:hidden" />
    </button>
  );
}
