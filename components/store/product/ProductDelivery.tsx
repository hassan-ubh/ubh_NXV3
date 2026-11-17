
// // "use client";

// // import { useState } from "react";
// // import { Globe2, MapPin, Truck, PackageCheck, ShieldCheck, RotateCcw, ChevronDown } from "lucide-react";

// // type Locale = "en" | "ar";

// // type ProductDeliveryProps = {
// //   locale?: Locale;
// //   inStock?: boolean;
// //   stockQuantity?: number;
// // };

// // const copy = {
// //   en: {
// //     delivery: "Delivery & Shipping",
// //     subtitle: "Delivery options for your destination",
// //     destination: "Shipping destination",
// //     uae: "United Arab Emirates",
// //     international: "International destination",
// //     country: "Enter your country",
// //     uaeTitle: "UAE Domestic Delivery",
// //     uaeDescription: "Delivery available across the UAE.",
// //     internationalTitle: "International Shipping",
// //     internationalDescription:
// //       "International delivery to supported destinations.",
// //     uaeEstimate: "Estimated delivery: 2–5 business days",
// //     internationalEstimate:
// //       "Delivery estimate confirmed at checkout",
// //     shippingCost: "Shipping charges",
// //     calculated: "Calculated at checkout based on destination and shipment details.",
// //     tracking: "Trackable delivery",
// //     trackingDescription: "Tracking information provided after dispatch.",
// //     packaging: "Careful packaging",
// //     packagingDescription: "Books packed carefully for safe transportation.",
// //     returns: "Returns & support",
// //     returnsDescription: "See our returns policy for eligibility and conditions.",
// //     secure: "Secure checkout",
// //     secureDescription: "Your order details are processed securely.",
// //     stock: "In stock",
// //     lowStock: "Limited stock",
// //     outOfStock: "Currently unavailable",
// //     available: "Available for purchase",
// //     note: "Final delivery availability, cost and estimated arrival are confirmed during checkout.",
// //   },
// //   ar: {
// //     delivery: "التوصيل والشحن",
// //     subtitle: "خيارات التوصيل حسب وجهتك",
// //     destination: "وجهة الشحن",
// //     uae: "الإمارات العربية المتحدة",
// //     international: "وجهة دولية",
// //     country: "أدخل الدولة",
// //     uaeTitle: "الشحن المحلي داخل الإمارات",
// //     uaeDescription: "التوصيل متاح إلى مختلف أنحاء الإمارات.",
// //     internationalTitle: "الشحن الدولي",
// //     internationalDescription: "الشحن الدولي إلى الوجهات المدعومة.",
// //     uaeEstimate: "التوصيل المتوقع: 2–5 أيام عمل",
// //     internationalEstimate: "يتم تأكيد موعد التوصيل عند إتمام الطلب",
// //     shippingCost: "رسوم الشحن",
// //     calculated: "تُحسب عند إتمام الطلب حسب الوجهة وتفاصيل الشحنة.",
// //     tracking: "تتبع الشحنة",
// //     trackingDescription: "يتم توفير معلومات التتبع بعد الشحن.",
// //     packaging: "تغليف آمن",
// //     packagingDescription: "تغليف الكتب بعناية لضمان سلامة النقل.",
// //     returns: "الإرجاع والدعم",
// //     returnsDescription: "راجع سياسة الإرجاع لمعرفة الشروط والأحكام.",
// //     secure: "دفع آمن",
// //     secureDescription: "تتم معالجة تفاصيل طلبك بشكل آمن.",
// //     stock: "متوفر",
// //     lowStock: "كمية محدودة",
// //     outOfStock: "غير متوفر حالياً",
// //     available: "متاح للشراء",
// //     note: "يتم تأكيد إمكانية التوصيل والتكلفة والموعد المتوقع عند إتمام الطلب.",
// //   },
// // };

// // export default function ProductDelivery({
// //   locale = "en",
// //   inStock = true,
// //   stockQuantity,
// // }: ProductDeliveryProps) {
// //   const isArabic = locale === "ar";
// //   const t = copy[locale];

// //   const [destination, setDestination] = useState<"uae" | "international">("uae");
// //   const [country, setCountry] = useState("");

// //   const isAvailable = inStock && (stockQuantity === undefined || stockQuantity > 0);

// //   const stockLabel = !isAvailable
// //     ? t.outOfStock
// //     : stockQuantity !== undefined && stockQuantity <= 5
// //       ? t.lowStock
// //       : t.stock;

