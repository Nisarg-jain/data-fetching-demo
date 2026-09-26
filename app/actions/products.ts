"use server";

import { addProductToDB } from "@/app/products-db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type FormState = {
  errors?: {
    title?: string;
    price?: string;
    category?: string;
    description?: string;
  };
};

export async function createProduct(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title")?.toString().trim();
  const priceStr = formData.get("price")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  const errors: FormState["errors"] = {};

  if (!title) {
    errors.title = "Title is required";
  }

  if (!priceStr) {
    errors.price = "Price is required";
  } else {
    const numPrice = parseFloat(priceStr);
    if (isNaN(numPrice) || numPrice <= 0) {
      errors.price = "Price must be a valid positive number";
    }
  }

  if (!category) {
    errors.category = "Category is required";
  }

  if (!description) {
    errors.description = "Description is required";
  }


  if (Object.keys(errors).length > 0) {
    return { errors };
  }


  await addProductToDB({
    title: title!,
    price: parseFloat(priceStr!),
    category: category!,
    description: description!,
  });

  
  revalidatePath("/products-db");
  redirect("/products-db");
}