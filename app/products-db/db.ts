export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
};

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Mechanical Wireless Keyboard",
    price: 129.99,
    description: "Compact 75% layout with hot-swappable tactile switches and RGB backlighting.",
    category: "Peripherals",
    inStock: true,
  },
  {
    id: 2,
    title: "Ultra-Wide Gaming Monitor 34\"",
    price: 499.99,
    description: "WQHD 144Hz curved display with 1ms response time and HDR400 support.",
    category: "Monitors",
    inStock: true,
  },
  {
    id: 3,
    title: "Ergonomic Mesh Chair",
    price: 249.5,
    description: "Adjustable lumbar support, 3D armrests, and breathable mesh backing.",
    category: "Furniture",
    inStock: false,
  },
  {
    id: 4,
    title: "Studio Monitoring Headphones",
    price: 149.0,
    description: "Closed-back dynamic drivers delivering neutral frequency response for audio mastering.",
    category: "Audio",
    inStock: true,
  },
];

// Global persistence for dev server hot-reloads
const globalForProducts = globalThis as unknown as {
  productsTable: Product[] | undefined;
};

export const productsTable =
  globalForProducts.productsTable ?? initialProducts;

if (process.env.NODE_ENV !== "production") {
  globalForProducts.productsTable = productsTable;
}

export async function getProductsFromDB(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return productsTable;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return productsTable.find((p) => p.id === id);
}

export async function addProductToDB(
  product: Omit<Product, "id" | "inStock">
): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newProduct: Product = {
    id: productsTable.length > 0 ? Math.max(...productsTable.map((p) => p.id)) + 1 : 1,
    ...product,
    inStock: true,
  };
  productsTable.push(newProduct);
  return newProduct;
}

export async function updateProductInDB(
  id: number,
  updatedData: Partial<Omit<Product, "id">>
): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = productsTable.findIndex((p) => p.id === id);
  if (index === -1) return null;

  productsTable[index] = {
    ...productsTable[index],
    ...updatedData,
  };
  return productsTable[index];
}

export async function deleteProductFromDB(id: number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const index = productsTable.findIndex((p) => p.id === id);
  if (index === -1) return false;

  productsTable.splice(index, 1);
  return true;
}