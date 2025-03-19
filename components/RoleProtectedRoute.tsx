"use client";

import type React from "react";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}: RoleProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      const hasRequiredRole = user && allowedRoles.includes(user.role.name);
      setAuthorized(hasRequiredRole || false);
    }
  }, [user, loading, allowedRoles]);

  if (loading) {
    return null;
  }

  if (authorized === false) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] w-full">
        <div className="max-w-md text-center p-8 rounded-lg border border-neutral-200 bg-white shadow-sm">
          <h2 className="text-xl font-bold text-red-500 mb-4">
            Acceso Restringido
          </h2>
          <p className="text-gray-600 mb-6">
            No estás autorizado a ingresar a esta ruta. Esta sección está
            reservada para usuarios con roles específicos.
          </p>
          <Button
            variant="primary"
            onClick={() => router.back()}
            className="mx-auto"
          >
            Regresar a la página anterior
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
