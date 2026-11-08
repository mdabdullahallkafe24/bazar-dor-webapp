import dns from "node:dns";
import { MongoClient } from "mongodb";

// MongoDB সংযোগ এখানে কেন্দ্রীভূত — auth (better-auth) ও profile দুটোই
// একই client/db ব্যবহার করে, তাই প্রতিবার নতুন connection খোলা হয় না।

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI পাওয়া যায়নি। .env.local ফাইলে MongoDB connection string সেট করুন।"
  );
}

const FALLBACK_DNS = ["8.8.8.8", "8.8.4.4", "1.1.1.1"];

const localDnsServers = dns.getServers();
const hasBrokenLocalDns =
  localDnsServers.length === 0 ||
  localDnsServers.every((server) => server === "::1" || server.startsWith("127."));

// mongodb+srv URI রেজল্ভ করতে SRV কোয়েরি দরকার। এই মেশিনে লোকাল DNS স্টাব
// (127.0.0.1) SRV কোয়েরি রিফিউজ করে, তাই পাবলিক DNS ব্যবহার করা হয়।
// সতর্কতা: Node-এ প্রথম setServers() কল কখনো কার্যকর হয় না — একটি DNS কোয়েরির
// পর আবার সেট করলে তা কাজ করে (পরীক্ষায় নিশ্চিত করা হয়)। তাই কোয়েরি → সেট →
// কোয়েরি ধারাবাহিকভাবে চালিয়ে চ্যানেল প্রিম করা হয়।
async function ensureReliableDns() {
  if (!hasBrokenLocalDns) return;

  const authority = mongoUri.split("@")[1]?.split("/")[0];
  const srvName = authority ? `_mongodb._tcp.${authority}` : null;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    // c-ares চ্যানেল আগে থেকেই ইনিশিয়ালাইজ হোক (ব্যর্থ হলেও চলবে)
    if (srvName) {
      await dns.promises.resolveSrv(srvName).catch(() => {});
    }
    dns.setServers(FALLBACK_DNS);
    if (!srvName) return;
    try {
      await dns.promises.resolveSrv(srvName);
      dns.setServers(FALLBACK_DNS); // কার্যকর অবস্থা আবার প্রয়োগ
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100 * (attempt + 1)));
    }
  }

  console.warn(
    "[mongo] DNS SRV preflight ব্যর্থ — mongodb+srv রেজল্শন কাজ নাও করতে পারে।"
  );
}

// টপ-লেভেল await এখানে Turbopack-এর কমপাইল অনিশ্চিতকালের জন্য আটকে দেয়,
// তাই promise চেইন ব্যবহার করা হয়। রুট/হ্যান্ডলারগুলো mongoReady অপেক্ষা করে
// তারপর ডেটাবেজে কাজ করে — ডিএনএস প্রিমিং আগে শেষ হয়।
export const mongoReady = ensureReliableDns()
  .then(() => ensureMongoIndexes(db))
  .catch((error) => {
    console.error("MongoDB index setup failed:", error?.message ?? error);
  });

const globalForMongo = globalThis;

export const mongoClient =
  globalForMongo.__bazardorMongoClient ?? new MongoClient(mongoUri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__bazardorMongoClient = mongoClient;
}

export const db = mongoClient.db();

// better-auth-এর user/session এবং আমাদের profile কালেকশনের index একসাথে তৈরি হয়।
// profile-এর userId unique index-ই ডুপ্লিকেট profile আটকায়।
async function ensureMongoIndexes(database) {
  await Promise.all([
    database
      .collection("user")
      .createIndex({ email: 1 }, { unique: true, name: "user_email_uidx" }),
    database
      .collection("session")
      .createIndex({ token: 1 }, { unique: true, name: "session_token_uidx" }),
    database
      .collection("profiles")
      .createIndex({ userId: 1 }, { unique: true, name: "profile_userId_uidx" }),
  ]);
}
