import { getProductById } from "@/app/products-db/db";
import { notFound } from "next/navigation";
import { ProductEditForm } from "./product-edit-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <div className="space-y-2 border-b border-neutral-800 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Edit Product #{product.id}
          </h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono">
            Bound Action (.bind)
          </span>
        </div>
        <p className="text-sm text-neutral-400">
          Fetching initial data on the server and binding the ID to the server action.
        </p>
      </div>

      <ProductEditForm product={product} />
    </div>
  );
}