// //   return (
// //     <section
// //       dir={isArabic ? "rtl" : "ltr"}
// //       className="w-full space-y-4"
// //     >
// //       {/* Heading */}
// //       <div className="space-y-1">
// //         <h3 className="text-lg font-semibold tracking-tight text-slate-900">
// //           {t.delivery}
// //         </h3>
// //         <p className="text-sm text-slate-500">{t.subtitle}</p>
// //       </div>

// //       {/* Destination selector */}
// //       <div className="rounded-xl border border-slate-200 bg-white p-4">
// //         <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
// //           <MapPin size={17} className="text-[#b8822c]" />
// //           {t.destination}
// //         </label>

// //         <div className="grid grid-cols-2 gap-2">
// //           <button
// //             type="button"
// //             onClick={() => setDestination("uae")}
// //             className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition ${
// //               destination === "uae"
// //                 ? "border-[#b8822c] bg-[#b8822c]/5 text-[#8c601e]"
// //                 : "border-slate-200 text-slate-600 hover:bg-slate-50"
// //             }`}
// //           >
// //             <MapPin size={16} />
// //             {t.uae}
// //           </button>

// //           <button
// //             type="button"
// //             onClick={() => setDestination("international")}
// //             className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition ${
// //               destination === "international"
// //                 ? "border-[#b8822c] bg-[#b8822c]/5 text-[#8c601e]"
// //                 : "border-slate-200 text-slate-600 hover:bg-slate-50"
// //             }`}
// //           >
// //             <Globe2 size={16} />
// //             {t.international}
// //           </button>
// //         </div>

// //         {destination === "international" && (
// //           <div className="mt-3">
// //             <input
// //               type="text"
// //               value={country}
// //               onChange={(e) => setCountry(e.target.value)}
// //               placeholder={t.country}
// //               aria-label={t.country}
// //               className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#b8822c] focus:ring-2 focus:ring-[#b8822c]/10"
// //             />
// //           </div>
// //         )}
// //       </div>

// //       {/* Shipping information */}
// //       <div className="rounded-xl border border-slate-200 bg-white p-4">
// //         <div className="flex items-start gap-3">
// //           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#b8822c]/10 text-[#b8822c]">
// //             {destination === "uae" ? (
// //               <Truck size={20} />
// //             ) : (
// //               <Globe2 size={20} />
// //             )}
// //           </div>

// //           <div className="min-w-0 flex-1">
// //             <h4 className="text-sm font-semibold text-slate-900">
// //               {destination === "uae"
// //                 ? t.uaeTitle
// //                 : t.internationalTitle}
// //             </h4>

// //             <p className="mt-1 text-sm leading-relaxed text-slate-500">
// //               {destination === "uae"
// //                 ? t.uaeDescription
// //                 : t.internationalDescription}
// //             </p>

// //             <p className="mt-2 text-sm font-medium text-[#9a702d]">
// //               {destination === "uae"
// //                 ? t.uaeEstimate
// //                 : t.internationalEstimate}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Shipping cost */}
// //       <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
// //         <PackageCheck
// //           size={19}
// //           className="mt-0.5 shrink-0 text-[#b8822c]"
// //         />
// //         <div>
// //           <p className="text-sm font-semibold text-slate-800">
// //             {t.shippingCost}
// //           </p>
// //           <p className="mt-1 text-sm leading-relaxed text-slate-500">
// //             {t.calculated}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Stock status */}
// //       <div className="flex items-center justify-between border-y border-slate-100 py-3">
// //         <span className="text-sm text-slate-600">
// //           {t.available}
// //         </span>
// //         <span
// //           className={`flex items-center gap-2 text-sm font-semibold ${
// //             isAvailable ? "text-emerald-700" : "text-red-600"
// //           }`}
// //         >
// //           <span className={`h-2 w-2 rounded-full ${
// //             isAvailable ? "bg-emerald-500" : "bg-red-500"
// //           }`} />
// //           {stockLabel}
// //         </span>
// //       </div>

// //       {/* Service benefits */}
// //       <div className="grid gap-3 sm:grid-cols-2">
// //         <Benefit
// //           icon={<PackageCheck size={18} />}
// //           title={t.tracking}
// //           description={t.trackingDescription}
// //         />
// //         <Benefit
// //           icon={<ShieldCheck size={18} />}
// //           title={t.secure}
// //           description={t.secureDescription}
// //         />
// //         <Benefit
// //           icon={<RotateCcw size={18} />}
// //           title={t.returns}
// //           description={t.returnsDescription}
// //         />
// //         <Benefit
// //           icon={<Truck size={18} />}
// //           title={t.packaging}
// //           description={t.packagingDescription}
// //         />
// //       </div>

