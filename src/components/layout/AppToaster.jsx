"use client";

import dynamic from "next/dynamic";

// টোস্ট UI শুধু ব্রাউজারে লোড হয় (ssr: false)। সার্ভার/প্রিরেন্ডারে
// sonner না চলায় হোম পেজের প্রিরেন্ডারে অস্থির Date.now() এরর আসে না।
// টোস্ট আগেও ফায়ার করলে sonner-এর মডিউল-স্টোর সেগুলো পরে দেখায়।
const Toaster = dynamic(
  () => import("sonner").then((module) => module.Toaster),
  { ssr: false }
);

export default function AppToaster() {
  return <Toaster position="top-center" richColors closeButton />;
}
