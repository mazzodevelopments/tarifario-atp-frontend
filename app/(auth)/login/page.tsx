"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import logo from "@/public/logo.png";
import { CircleUserRound, KeyRound } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Logo Side */}
      <div className="hidden lg:flex w-1/2 bg-neutral-50 flex-col items-center justify-center p-12">
        <div className="w-64 h-64 relative mb-8">
          <Image
            src={logo.src}
            width={1000}
            height={1000}
            alt="LOGO"
            className="object-contain"
          />
        </div>
        <h2 className="text-4xl font-extrabold text-primary text-center">
          ATP
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-center max-w-md">
          Tarifario Web
        </p>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background shadow-sm">
        <div className="w-full max-w-md">
          {/* Mobile Logo - Only shown on small screens */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-32 h-32 relative mb-4">
              <Image
                src={logo.src}
                width={1000}
                height={1000}
                alt="LOGO"
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-extrabold text-primary">
                Iniciar sesión
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="relative">
                  <CircleUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="Email"
                    className="pl-10 w-full h-12 bg-muted/50"
                    required
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
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
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="flex justify-center items-center w-full h-12 text-[0.85vw] font-medium bg-primary text-white"
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
