import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

// SQLite ডেটাবেজ — লোকাল ফাইলে অ্যাকাউন্ট সংরক্ষিত থাকে।
const dataDir = path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "bazardor.db"));
db.pragma("journal_mode = WAL");

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
