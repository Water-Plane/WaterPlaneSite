"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Entropy } from "@/components/ui/entropy";
import { TextScramble } from "@/components/ui/text-scramble";

export default function LoginForm() {
  const { user, loading, isAuthorized } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid credentials. Access denied.");
    } finally {
      setSubmitting(false);
    }
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

          <form
            onSubmit={handleLogin}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 flex flex-col gap-5 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="admin@waterplane.in"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-mono">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 rounded-full border border-white/20 text-white text-sm font-mono tracking-widest uppercase hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {submitting ? "Verifying..." : "Enter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
}
