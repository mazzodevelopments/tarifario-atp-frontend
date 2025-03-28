"use client";

import { useEffect, useState } from "react";
import { AdminService } from "@/services/AdminService";
import type { User, AdminCreateUser } from "@/types/User";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "react-feather";
import Image from "next/image";
import Button from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateUser from "../components/CreateUser";
import ManageUser from "../components/ManageUser";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await AdminService.getAllUsers();
        const sortedUsers = [...data].sort((a, b) => {
          const hasSuperadmin = (user: User) =>
            user.roles.some((role) => role.name === "Superadmin");
          const hasAdmin = (user: User) =>
            user.roles.some((role) => role.name === "Admin");

          if (hasSuperadmin(a) && !hasSuperadmin(b)) return -1;
          if (!hasSuperadmin(a) && hasSuperadmin(b)) return 1;
          if (hasAdmin(a) && !hasAdmin(b)) return -1;
          if (!hasAdmin(a) && hasAdmin(b)) return 1;
          return 0;
        });

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
    setShouldFetch(false);
  }, [shouldFetch]);

  const filteredUsers = users
    .filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) => {
      if (sortBy === "all") return true;
      return user.roles.some((role) => role.name === sortBy);
    });

  const handleUserCreated = async (newUser: AdminCreateUser) => {
    try {
      await AdminService.createUser(newUser);
      setIsDialogOpen(false);
      setShouldFetch(true);
      toast({
        title: "Usuario creado",
        description: `Se ha creado el usuario ${
          newUser.name + " " + newUser.lastname
        } con éxito.`,
      });
    } catch (error) {
      console.error("Error adding item:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error al crear el usuario",
        variant: "destructive",
      });
    }
  };

  const handleRolesChange = async (userId: number, newRoleIds: number[]) => {
    try {
      await AdminService.updateUser({ id: userId, roleIds: newRoleIds });
      setShouldFetch(true);
      toast({
        title: "Roles actualizados",
        description:
          "Los roles del usuario han sido actualizados correctamente.",
      });
    } catch (error) {
      console.error("Error updating user roles:", error);
      toast({
        title: "Error",
        description: "No se pudieron actualizar los roles del usuario.",
        variant: "destructive",
      });
    }
  };

  const handleUserDelete = async (userId: number) => {
    try {
      await AdminService.deleteUser(userId);
      setShouldFetch(true);
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado correctamente.",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario.",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const roleOrder = ["Superadmin", "Admin", "Compras", "Logística", "Ventas"];

  const getRoleColor = (roleName: string) => {
    switch (roleName) {
      case "Superadmin":
        return "bg-red-100 text-red-500";
      case "Admin":
        return "bg-blue-100 text-blue-500";
      default:
        return "bg-green-100 text-green-600";
    }
  };

  return (
    <div className="flex flex-col relative bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full flex-grow overflow-hidden">
      <div className="relative flex items-center justify-between p-[1vw] ">
        <div className="relative">
          <input
            className="w-60 h-9 rounded-3xl bg-gray-50 border border-neutral-200 px-8 mt-[0.4px] text-md focus:ring-0 focus:outline-none"
            placeholder="Buscar usuario"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            size={18}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 z-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">Ordenar por:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="h-9 px-3 bg-gray-50 border-neutral-200 focus:ring-none"
              >
                {sortBy === "all"
                  ? "Todos"
                  : sortBy === "Superadmin"
                  ? "Superadmin"
                  : sortBy === "Admin"
                  ? "Admin"
                  : sortBy === "Compras"
                  ? "Compras"
                  : sortBy === "Ventas"
                  ? "Ventas"
                  : sortBy === "Logística"
                  ? "Logística"
                  : "Todos"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="shadow-sm">
              <DropdownMenuItem
                onClick={() => setSortBy("all")}
                className="cursor-pointer"
              >
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("Superadmin")}
                className="cursor-pointer"
              >
                Superadmin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("Admin")}
                className="cursor-pointer"
              >
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("Compras")}
                className="cursor-pointer"
              >
                Compras
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("Ventas")}
                className="cursor-pointer"
              >
                Ventas
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("Logística")}
                className="cursor-pointer"
              >
                Logística
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-grow overflow-hidden relative">
        <ScrollArea className="border-neutral-100 border-t h-full max-h-[calc(100vh-5vh)] px-[1vw]">
          <div className="space-y-4 mt-4">
            {filteredUsers.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-neutral-500 text-sm">
                  No hay usuarios con el rol de{" "}
                  {sortBy === "all" ? "seleccionado" : sortBy}.
                </p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center justify-start">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={user.profilePic || "/default-profile-pic.png"}
                        width={700}
                        height={700}
                        alt="Picture of the author"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col items-start justify-start min-w-64">
                        <h3 className="text-sm font-semibold">
                          {user.name + " " + user.lastname}
                        </h3>
                        <p className="text-xs font-semibold opacity-50 -mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {user.roles
                        .sort(
                          (a, b) =>
                            roleOrder.indexOf(a.name) -
                            roleOrder.indexOf(b.name)
                        )
                        .map((role) => (
                          <div
                            key={role.id}
                            className={`px-2 py-0.5 rounded-3xl ${getRoleColor(
                              role.name
                            )}`}
                          >
                            <span className="text-sm font-semibold">
                              {role.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => {
                        router.push(`/user-history/${user.id}`);
                      }}
                      variant="secondary"
                    >
                      Ver cotizaciones
                    </Button>
                    <ManageUser
                      userToManage={user}
                      onRolesChange={handleRolesChange}
                      onUserDelete={handleUserDelete}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="w-auto flex pr-2 justify-end gap-2 items-end relative h-auto py-4 border-t border-neutral-100 flex-shrink-0">
        <Button
          variant="primary"
          className="px-3 py-2 bg-neutral-900 text-white text-sm mr-2"
          onClick={() => setIsDialogOpen(true)}
        >
          Crear Usuario
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Agregar nuevo usuario
              </DialogTitle>
            </DialogHeader>
            <div className="bg-white rounded-lg w-full">
              <CreateUser
                onUserCreated={handleUserCreated}
                onDialogClose={handleDialogClose}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </div>
  );
}
