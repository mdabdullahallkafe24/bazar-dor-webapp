
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getProfileForUser } from "@/lib/profiles";

export async function GET() {
  // Keep headers() outside try/catch.
  // Next.js needs to detect request-time rendering.
  const requestHeaders = await headers();

  let user;

  try {
    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    user = session?.user ?? null;
  } catch (error) {
    console.error(
      "[api/profile] session lookup failed:",
      error?.message ?? error
    );

    return Response.json(
      {
        error: "সেশন যাচাই করা যায়নি। আবার চেষ্টা করুন।",
      },
      { status: 500 }
    );
  }

  if (!user) {
    return Response.json(
      {
        error: "প্রোফাইল দেখতে আগে সাইন ইন করুন।",
      },
      { status: 401 }
    );
  }

  try {
    const profile = await getProfileForUser(user);

    if (!profile) {
      return Response.json(
        {
          error: "প্রোফাইল তৈরি করা যায়নি। আবার চেষ্টা করুন।",
        },
        { status: 500 }
      );
    }

    return Response.json({ profile });
  } catch (error) {
    console.error(
      "[api/profile] load failed:",
      error?.message ?? error
    );

    return Response.json(
      {
        error: "প্রোফাইল লোড করা যায়নি। আবার চেষ্টা করুন।",
      },
      { status: 500 }
    );
  }
}

