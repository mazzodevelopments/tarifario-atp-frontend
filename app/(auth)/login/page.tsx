"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Register() {
  return (
    <div className="w-[20%] h-[22.5vw] justify-center items-center flex">
      <Card className="w-full">
        <CardHeader className="justify-center flex items-center">
          <div className="w-32 h-32 p-4">
            <Image src={logo.src} width={1000} height={1000} alt="LOGO" />
          </div>

          <CardTitle className="text-3xl font-[800] text-neutral-700">
            Iniciar sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full text-white justify-center rounded-md text-lg"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
