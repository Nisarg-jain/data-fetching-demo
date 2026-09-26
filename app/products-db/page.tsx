import { getProductsFromDB } from "./db";
import { ProductsList } from "./products-list";
import { Search } from "@/app/components/search";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsDBPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  // Await searchParams as required in Next.js 15
  const { query } = await searchParams;
  const products = await getProductsFromDB(query);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
              Products Catalog
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono">
              next/form
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Prefetched client-side navigation with query param serialization and loading UI.
          </p>
        </div>
        <Link
          href="/products-db/create"
          className="px-4 py-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* The next/form Search Bar */}
      <div className="space-y-2">
        <Search initialQuery={query} />
        {query && (
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span>
              Showing results for: <strong className="text-cyan-400">&quot;{query}&quot;</strong>
            </span>
            <Link
              href="/products-db"
              className="text-neutral-500 hover:text-neutral-300 underline"
            >
              Clear filter
            </Link>
          </div>
        )}
      </div>

      {/* Catalog Grid or Empty State */}
      {products.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-neutral-800 rounded-lg space-y-2">
          <p className="text-neutral-300 font-medium">No products match your search query.</p>
          <p className="text-xs text-neutral-500">
            Try searching for something else or clear the filter.
          </p>
        </div>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}