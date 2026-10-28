
// import { SiteHeader } from "@/components/shared/SiteHeader";
// import { StoreHeader } from "@/components/store/StoreHeader";
// import { Footer } from "@/components/shared/Footer";
// import type { Locale } from "@/lib/i18n";

// type LegalShellProps = {
//   locale: Locale;
//   source: "website" | "store";
//   children: React.ReactNode;
// };

// export function LegalShell({
//   locale,
//   source,
//   children,
// }: LegalShellProps) {
//   return (
//     <>
//       {source === "store" ? (
//         <StoreHeader locale={locale} />
//       ) : (
//         <SiteHeader locale={locale} />
//       )}

//       <main>{children}</main>

//       <Footer locale={locale} />
//     </>
//   );
// }

import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { StoreHeader } from "@/components/store/StoreHeader";
import { Footer } from "@/components/shared/Footer";

type LegalShellProps = {
  locale: Locale;
  source: "website" | "store";
  children: ReactNode;
};

export function LegalShell({
  locale,
  source,
  children,
}: LegalShellProps) {
  return (
    <>
      {source === "store" ? (
        <StoreHeader locale={locale} />
      ) : (
        <SiteHeader locale={locale} />
      )}

      {children}

      <Footer locale={locale}/>
    </>
  );
}
