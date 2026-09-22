export default function Loading() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Title skeleton */}
      <div className="h-9 w-48 bg-neutral-800 rounded animate-pulse" />

      {/* Grid skeleton */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/50 space-y-3 animate-pulse"
          >
            <div className="h-5 w-40 bg-neutral-800 rounded" />
            <div className="h-4 w-28 bg-neutral-800 rounded" />
            <div className="h-4 w-48 bg-neutral-800 rounded" />
            <div className="h-4 w-32 bg-neutral-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}