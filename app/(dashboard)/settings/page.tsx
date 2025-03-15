"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/app/(dashboard)/components/Header";
import { useAuth } from "@/context/AuthContext";
import { AdminService } from "@/services/AdminService";
import EditUser from "@/app/(dashboard)/settings/forms/EditUser";
import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminUpdateUser, User } from "@/types/User";

export default function Settings() {
  const [userData, setUserData] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const data = await AdminService.getUsersById(user!.id);
        setUserData(data);
      }
    };

    fetchUser();
  }, [user]);

  const handleUserUpdated = async (updatedUser: AdminUpdateUser) => {
    if (user) {
      await AdminService.updateUser(user.id, {
        ...updatedUser,
        id: user.id,
      });
      const data = await AdminService.getUsersById(user.id);
      setUserData(data);
      setIsDialogOpen(false);
    }
  };

  const userFields = [
    { label: "Nombre", value: userData?.name || "N/A" },
    { label: "Apellido", value: userData?.lastname || "N/A" },
    { label: "Correo electrónico", value: userData?.email || "N/A" },
    { label: "Teléfono", value: userData?.phone || "N/A" },
    { label: "Cumpleaños", value: userData?.birthDate || "N/A" },
    { label: "Rol", value: userData?.role.name || "N/A" },
  ];

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="w-full py-2 flex flex-col justify-between h-full">
      <label className="text-sm font-[800] text-gray-700">{label}</label>
      <div className="relative w-full pb-1 pr-1">
        <p className="w-full pr-1.5 mt-2 font-[600] text-gray-600 text-sm">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-start w-full h-full bg-neutral-50">
      <Header title="Ajustes" description="Configuración de la cuenta" />
      <div className="p-6 h-full">
        <div className="flex flex-row w-[70%] h-full justify-start items-start gap-2 bg-white rounded-[18px] p-2 border border-neutral-200 shadow-sm">
          <div className="flex flex-col w-[90%] p-4">
            <label className="text-xl font-[800] text-gray-700 mb-4">
              Mi cuenta
            </label>
            <div className="flex w-full justify-between items-center pb-4 border-b border-neutral-200">
              <div className="flex gap-4 items-center">
                <Image
                  className="w-20 h-20 rounded-full"
                  src={userData?.profilePic || "/default-profile-pic.png"}
                  alt="Settings"
                  width={80}
                  height={80}
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="primary" className="px-2 text-white">
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Editar Usuario
                      </DialogTitle>
                    </DialogHeader>
                    <div className="bg-white rounded-lg w-full">
                      <EditUser
                        user={{
                          name: userData?.name || "",
                          lastname: userData?.lastname || "",
                          email: userData?.email || "",
                          profilePic: userData?.profilePic || "",
                          phone: userData?.phone || "",
                          birthDate: userData?.birthDate || "",
                        }}
                        onUserUpdated={handleUserUpdated}
                        onDialogClose={() => setIsDialogOpen(false)}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="w-full h-full">
              {/* Mostrar todos los campos del usuario */}
              {userFields.map((field, index) => (
                <Field key={index} label={field.label} value={field.value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
