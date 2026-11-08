
import { unstable_rethrow } from "next/navigation";

const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request(endpoint) {
  let lastError = null;

  for (const baseURL of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();

      if (result?.success === false) {
        throw new Error(
          result.message || "তথ্য লোড করা যায়নি"
        );
      }

      return result?.data ?? result;
    } catch (error) {
      // Preserve Next.js internal rendering errors.
      unstable_rethrow(error);

      lastError = error;
      console.error(`API failed: ${baseURL}${endpoint}`, error);
    }
  }

  throw new Error(
    `সব API server থেকে তথ্য লোড করা যায়নি: ${
      lastError?.message || "Unknown error"
    }`
  );
}

function normalizeList(result, key) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.[key])) return result[key];
  if (Array.isArray(result?.items)) return result.items;

  return [];
}

export async function getProducts(category) {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  const result = await request(`/products${query}`);

  return normalizeList(result, "products");
}

export async function getProduct(slug) {
  const result = await request(
    `/products?slug=${encodeURIComponent(slug)}`
  );

  if (Array.isArray(result) && result.length > 0) {
    return result[0];
  }

  if (Array.isArray(result)) {
    const byId = await request(
      `/products/${encodeURIComponent(slug)}`
    );

    return byId?.product ?? byId?.item ?? byId;
  }

  return result?.product ?? result?.item ?? result;
}

export async function getCategories() {
  const result = await request("/categories");

  return normalizeList(result, "categories");
}

export async function getCategory(slug) {
  const result = await request(
    `/categories/${encodeURIComponent(slug)}`
  );

  return result?.category ?? result;
}

