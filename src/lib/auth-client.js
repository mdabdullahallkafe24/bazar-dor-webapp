import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});


export function friendlyAuthError(message) {
  if (!message) return "";

  const text = String(message);

  if (/provider not found/i.test(text)) {
    return "এই সোশ্যাল লগইন প্রোভাইডার এখনো কনফিগার করা হয়নি।";
  }

  if (/user already exists/i.test(text)) {
    return "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।";
  }

  if (/invalid email or password/i.test(text)) {
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  }

  if (/password.*(?:too short|at least)/i.test(text)) {
    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  }

  if (/invalid email/i.test(text)) {
    return "সঠিক ইমেইল ঠিকানা লিখুন।";
  }

  if (/fetch|network|ECONN|timed? ?out/i.test(text)) {
    return "ইন্টারনেট সংযোগ পরীক্ষা করুন।";
  }

  return text;
}
