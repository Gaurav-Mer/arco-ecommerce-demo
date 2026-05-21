import { api } from "@/api/axios-instance";
import type { Product, ProductsResponse } from "@/types";

export async function getProducts(
  limit = 100,
  skip = 0
): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>("/products", {
    params: { limit, skip },
  });
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await api.get<string[]>("/products/category-list");
  return data;
}

export async function searchProducts(query: string, category?: string): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>("/products/search", {
    params: { q: query },
  });
  if (category && data?.products) {
    data.products = data.products.filter(product => product.category === category) ?? []
  }
  return data;
}

export async function getProductsByCategory(
  category: string
): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>(
    `/products/category/${category}`
  );
  return data;
}
