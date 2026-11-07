import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/integrations/next-js";

// better-auth-এর সব endpoint (/api/auth/*) এই catch-all route দিয়ে চলে।
const handlers = toNextJsHandler(auth);

export const { GET, POST, PATCH, PUT, DELETE } = handlers;
