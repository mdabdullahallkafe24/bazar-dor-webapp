"use client";

import { useSyncExternalStore } from "react";

// তারিখ একটি external, সময়ভিত্তিক data — তাই effect-এর বদলে
// useSyncExternalStore দিয়ে পড়া হয় (hydration mismatch ছাড়াই)।
const subscribe = () => () => {};

const formatDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

// SSR-এ খালি থাকে, ব্রাউজারে আজকের তারিখ দেখায়।
const getServerDate = () => "";

let clientDate = null;
const getClientDate = () => {
  if (clientDate === null) {
    clientDate = formatDate();
  }

  return clientDate;
};

export default function NavbarDate() {
  const date = useSyncExternalStore(subscribe, getClientDate, getServerDate);

  return (
    <span className="text-[10px] text-gray-500">
      {date || "\u00A0"}
    </span>
  );
}
