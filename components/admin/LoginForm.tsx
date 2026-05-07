"use client";

import React, { useState } from "react";
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Entropy } from "@/components/ui/entropy";
import { TextScramble } from "@/components/ui/text-scramble";

export default function LoginForm() {
  const { user, loading, isAuthorized } = useAuth();
  const [error, setError] = useState("");

  React.useEffect(() => {
    getRedirectResult(auth).catch(() => setError("Sign-in failed. Try again."));
  }, []);

  async function handleGoogleLogin() {
    setError("");
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  }

  async function handleLogout() {
    await signOut(auth);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
      </div>
    );
  }

  if (user && !isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 text-white px-4">
        <p className="font-mono text-red-400 text-sm uppercase tracking-widest">
          Access Denied — {user.email} is not authorised.
        </p>
        <button
          onClick={handleLogout}
          className="text-xs text-neutral-500 underline hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ mixBlendMode: "screen" }}
        >
          <div style={{ transform: "translate(-50%,-50%) scale(1.5)", position: "absolute", top: "50%", left: "50%" }}>
            <Entropy size={600} withBackground={false} className="opacity-20" />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-10 text-center">
            <TextScramble
              text="ADMIN ACCESS"
              textClassName="text-3xl font-black font-heading tracking-widest"
            />
            <p className="text-neutral-500 font-mono text-xs mt-3 uppercase tracking-widest">
              Authorised personnel only
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 flex flex-col gap-5 backdrop-blur-sm">
            {error && (
              <p className="text-red-400 text-xs font-mono text-center">{error}</p>
            )}

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-full border border-white/20 text-white text-sm font-mono tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
