"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/admin/LoginForm";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const { user, loading, isAuthorized } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
