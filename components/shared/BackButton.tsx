"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  fallback: string;
};

export function BackButton({ fallback }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-7 inline-flex items-center gap-2 text-[10px] font-semibold text-ubh-blue-bright transition-colors hover:text-ubh-gold"
    >
      <ArrowLeft size={13} />
      Back
    </button>
  );
}