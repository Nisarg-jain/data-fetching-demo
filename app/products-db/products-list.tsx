"use client";

import { useOptimistic } from "react";
import { Product } from "./db";
import { removeProduct } from "@/app/actions/products";
import Link from "next/link";

export function ProductsList({ products }: { products: Product[] }) {
  // Setup optimistic state: filters out the product immediately when id is passed
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (currentProducts, productIdToDelete: number) =>
      currentProducts.filter((product) => product.id !== productIdToDelete)
  );

  const handleDelete = async (id: number) => {
    // 1. Instantly update the UI optimistically
    setOptimisticProducts(id);
    // 2. Execute the actual Server Action in the background
    await removeProduct(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {optimisticProducts.map((product) => (
        <div
          key={product.id}
          className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/60 flex flex-col justify-between space-y-3 transition-all"
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

              {/* Optimistic Delete Trigger */}
              <form action={() => handleDelete(product.id)}>
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
      ))}
    </div>
  );
}