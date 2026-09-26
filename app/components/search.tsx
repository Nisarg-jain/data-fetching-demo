import Form from "next/form";

export function Search({ initialQuery }: { initialQuery?: string }) {
  return (
    <Form action="/products-db" className="flex items-center gap-2 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          name="query"
          defaultValue={initialQuery || ""}
          placeholder="Search products by title, description, or category..."
          className="w-full px-3.5 py-2 text-sm bg-neutral-900 border border-neutral-800 rounded-md text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-md transition-colors cursor-pointer"
      >
        Search
      </button>
    </Form>
  );
}