"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background gap-4">
      <h1 className="text-6xl font-[900]">404</h1>
      <p className="text-xl">La página no existe.</p>
      <Button
        onClick={() => router.push("/")}
        className="mt-2 p-2 bg-primary text-white"
      >
        Volver a inicio
      </Button>
    </div>
  );
}
