import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db, mongoClient } from "@/lib/mongodb";
import { createProfileIfMissing, syncProfileFromUser } from "@/lib/profiles";

// ইউজার তৈরি হওয়ার সাথে সাথে (ইমেইল/পাসওয়ার্ড বা সোশ্যাল লগইন) তার profile
// MongoDB-তে তৈরি হয়; নাম/ইমেইল/ছবি আপডেট হলে profile-ও হালনাগাদ হয়।
// দুটোই upsert ব্যবহার করে, তাই একই ইউজারের ডুপ্লিকেট profile তৈরি হয় না।
async function runProfileHook(label, action) {
  try {
    await action();
  } catch (error) {
    // profile ব্যর্থ হলেও রেজিস্ট্রেশন/লগইন ব্যর্থ হবে না — পরে
    // /api/profile পড়ার সময় profile নিজে থেকেই তৈরি/মেরামত হয়ে যায়।
    console.error(`[auth] profile ${label} failed:`, error?.message ?? error);
  }
}

export const auth = betterAuth({
  database: mongodbAdapter(db, { client: mongoClient }),

  // signup/social login-এর পরে profile তৈরি ও হালনাগাদ এখান থেকেই হয়,
  // তাই ক্লায়েন্ট কোনো তথ্য নিজে থেকে পাঠাতে পারে না (নিরাপদ)।
  databaseHooks: {
    user: {
      create: {
        after: (user) =>
          runProfileHook("create", () => createProfileIfMissing(user)),
      },
      update: {
        after: (user) =>
          runProfileHook("update", () => syncProfileFromUser(user)),
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
  plugins: [nextCookies()],
});
