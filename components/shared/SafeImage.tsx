// "use client";

// import Image, { ImageProps } from "next/image";
// import { useState } from "react";

// interface SafeImageProps extends Omit<ImageProps, "src"> {
//   src?: string | null;
//   fallback?: React.ReactNode;
// }

// export function SafeImage({
//   src,
//   alt,
//   fallback,
//   ...props
// }: SafeImageProps) {
//   const [hasError, setHasError] = useState(false);

//   // No image provided
//   if (!src || hasError) {
//     return (
//       <>
//         {fallback ?? (
//           <div className="flex h-full w-full items-center justify-center bg-slate-50">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               className="h-10 w-10 text-slate-300"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 16.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v9.75A2.25 2.25 0 0118.75 18.75H5.25A2.25 2.25 0 013 16.5z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 15l4.5-4.5 3.75 3.75 2.25-2.25L21 18"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M8.25 8.25h.008v.008H8.25V8.25z"
//               />
//             </svg>
//           </div>
//         )}
//       </>
//     );
//   }

//   return (
//     <Image
//       {...props}
//       src={src}
//       alt={alt}
//       onError={() => setHasError(true)}
//     />
//   );
// }
"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallback?: React.ReactNode;
}

export function SafeImage({
  src,
  alt,
  fallback,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error when the image source changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // No image provided or image failed to load
  if (!src || hasError) {
    return (
      <>
        {fallback ?? (
          <div className="flex h-full w-full items-center justify-center bg-slate-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-10 w-10 text-slate-300"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v9.75A2.25 2.25 0 0118.75 18.75H5.25A2.25 2.25 0 013 16.5z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15l4.5-4.5 3.75 3.75 2.25-2.25L21 18"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 8.25h.008v.008H8.25V8.25z"
              />
            </svg>
          </div>
        )}
      </>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}