// //       <p className="text-xs leading-relaxed text-slate-400">
// //         {t.note}
// //       </p>
// //     </section>
// //   );
// // }

// // function Benefit({
// //   icon,
// //   title,
// //   description,
// // }: {
// //   icon: React.ReactNode;
// //   title: string;
// //   description: string;
// // }) {
// //   return (
// //     <div className="flex items-start gap-3">
// //       <span className="mt-0.5 text-[#b8822c]">{icon}</span>
// //       <div>
// //         <p className="text-sm font-medium text-slate-800">{title}</p>
// //         <p className="mt-1 text-xs leading-relaxed text-slate-500">
// //           {description}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import {
//   Truck,
//   Globe2,
//   MapPin,
//   ShieldCheck,
//   PackageCheck,
//   ChevronDown,
//   Info,
// } from "lucide-react";

// type Locale = "en" | "ar";
// type DeliveryType = "uae" | "international";

// type ProductDeliveryProps = {
//   locale?: Locale;
//   supportedCountries?: string[];
// };

// const countries = [
//   "Saudi Arabia",
//   "Oman",
//   "Bahrain",
//   "Kuwait",
//   "Qatar",
//   "India",
//   "United Kingdom",
//   "United States",
//   "Germany",
//   "France",
//   "Pakistan",
//   "Egypt",
// ];

// const translations = {
//   en: {
//     title: "Delivery options",
//     subtitle: "Choose where you would like your order delivered.",
//     uae: "Within UAE",
//     international: "International",
//     domesticTitle: "Delivery across the UAE",
//     internationalTitle: "International delivery",
//     domesticDescription:
//       "Domestic delivery options are available across the United Arab Emirates.",
//     internationalDescription:
//       "Choose your destination to check international shipping availability.",
//     destination: "Destination country",
//     selectCountry: "Select a country",
//     shipping: "Shipping cost",
//     calculated: "Calculated at checkout",
//     deliveryTime: "Delivery estimate",
//     domesticTime: "Confirmed at checkout",
//     internationalTime: "Depends on destination",
//     tracking: "Shipment tracking",
//     trackingDescription: "Tracking details are provided after dispatch.",
//     packaging: "Secure book packaging",
//     packagingDescription: "Books are carefully prepared for shipment.",
//     secure: "Secure checkout",
//     secureDescription: "Order information is handled securely.",
//     returns: "Returns & support",
//     returnsDescription: "See our returns policy for applicable conditions.",
//     availability: "Shipping availability",
//     availabilityDescription:
//       "Final availability, delivery estimates and charges are confirmed at checkout.",
//     countryRequired: "Select your destination country to continue.",
//     countryNote:
//       "Selecting a country here does not confirm shipping availability. Please verify at checkout.",
//     noCountries: "No international destinations configured.",
//   },
//   ar: {
//     title: "خيارات التوصيل",
//     subtitle: "اختر وجهة توصيل طلبك.",
//     uae: "داخل الإمارات",
//     international: "دولي",
//     domesticTitle: "التوصيل في جميع أنحاء الإمارات",
//     internationalTitle: "التوصيل الدولي",
//     domesticDescription:
//       "خيارات التوصيل المحلي متاحة في مختلف أنحاء دولة الإمارات العربية المتحدة.",
//     internationalDescription:
//       "اختر وجهتك للتحقق من توفر الشحن الدولي.",
//     destination: "دولة الوجهة",
//     selectCountry: "اختر الدولة",
//     shipping: "رسوم الشحن",
//     calculated: "تُحسب عند إتمام الطلب",
//     deliveryTime: "موعد التوصيل المتوقع",
//     domesticTime: "يتم التأكيد عند إتمام الطلب",
//     internationalTime: "يعتمد على الوجهة",
//     tracking: "تتبع الشحنة",
//     trackingDescription: "يتم توفير تفاصيل التتبع بعد الشحن.",
//     packaging: "تغليف آمن للكتب",
//     packagingDescription: "يتم تجهيز الكتب بعناية للشحن.",
//     secure: "دفع آمن",
//     secureDescription: "تتم معالجة معلومات الطلب بشكل آمن.",
//     returns: "الإرجاع والدعم",
//     returnsDescription: "راجع سياسة الإرجاع لمعرفة الشروط المطبقة.",
//     availability: "توفر الشحن",
//     availabilityDescription:
//       "يتم تأكيد التوفر وموعد التوصيل والرسوم عند إتمام الطلب.",
//     countryRequired: "يرجى اختيار دولة الوجهة للمتابعة.",
//     countryNote:
//       "اختيار الدولة هنا لا يؤكد توفر الشحن. يرجى التحقق عند إتمام الطلب.",
//     noCountries: "لم يتم إعداد وجهات دولية.",
//   },
// };

