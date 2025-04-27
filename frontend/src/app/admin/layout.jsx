"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check for admin token
    const adminToken = localStorage.getItem("admin");
    if (!adminToken) {
      toast.error("Please login as admin first");
      router.push("/admin-login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
