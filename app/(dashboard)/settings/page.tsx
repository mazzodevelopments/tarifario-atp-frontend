"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { AdminService } from "@/services/AdminService";
import EditUser from "@/app/(dashboard)/settings/forms/EditUser";
import type { AdminUpdateUser, User } from "@/types/User";
import { Pencil } from "lucide-react";
import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/app/(dashboard)/components/Header";
import PagesHeader from "../dashboardPages/pagesHeader";

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

  const handleUserUpdated = async (userToUpdate: AdminUpdateUser) => {
    if (user) {
      await AdminService.updateUser({
        ...userToUpdate,
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
  ];

  return (
    <div className="flex flex-col justify-start w-full h-full bg-neutral-50">
      <Header title="Ajustes" />

      <div className="flex flex-col lg:flex-row items-start w-full h-auto">
        <div className="w-full lg:w-2/3 h-full flex flex-col relative p-[1vw]">
          <PagesHeader
            title="Mi perfil"
            subtitle="Información y configuración de la cuenta"
          />

          <div className="flex flex-col relative py-4 bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-4">
                <Image
                  src={userData?.profilePic || "/default-profile-pic.png"}
                  width={64}
                  height={64}
                  alt="Profile picture"
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold">
                    {userData?.name} {userData?.lastname}
                  </h3>
                  <p className="text-sm text-gray-500">{userData?.email}</p>
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="primary"
                    className="px-3 py-2 bg-neutral-900 text-white text-sm"
                  >
                    <Pencil size={16} className="mr-2" />
                    Editar perfil
                  </Button>
                </DialogTrigger>
                <DialogContent>
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

            <ScrollArea className="px-6 py-4 h-[calc(100%-80px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {userFields.map((field, index) => (
                  <div key={index} className="w-full py-2 flex flex-col">
                    <label className="text-sm font-[800] text-gray-700">
                      {field.label}
                    </label>
                    <div className="relative w-full pb-1 pr-1 mt-1">
                      <p className="w-full pr-1.5 font-[600] text-gray-600">
                        {field.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
