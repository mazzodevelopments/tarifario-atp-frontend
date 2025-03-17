"use client";
import { useAuth } from "@/context/AuthContext";
import UserPage from "@/app/(dashboard)/dashboardPages/UserPage";
import AdminPage from "@/app/(dashboard)/dashboardPages/AdminPage";

export default function Dashboard() {
  const { user } = useAuth();

  if (!["Superadmin", "Admin"].includes(user?.role.name as string)) {
    return <UserPage />;
  } else {
    return <AdminPage />;
  }
}
