import { getProductsFromDB } from "./db";
import { removeProduct } from "@/app/actions/products";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsDBPage() {
  const products = await getProductsFromDB();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Products Catalog
          </h1>
          <p className="text-sm text-neutral-400">
            Direct database querying with Server Actions for Create, Update, and Delete.
          </p>
        </div>
        <Link
          href="/products-db/create"
          className="px-4 py-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => {
          const removeProductWithId = removeProduct.bind(null, product.id);

          return (
            <div
              key={product.id}
              className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/60 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">
                    DB Record ID #{product.id}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      product.inStock
                        ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-100 mt-2">
                  {product.title}
                </h2>
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-mono mt-0.5">
                  {product.category}
                </p>
                <p className="text-sm text-neutral-300 mt-2 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60">
                <span className="text-xl font-bold text-neutral-100">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/products-db/${product.id}`}
                    className="text-xs font-medium px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
                  >
                    Edit
                  </Link>

                  {/* Progressive Enhancement Delete Form */}
                  <form action={removeProductWithId}>
                    <button
                      type="submit"
                      className="text-xs font-medium px-3 py-1.5 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}