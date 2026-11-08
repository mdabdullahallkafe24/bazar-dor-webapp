import { auth } from "@/lib/auth";
import { mongoReady } from "@/lib/mongodb";
import { toNextJsHandler } from "better-auth/next-js";

// better-auth-এর সব endpoint (/api/auth/*) এই catch-all route দিয়ে চলে।
const handlers = toNextJsHandler(auth);

// DNS প্রিমিং ও index তৈরি শেষ না হওয়া পর্যন্ত অপেক্ষা করে — তারপর mongodb+srv
// রেজল্শন নিরাপদে চলায় এবং প্রথম রিকোয়েস্টেই ডিএনএস এরর আসে না।
async function withMongo(handler, request) {
  if (!handler) {
    return new Response("Method not allowed", { status: 405 });
  }
  await mongoReady;
  return handler(request);
}

export const GET = (request) => withMongo(handlers.GET, request);
export const POST = (request) => withMongo(handlers.POST, request);
export const PATCH = (request) => withMongo(handlers.PATCH, request);
export const PUT = (request) => withMongo(handlers.PUT, request);
export const DELETE = (request) => withMongo(handlers.DELETE, request);
