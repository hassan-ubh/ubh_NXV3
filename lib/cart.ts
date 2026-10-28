import { products, type Product } from "@/lib/store/catalog";

export type CartItem = {
  productId: string;
  quantity: number;
};

const CART_KEY = "ubh-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(CART_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(items));

  window.dispatchEvent(new Event("ubh-cart-updated"));
}

export function addToCart(productId: string, quantity = 1) {
  const cart = getCart();

  const existing = cart.find(
    (item) => item.productId === productId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }

  saveCart(cart);
}

export function updateCartQuantity(
  productId: string,
  quantity: number
) {
  const cart = getCart();

  const item = cart.find(
    (item) => item.productId === productId
  );

  if (!item) {
    return;
  }

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantity = quantity;

  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(
    (item) => item.productId !== productId
  );

  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function getCartProducts() {
  const cart = getCart();

  return cart
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
      };
    })
    .filter(
      (
        item
      ): item is {
        product: Product;
        quantity: number;
      } => item !== null
    );
}