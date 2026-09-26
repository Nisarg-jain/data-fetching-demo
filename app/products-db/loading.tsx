export default function ProductsLoading() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-pulse">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-neutral-800 rounded"></div>
          <div className="h-4 w-72 bg-neutral-800/60 rounded"></div>
        </div>
        <div className="h-9 w-28 bg-neutral-800 rounded"></div>
      </div>

      <div className="h-10 w-full bg-neutral-800/50 rounded-md"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-lg border border-neutral-800/80 bg-neutral-900/40 space-y-3"
          >
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-neutral-800 rounded"></div>
              <div className="h-3 w-16 bg-neutral-800 rounded"></div>
            </div>
            <div className="h-5 w-40 bg-neutral-800 rounded"></div>
            <div className="h-10 w-full bg-neutral-800/60 rounded"></div>
            <div className="flex justify-between pt-3 border-t border-neutral-800/40">
              <div className="h-6 w-16 bg-neutral-800 rounded"></div>
              <div className="h-6 w-24 bg-neutral-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}