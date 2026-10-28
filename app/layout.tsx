
import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/components/store/CartProvider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.ubh.ae"
  ),

  title: {
    default:
      "University Book House | Academic Knowledge Across the Arab World",
    template: "%s | UBH",
  },

  description:
    "University Book House publishes, distributes and powers academic knowledge across the Arab world.",

  keywords: [
    "University Book House",
    "UBH",
    "academic books",
    "academic publishing",
    "UAE",
    "eBooks",
    "universities",
  ],

  openGraph: {
    type: "website",
    siteName: "University Book House",
    title: "University Book House",
    description:
      "Advancing academic knowledge across the Arab world.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}