"use client";
import { useAuth } from "@/context/AuthContext";
import UserPage from "@/app/(dashboard)/dashboardPages/UserPage";
import AdminPage from "@/app/(dashboard)/dashboardPages/AdminPage";

export default function Dashboard() {
  const { user } = useAuth();

  const userRoles = user?.roles?.map((role) => role.name) || [];

  const isAdmin = userRoles.some((role) =>
    ["Superadmin", "Admin"].includes(role),
  );

  return isAdmin ? <AdminPage /> : <UserPage />;
}
