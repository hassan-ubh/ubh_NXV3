
// import type { ReactNode } from "react";

// interface PremiumHeroBackgroundProps {
//   children: ReactNode;
//   className?: string;
//   contentClassName?: string;
// }

// export function PremiumHeroBackground({
//   children,
//   className = "",
//   contentClassName = "",
// }: PremiumHeroBackgroundProps) {
//   return (
//     <section
//       className={`relative isolate overflow-hidden bg-[#071B35] text-white ${className}`}
//     >
//       {/* Background */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 overflow-hidden"
//       >
//         {/* Refined navy gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#102C4B] via-[#071B35] to-[#041226]" />

//         {/* Soft ambient lighting */}
//         <div className="absolute -right-40 -top-48 h-[420px] w-[520px] rounded-full bg-[#17639A]/10 blur-[100px]" />

//         <div className="absolute -bottom-52 -left-32 h-[380px] w-[460px] rounded-full bg-[#C89438]/[0.07] blur-[100px]" />

//         {/* Subtle architectural grid */}
//         <div
//           className="absolute inset-0 opacity-[0.07]"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, #8DB5D5 1px, transparent 1px),
//               linear-gradient(to bottom, #8DB5D5 1px, transparent 1px)
//             `,
//             backgroundSize: "76px 76px",
//             maskImage:
//               "linear-gradient(to bottom, transparent, black 20%, black 75%, transparent)",
//           }}
//         />

//         {/* Right-side editorial geometry */}
//         <div className="absolute -right-24 top-[-130px] h-[430px] w-[430px] rotate-45 border border-white/[0.07]" />

//         <div className="absolute -right-10 top-[-85px] h-[330px] w-[330px] rotate-45 border border-[#C89438]/[0.12]" />

//         {/* Restrained gold detail */}
//         <div className="absolute right-[12%] top-0 h-24 w-px bg-gradient-to-b from-[#D6AD67]/50 to-transparent" />

//         <div className="absolute bottom-0 left-[12%] h-24 w-px bg-gradient-to-t from-[#D6AD67]/35 to-transparent" />

//         {/* Subtle dotted detail */}
//         <div
//           className="absolute right-10 top-10 h-36 w-44 opacity-[0.16]"
//           style={{
//             backgroundImage:
//               "radial-gradient(#A9C7DE 1px, transparent 1px)",
//             backgroundSize: "18px 18px",
//             maskImage:
//               "linear-gradient(to left, black, transparent)",
//           }}
//         />

//         {/* Bottom gold separator */}
//         <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C89438]/50 to-transparent" />

//         {/* Center highlight */}
//         <div className="absolute bottom-0 left-1/2 h-[2px] w-20 -translate-x-1/2 bg-[#D6AD67]/70 shadow-[0_0_12px_rgba(200,148,56,0.3)]" />
//       </div>

//       {/* Foreground content */}
//       <div
//         className={`relative z-10 ${contentClassName}`}
//       >
//         {children}
//       </div>
//     </section>
//   );
// }




import type { ReactNode } from "react";

interface PremiumHeroBackgroundProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "dark" | "light";
}

export function PremiumHeroBackground({
  children,
  className = "",
  contentClassName = "",
  variant = "dark",
}: PremiumHeroBackgroundProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`
        relative isolate overflow-hidden
        ${isDark
          ? "bg-[#081B32] text-white"
          : "bg-[#F7F9FC] text-[#10243D]"
        }
        ${className}
      `}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {isDark ? (
          <>
            {/* Dark premium navy foundation */}
            <div className="
              absolute inset-0
              bg-gradient-to-br
              from-[#102B49]
              via-[#091E36]
              to-[#061326]
            " />

            {/* Soft blue illumination */}
            <div className="
              absolute -top-40 left-[20%]
              h-[420px] w-[620px]
              rounded-full
              bg-[#8CB9D8]/[0.09]
              blur-[110px]
            " />

            <div className="
              absolute -right-40 top-[20%]
              h-[380px] w-[480px]
              rounded-full
              bg-[#527FA8]/[0.10]
              blur-[110px]
            " />

            {/* Ambient center lighting */}
            <div className="
              absolute inset-0
              bg-[radial-gradient(ellipse_at_50%_35%,rgba(148,190,220,0.08),transparent_65%)]
            " />

            {/* Architectural geometry */}
            <div className="
              absolute -right-28 -top-40
              h-[400px] w-[400px]
              rotate-45
              border border-white/[0.045]
            " />

            <div className="
              absolute -right-12 -top-24
              h-[270px] w-[270px]
              rotate-45
              border border-[#D6B477]/[0.12]
            " />

            {/* Champagne accent */}
            <div className="
              absolute right-[12%] top-0
              h-28 w-px
              bg-gradient-to-b
              from-[#D6B477]/40
              to-transparent
            " />

            {/* Bottom depth */}
            <div className="
              absolute inset-0
              bg-gradient-to-b
              from-white/[0.015]
              via-transparent
              to-[#020B17]/25
            " />
          </>
        ) : (
          <>
            {/* Light premium foundation */}
            <div className="
              absolute inset-0
              bg-gradient-to-br
              from-white
              via-[#F7F9FC]
              to-[#EDF2F8]
            " />

            {/* Soft blue atmosphere */}
            <div className="
              absolute -top-40 left-[18%]
              h-[420px] w-[620px]
              rounded-full
              bg-[#B9D4EA]/[0.28]
              blur-[110px]
            " />

            <div className="
              absolute -right-40 top-[15%]
              h-[380px] w-[480px]
              rounded-full
              bg-[#D9E5F1]/[0.50]
              blur-[110px]
            " />

            {/* Gentle center illumination */}
            <div className="
              absolute inset-0
              bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.85),transparent_70%)]
            " />

            {/* Subtle architectural geometry */}
            <div className="
              absolute -right-28 -top-40
              h-[400px] w-[400px]
              rotate-45
              border border-[#173B61]/[0.055]
            " />

            <div className="
              absolute -right-12 -top-24
              h-[270px] w-[270px]
              rotate-45
              border border-[#C89438]/[0.16]
            " />

            {/* Champagne accent */}
            <div className="
              absolute right-[12%] top-0
              h-28 w-px
              bg-gradient-to-b
              from-[#C89438]/45
              to-transparent
            " />

            {/* Gentle bottom shading */}
            <div className="
              absolute inset-0
              bg-gradient-to-b
              from-transparent
              via-transparent
              to-[#DCE5EF]/[0.25]
            " />
          </>
        )}

        {/* Shared bottom accent */}
        <div className={`
          absolute inset-x-0 bottom-0 h-px
          ${isDark
            ? "bg-gradient-to-r from-transparent via-[#D6B477]/35 to-transparent"
            : "bg-gradient-to-r from-transparent via-[#C89438]/35 to-transparent"
          }
        `} />
      </div>

      {/* Foreground content */}
      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}
