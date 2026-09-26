import { getProductsFromDB } from "./db";
import { ProductsList } from "./products-list";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsDBPage() {
  // Fetch initial data on the server
  const products = await getProductsFromDB();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Products Catalog
          </h1>
          <p className="text-sm text-neutral-400">
            Direct database querying with optimistic updates using React 19&apos;s useOptimistic hook.
          </p>
        </div>
        <Link
          href="/products-db/create"
          className="px-4 py-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Render the Client Component with optimistic capabilities */}
      <ProductsList products={products} />
    </div>
  );
}