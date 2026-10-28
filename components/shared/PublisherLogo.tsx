"use client";

import Image from "next/image";
import { useState } from "react";

interface PublisherLogoProps {
  src?: string | null;
  name: string;
}

export function PublisherLogo({
  src,
  name,
}: PublisherLogoProps) {
  const [failed, setFailed] = useState(false);

  // No image URL at all
  if (!src || failed) {
    return (
      <div className="flex h-[150px] w-[190px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-white">
        <div className="mb-2 text-3xl">📚</div>

        <div className="px-3 text-center text-sm font-semibold text-slate-600">
          {name}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[150px] w-[190px] items-center justify-center rounded-lg border border-slate-200 bg-white">
      <Image
        src={src}
        alt={`${name} logo`}
        width={180}
        height={100}
        className="max-h-[100px] max-w-[160px] object-contain"
        onError={() => {
          setFailed(true);
        }}
      />
    </div>
  );
}