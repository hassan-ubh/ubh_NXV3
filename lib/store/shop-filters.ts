
export type ShopCollection =
  | "new-releases"
  | "best-sellers"
  | "ubh"
  | "series"
  | "offers"
  | "open-access";

export type ShopProductType = "ebook" | "textbook";

export type ShopFilters = {
  q?: string;
  category?: string;
  collection?: ShopCollection;
  type?: ShopProductType;
};

const collections = new Set<ShopCollection>([
  "new-releases",
  "best-sellers",
  "ubh",
  "series",
  "offers",
  "open-access",
]);

const productTypes = new Set<ShopProductType>(["ebook", "textbook"]);

export function normalizeSearch(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function parseShopFilters(
  params: Record<string, string | string[] | undefined>,
): ShopFilters {
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const q = first(params.q)?.trim().slice(0, 120);
  const category = first(params.category)?.trim().slice(0, 80);
  const rawCollection = first(params.collection);
  const rawType = first(params.type);

  return {
    ...(q ? { q } : {}),
    ...(category ? { category } : {}),
    ...(rawCollection && collections.has(rawCollection as ShopCollection)
      ? { collection: rawCollection as ShopCollection }
      : {}),
    ...(rawType && productTypes.has(rawType as ShopProductType)
      ? { type: rawType as ShopProductType }
      : {}),
  };
}
