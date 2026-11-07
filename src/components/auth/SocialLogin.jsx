"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

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
        window.alert(
          result.error.message || `${provider} দিয়ে লগইন করা যায়নি।`
        );
        setLoadingProvider("");
      }
    } catch (error) {
      window.alert(error?.message || "সোশ্যাল লগইনে সমস্যা হয়েছে।");
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