"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
  retry,
}: {
  error: Error & { digest?: string };
  // Next.js 16 passes `retry`; older versions pass `reset`. Support both.
  reset?: () => void;
  retry?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const recover = retry ?? reset;

  return (
    <div className="grid min-h-svh place-items-center px-6">
      <div className="text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-accent">
          Something broke
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">
          Unexpected error.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          An error occurred while rendering this page. You can try again.
        </p>
        <button
          type="button"
          onClick={() => recover?.()}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition hover:brightness-110"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
