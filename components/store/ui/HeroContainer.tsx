import { ReactNode } from "react";

export function HeroContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        mx-auto w-full
        max-w-[1720px]
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        xl:px-12
        2xl:px-14
        ${className}
      `}
    >
      {children}
    </div>
  );
}