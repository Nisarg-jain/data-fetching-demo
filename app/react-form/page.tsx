"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductReactFormPage() {
  const router = useRouter();

  // 1. Managing form state manually with useState
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Submit handler triggering client fetch to API route
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, category, description }),
      });
if (!response.ok) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const errData = await response.json();
    throw new Error(errData.error || "Failed to create product");
  } else {
    throw new Error(`Server returned HTTP ${response.status} (${response.statusText}). Route not found or misconfigured.`);
  }
}

      // 3. Manual redirect on success
      router.push("/products-db");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <div className="space-y-2 border-b border-neutral-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
          Create Product (Traditional Form)
        </h1>
        <p className="text-sm text-neutral-400">
          Demonstrates client-side state handling, controlled inputs, and an intermediate API route.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-950/40 border border-red-800/60 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-neutral-300">Product Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Ergonomic Mouse"
            className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-300">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="79.99"
              className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-300">Category</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Peripherals"
              className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-neutral-300">Description</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief overview of the product..."
            className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-md font-medium text-sm bg-cyan-600 hover:bg-cyan-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white transition-colors cursor-pointer"
        >
          {loading ? "Adding Product..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}