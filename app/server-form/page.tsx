import { addProductToDB } from "@/app/products-db/db";
import { SubmitButton } from "@/app/components/submit";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function ServerFormPage() {
  async function createProductAction(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString().trim();
    const priceStr = formData.get("price")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const description = formData.get("description")?.toString().trim();

    if (!title || !priceStr || !category || !description) {
      throw new Error("All fields are required");
    }

    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      throw new Error("Invalid price provided");
    }

    // Direct database mutation on the server
    await addProductToDB({
      title,
      price,
      category,
      description,
    });

    // Invalidate the cache for products-db and navigate
    revalidatePath("/products-db");
    redirect("/products-db");
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <div className="space-y-2 border-b border-neutral-800 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Create Product (Server Action)
          </h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono">
            RSC + useFormStatus
          </span>
        </div>
        <p className="text-sm text-neutral-400">
          Form submission status tracked automatically using the React useFormStatus hook.
        </p>
      </div>

      <form action={createProductAction} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-medium text-neutral-300">
            Product Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g. Mechanical Numpad"
            className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="price" className="text-sm font-medium text-neutral-300">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              placeholder="39.99"
              className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="category" className="text-sm font-medium text-neutral-300">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              placeholder="Peripherals"
              className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium text-neutral-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            placeholder="Brief overview of the product..."
            className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm resize-none"
          />
        </div>

        {/* Dedicated client-side submit component */}
        <SubmitButton />
      </form>
    </div>
  );
}