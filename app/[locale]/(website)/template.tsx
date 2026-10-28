import { PageTransition } from "@/components/shared/PageTransition";

export default function WebsiteTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