// export default function ProductDelivery({
//   locale = "en",
//   supportedCountries = countries,
// }: ProductDeliveryProps) {
//   const isArabic = locale === "ar";
//   const t = translations[locale];

//   const [deliveryType, setDeliveryType] =
//     useState<DeliveryType>("uae");

//   const [selectedCountry, setSelectedCountry] = useState("");

//   const [expanded, setExpanded] = useState(false);

//   const availableCountries = supportedCountries;

//   const isInternational = deliveryType === "international";

//   const canContinue =
//     !isInternational || Boolean(selectedCountry);

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white"
//       aria-label={t.title}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8f3e9] text-[#a8792c]">
//             <Truck size={20} strokeWidth={1.8} />
//           </div>

//           <div>
//             <h3 className="text-sm font-semibold text-[#102b4e]">
//               {t.title}
//             </h3>
//             <p className="mt-0.5 text-xs text-slate-500">
//               {t.subtitle}
//             </p>
//           </div>
//         </div>

//         <PackageCheck
//           size={20}
//           className="shrink-0 text-[#b8822c]"
//         />
//       </div>

//       <div className="space-y-4 p-4 sm:p-5">
//         {/* Delivery tabs */}
//         <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
//           <button
//             type="button"
//             onClick={() => setDeliveryType("uae")}
//             aria-pressed={!isInternational}
//             className={`flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-xs font-semibold transition-all ${
//               !isInternational
//                 ? "bg-white text-[#102b4e] shadow-sm ring-1 ring-slate-200/70"
//                 : "text-slate-500 hover:text-slate-800"
//             }`}
//           >
//             <MapPin size={15} />
//             {t.uae}
//           </button>

//           <button
//             type="button"
//             onClick={() => setDeliveryType("international")}
//             aria-pressed={isInternational}
//             className={`flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-xs font-semibold transition-all ${
//               isInternational
//                 ? "bg-white text-[#102b4e] shadow-sm ring-1 ring-slate-200/70"
//                 : "text-slate-500 hover:text-slate-800"
//             }`}
//           >
//             <Globe2 size={15} />
//             {t.international}
//           </button>
//         </div>

//         {/* Destination */}
//         {/* {isInternational && (
//           <div className="space-y-2">
//             <label
//               htmlFor="product-delivery-country"
//               className="block text-xs font-semibold text-slate-700"
//             >
//               {t.destination}
//             </label>

//             <div className="relative">
//               <select
//                 id="product-delivery-country"
//                 value={selectedCountry}
//                 onChange={(event) =>
//                   setSelectedCountry(event.target.value)
//                 }
//                 className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#b8822c] focus:ring-2 focus:ring-[#b8822c]/10"
//               >
//                 <option value="">{t.selectCountry}</option>

//                 {availableCountries.map((country) => (
//                   <option key={country} value={country}>
//                     {country}
//                   </option>
//                 ))}
//               </select>

//               <ChevronDown
//                 size={16}
//                 className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${
//                   isArabic ? "left-3" : "right-3"
//                 }`}
//               />
//             </div>

//             {availableCountries.length === 0 && (
//               <p className="text-xs text-amber-700">
//                 {t.noCountries}
//               </p>
//             )}
//           </div>
//         )} */}

//         {/* Delivery summary */}
//         <div className="rounded-lg border border-[#e9edf2] bg-[#fbfcfd] p-4">
//           <div className="flex items-start gap-3">
//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#b8822c] shadow-sm">
//               {isInternational ? (
//                 <Globe2 size={18} />
//               ) : (
//                 <Truck size={18} />
//               )}
//             </div>

//             <div className="min-w-0 flex-1">
//               <h4 className="text-sm font-semibold text-[#102b4e]">
//                 {isInternational
//                   ? t.internationalTitle
//                   : t.domesticTitle}
//               </h4>

//               <p className="mt-1 text-xs leading-5 text-slate-500">
//                 {isInternational
//                   ? t.internationalDescription
//                   : t.domesticDescription}
//               </p>

//               {isInternational && selectedCountry && (
//                 <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#f5f0e6] px-2.5 py-1.5 text-xs font-semibold text-[#8b652b]">
//                   <MapPin size={13} />
//                   {selectedCountry}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-3">
//             <div>
//               <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
//                 {t.shipping}
//               </p>
//               <p className="mt-1 text-xs font-semibold text-[#102b4e]">
//                 {t.calculated}
//               </p>
//             </div>

