"use client";

import Image from "next/image";
import { useState } from "react";
import { asset, cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  /** Label shown on the branded placeholder when the image is missing. */
  label?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}

/**
 * Fills its (relatively positioned) parent with an optimised image, and falls
 * back to a branded placeholder block when the file is missing — so the layout
 * never breaks before real assets are dropped in.
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  label,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  fit = "cover",
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 grid place-items-center bg-muted grid-backdrop",
          className,
        )}
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          {label ?? "Image pending"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={asset(src)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
