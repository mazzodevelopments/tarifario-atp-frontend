"use client";
import FirstLoginForm from "./FirstLoginForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FirstLoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.firstLogin !== true) {
      router.push("/");
    }
  });

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Completa tu perfil
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Completa tu información para que los demás usuarios te reconozcan en
          las distintas etapas de la cotización.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-neutral-200 shadow-sm sm:rounded-lg sm:px-10">
          <FirstLoginForm />
        </div>
      </div>
    </div>
  );
}
