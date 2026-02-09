import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="text-base text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to the main site.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
