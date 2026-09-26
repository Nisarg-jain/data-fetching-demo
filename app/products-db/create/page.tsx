"use client";

import { useActionState } from "react";
import { createProduct, FormState } from "@/app/actions/products";

const initialState: FormState = {
  errors: {},
};

export default function CreateProductPage() {
  const [state, formAction, isPending] = useActionState(
    createProduct,
    initialState
  );

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <div className="space-y-2 border-b border-neutral-800 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Create Product
          </h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono">
            Separated Server Action
          </span>
        </div>
        <p className="text-sm text-neutral-400">
          Clean architecture: Server action defined in <code>app/actions/products.ts</code> and consumed in a client form.
        </p>
      </div>

      <form action={formAction} noValidate className="space-y-4">
        {/* Title Field */}
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-medium text-neutral-300">
            Product Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Mechanical Keyboard"
            className={`w-full px-3 py-2 rounded-md bg-neutral-900 border ${
              state.errors?.title ? "border-rose-500" : "border-neutral-800"
            } text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm`}
          />
          {state.errors?.title && (
            <p className="text-xs text-rose-400 font-medium">
              {state.errors.title}
            </p>
          )}
        </div>

        {/* Price & Category Fields */}
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
              placeholder="99.99"
              className={`w-full px-3 py-2 rounded-md bg-neutral-900 border ${
                state.errors?.price ? "border-rose-500" : "border-neutral-800"
              } text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm`}
            />
            {state.errors?.price && (
              <p className="text-xs text-rose-400 font-medium">
                {state.errors.price}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="category" className="text-sm font-medium text-neutral-300">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Hardware"
              className={`w-full px-3 py-2 rounded-md bg-neutral-900 border ${
                state.errors?.category ? "border-rose-500" : "border-neutral-800"
              } text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm`}
            />
            {state.errors?.category && (
              <p className="text-xs text-rose-400 font-medium">
                {state.errors.category}
              </p>
            )}
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium text-neutral-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Brief overview of the product..."
            className={`w-full px-3 py-2 rounded-md bg-neutral-900 border ${
              state.errors?.description ? "border-rose-500" : "border-neutral-800"
            } text-neutral-100 focus:outline-none focus:border-cyan-500 text-sm resize-none`}
          />
          {state.errors?.description && (
            <p className="text-xs text-rose-400 font-medium">
              {state.errors.description}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 rounded-md font-medium text-sm bg-cyan-600 hover:bg-cyan-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && (
            <svg
              className="animate-spin h-4 w-4 text-cyan-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {isPending ? "Validating & Submitting..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
}