//             <div>
//               <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
//                 {t.deliveryTime}
//               </p>
//               <p className="mt-1 text-xs font-semibold text-[#102b4e]">
//                 {isInternational
//                   ? t.internationalTime
//                   : t.domesticTime}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Additional details */}
//         <button
//           type="button"
//           onClick={() => setExpanded((current) => !current)}
//           aria-expanded={expanded}
//           className="flex w-full items-center justify-between gap-3 py-1 text-start text-xs font-semibold text-[#315477] transition hover:text-[#b8822c]"
//         >
//           <span>
//             {isArabic ? "معلومات الشحن والخدمات" : "Shipping & service information"}
//           </span>

//           <ChevronDown
//             size={16}
//             className={`shrink-0 transition-transform ${
//               expanded ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {expanded && (
//           <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
//             <ServiceItem
//               icon={<PackageCheck size={17} />}
//               title={t.tracking}
//               description={t.trackingDescription}
//             />

//             <ServiceItem
//               icon={<ShieldCheck size={17} />}
//               title={t.secure}
//               description={t.secureDescription}
//             />

//             <ServiceItem
//               icon={<Truck size={17} />}
//               title={t.packaging}
//               description={t.packagingDescription}
//             />

//             <ServiceItem
//               icon={<Info size={17} />}
//               title={t.returns}
//               description={t.returnsDescription}
//             />
//           </div>
//         )}

//         {/* Checkout note */}
//         <div className="flex items-start gap-2 rounded-md bg-slate-50 px-3 py-2.5">
//           <Info
//             size={15}
//             className="mt-0.5 shrink-0 text-slate-400"
//           />

//           <p className="text-[11px] leading-5 text-slate-500">
//             {isInternational
//               ? t.countryNote
//               : t.availabilityDescription}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ServiceItem({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="flex items-start gap-2.5">
//       <span className="mt-0.5 shrink-0 text-[#b8822c]">
//         {icon}
//       </span>

//       <div className="min-w-0">
//         <p className="text-xs font-semibold text-slate-700">
//           {title}
//         </p>
//         <p className="mt-1 text-[11px] leading-5 text-slate-500">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";

import {
  Truck,
  Globe2,
  ShieldCheck,
  PackageCheck,
  Info,
} from "lucide-react";

type Locale = "en" | "ar";

type ProductDeliveryProps = {
  locale?: Locale;
};

const translations = {
  en: {
    title: "Shopping with confidence",
    subtitle: "A convenient and secure shopping experience with UBH.",
    features: [
      {
        title: "UAE Delivery",
        description: "Convenient delivery across the UAE.",
      },
      {
        title: "International Reach",
        description: "International delivery options available.",
      },
      {
        title: "Secure Payment",
        description: "Secure payment during checkout.",
      },
      {
        title: "Careful Packaging",
        description: "Books packed with care for delivery.",
      },
    ],
    note: "Shipping charges and delivery availability are confirmed at checkout.",
  },
  ar: {
    title: "تسوّق بكل ثقة",
    subtitle: "تجربة تسوّق مريحة وآمنة مع دار الكتب الجامعية.",
    features: [
      {
        title: "التوصيل داخل الإمارات",
        description: "توصيل مريح إلى مختلف أنحاء الإمارات.",
      },
      {
        title: "التوصيل الدولي",
        description: "خيارات توصيل دولية متاحة.",
      },
      {
        title: "دفع آمن",
        description: "دفع آمن عند إتمام الطلب.",
      },
      {
        title: "تغليف بعناية",
        description: "تجهيز الكتب وتغليفها بعناية للشحن.",
      },
    ],
    note: "يتم تأكيد رسوم الشحن وتوفر التوصيل عند إتمام الطلب.",
  },
};

const icons = [
  Truck,
  Globe2,
  ShieldCheck,
  PackageCheck,
];

export default function ProductDelivery({
  locale = "en",
}: ProductDeliveryProps) {
  const isArabic = locale === "ar";
  const t = translations[locale];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white"
    >
      <div className="p-4 sm:p-5">
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-[#102b4e]">
            {t.title}
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {t.features.map((feature, index) => {
            const Icon = icons[index];

            return (
              <div
                key={feature.title}
                className="flex items-start gap-2.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8f3e9] text-[#a8792c]">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#102b4e]">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-[1.6] text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-start gap-2 border-t border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
        <Info
          size={14}
          className="mt-0.5 shrink-0 text-[#b8822c]"
        />
        <p className="text-[11px] leading-5 text-slate-500">
          {t.note}
        </p>
      </div>
    </section>
  );
}
