import { getProductsFromDB, Product } from "./db";

export default async function ProductsDatabasePage() {
  const startTime = Date.now();

  // Direct database query on the server (no fetch, no HTTP round-trip)
  const products: Product[] = await getProductsFromDB();

  const queryTime = Date.now() - startTime;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header & Database Info */}
      <div className="space-y-2 border-b border-neutral-800 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Products (Direct Database Query)
          </h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono">
            DB Query Time: ~{queryTime}ms
          </span>
        </div>
        <p className="text-sm text-neutral-400">
          Queried directly inside a React Server Component without intermediate API routes or fetch calls.
        </p>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/40 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  {product.category}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    product.inStock
                      ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/50"
                      : "bg-rose-950/60 text-rose-300 border border-rose-800/50"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-neutral-100">
                {product.title}
              </h2>

              <p className="text-sm text-neutral-400">
                {product.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between">
              <span className="text-xl font-bold text-neutral-100">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                DB Record ID #{product.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}