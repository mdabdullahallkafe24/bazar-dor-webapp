"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient, friendlyAuthError } from "@/lib/auth-client";

const PROVIDER_LABELS = {
  google: "Google",
  github: "GitHub",
};

export default function SocialLogin() {
  const [loadingProvider, setLoadingProvider] = useState("");

  async function handleSocialLogin(provider) {
    setLoadingProvider(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result?.error) {
        // সফল হলে ব্রাউজার নিজেই প্রোভাইডারের পেজে রিডাইরেক্ট হবে,
        // তাই এখানে শুধু এরর দেখানো হয়।
        toast.error(
          friendlyAuthError(result.error.message) ||
            `${PROVIDER_LABELS[provider]} দিয়ে লগইন করা যায়নি।`
        );
        setLoadingProvider("");
      }
    } catch (error) {
      toast.error(
        friendlyAuthError(error?.message) || "সোশ্যাল লগইনে সমস্যা হয়েছে।"
      );
      setLoadingProvider("");
    }
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="btn btn-outline w-full"
        disabled={Boolean(loadingProvider)}
      >
        {loadingProvider === "google" ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <span className="font-bold text-base">G</span>
        )}
        Google দিয়ে চালিয়ে যান
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        className="btn btn-outline w-full"
        disabled={Boolean(loadingProvider)}
      >
        {loadingProvider === "github" ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <span className="font-bold text-base">GH</span>
        )}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
