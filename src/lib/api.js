
const API_BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const result = await response.json();

  if (result?.success === false) {
    throw new Error(result.message || "তথ্য লোড করা যায়নি");
  }

  return result?.data ?? result;
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
