import type { Metadata } from "next";
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function DashbaordPage() {
  return <Dashboard />
}
