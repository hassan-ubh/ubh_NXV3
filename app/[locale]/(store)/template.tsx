import { PageTransition } from "@/components/shared/PageTransition";

export default function StoreTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
