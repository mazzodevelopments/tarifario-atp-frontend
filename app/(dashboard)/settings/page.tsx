"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { AdminService } from "@/services/AdminService";
import EditUser from "@/app/(dashboard)/settings/forms/EditUser";
import type { AdminUpdateUser, User } from "@/types/User";
import { Search, Pencil } from "lucide-react";
import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  return (
    <div className="flex flex-col justify-start w-full h-full bg-neutral-50">
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black mt-1">
              Ajustes
            </h2>
          </div>
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-[22vw]">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              />
              <input
                className="w-full h-[2.25vw] rounded-full pl-10 pr-4 bg-white shadow-sm border border-neutral-200 text-sm focus:outline-none placeholder-secondary"
                placeholder="Buscar configuración"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {userData && (
              <div className="flex items-center gap-2">
                <Image
                  src={userData?.profilePic || "/default-profile-pic.png"}
                  width={32}
                  height={32}
                  alt="Profile picture"
                  className="rounded-full"
                />
                <span className="font-semibold text-sm">
                  {userData.name} {userData.lastname}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start w-full h-[calc(100%-5rem)]">
        <div className="w-full lg:w-2/3 h-full flex flex-col relative p-6">
          <div className="w-full flex flex-col pb-4">
            <h2 className="text-3xl font-[800]">Mi cuenta</h2>
            <p className="text-gray-500 ml-1">
              Información y configuración de la cuenta
            </p>
          </div>

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
