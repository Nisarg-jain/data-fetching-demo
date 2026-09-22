"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Server component fetch failed:", error);
  }, [error]);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <div className="p-6 rounded-lg border border-red-900/50 bg-red-950/20 text-red-200 space-y-3">
        <h2 className="text-xl font-semibold">Something went wrong!</h2>
        <p className="text-sm text-red-400">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 text-sm font-medium rounded-md bg-red-800 hover:bg-red-700 text-white transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}