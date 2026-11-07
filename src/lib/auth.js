import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/integrations/next-js";
import Database from "better-sqlite3";
import path from "node:path";

// SQLite ডেটাবেজ — লোকাল ফাইলে অ্যাকাউন্ট সংরক্ষিত থাকে।
const databasePath = path.join(process.cwd(), "data", "bazardor.db");

const db = new Database(databasePath);
db.pragma("journal_mode = WAL");

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
