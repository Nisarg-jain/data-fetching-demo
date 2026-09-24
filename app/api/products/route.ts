import { NextResponse } from "next/server";
import { addProductToDB } from "@/app/products-db/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, price, description, category } = body;

    if (!title || !price || !description || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newProduct = await addProductToDB({
      title,
      price: parseFloat(price),
      description,
      category,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}