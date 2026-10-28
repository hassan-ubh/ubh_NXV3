"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/data/products";

import {
  addToCart as addItem,
  clearCart as clearCartStorage,
  getCartCount,
  getCartProducts,
  removeFromCart,
  updateCartQuantity,
} from "@/lib/cart";

type CartProduct = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartProduct[];
  count: number;

  addToCart: (
    product: Product,
    quantity?: number
  ) => boolean;

  updateQuantity: (
    productId: string,
    quantity: number
  ) => void;

  removeItem: (productId: string) => void;

  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(
  null
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [count, setCount] = useState(0);

  function refreshCart() {
    const cartProducts = getCartProducts();
    setItems(cartProducts);
    setCount(getCartCount());
  }

  useEffect(() => {
    refreshCart();

    const handleCartUpdate = () => {
      refreshCart();
    };

    window.addEventListener(
      "ubh-cart-updated",
      handleCartUpdate
    );

    window.addEventListener(
      "storage",
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        "ubh-cart-updated",
        handleCartUpdate
      );

      window.removeEventListener(
        "storage",
        handleCartUpdate
      );
    };
  }, []);

  function addToCart(
    product: Product,
    quantity = 1
  ) {
    const current = items.find(
      (item) => item.product.id === product.id
    );

    const currentQuantity = current?.quantity ?? 0;

    if (
      product.stock <= 0 ||
      currentQuantity + quantity > product.stock
    ) {
      return false;
    }

    addItem(product.id, quantity);
    refreshCart();

    return true;
  }

  function updateQuantity(
    productId: string,
    quantity: number
  ) {
    const item = items.find(
      (item) => item.product.id === productId
    );

    if (!item) {
      return;
    }

    const maxStock = item.product.stock;

    const safeQuantity = Math.min(
      Math.max(quantity, 1),
      maxStock
    );

    updateCartQuantity(
      productId,
      safeQuantity
    );

    refreshCart();
  }

  function removeItem(productId: string) {
    removeFromCart(productId);
    refreshCart();
  }

  function clearCart() {
    clearCartStorage();
    refreshCart();
  }

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}