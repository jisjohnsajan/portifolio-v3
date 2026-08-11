import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:brightness-110 active:brightness-95",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:bg-surface-hover",
  ghost: "text-foreground hover:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  href?: string;
}

export type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> &
  Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps>;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, href, ...rest } =
    props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    const isFile = /^\/.*\.[a-z0-9]+$/i.test(href);
    const isHash = href.startsWith("#");

    if (isExternal || isFile || isHash) {
      return (
        <a
          href={href}
          className={classes}
          target={isExternal && !href.startsWith("mailto:") ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          download={isFile || undefined}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
