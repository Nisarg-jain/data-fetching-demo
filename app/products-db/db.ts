export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
};

// Represents our internal database table records
const productsTable: Product[] = [
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

/**
 * Direct database query function.
 * In a Prisma/Drizzle setup, this maps to:
 * return await prisma.product.findMany();
 */
export async function getProductsFromDB(): Promise<Product[]> {
  // Simulates standard database query round-trip time (~300ms)
  await new Promise((resolve) => setTimeout(resolve, 300));
  return productsTable;
}