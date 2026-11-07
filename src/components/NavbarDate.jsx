"use client";

import { useEffect, useState } from "react";

export default function NavbarDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setDate(formattedDate);
  }, []);

  return (
    <span className="text-[10px] text-gray-500">
      {date || "\u00A0"}
    </span>
  );
}