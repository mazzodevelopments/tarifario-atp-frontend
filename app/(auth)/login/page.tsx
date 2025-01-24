"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import logo from "@/public/logo.png";
import { CircleUserRound, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="w-full bg-card rounded-xl shadow-lg overflow-hidden">
          {/* Header with Logo */}
          <div className="flex flex-col items-center pt-8 pb-6 px-4">
            <div className="w-32 h-32 relative mb-6">
              <Image
                src={logo.src || "/placeholder.svg"}
                width={1000}
                height={1000}
                alt="LOGO"
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">
              Iniciar sesión
            </h1>
          </div>

          {/* Form Section */}
          <div className="p-6 pt-2">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="relative">
                  <CircleUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    className="pl-10 w-full h-12 bg-muted/50"
                    required
                  />
                </div>

                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    className="pl-10 w-full h-12 bg-muted/50"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="flex justify-center items-center w-full h-12 text-lg bg-primary font-medium text-primary-foreground transition-colors duration-300"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
