import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center px-6">
      <div className="text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-accent">
          Error 404
        </div>
        <h1 className="mt-4 font-display text-6xl font-semibold sm:text-8xl">
          Lost the thread.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          This page doesn&apos;t exist — it may have moved or never shipped.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition hover:brightness-110"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
