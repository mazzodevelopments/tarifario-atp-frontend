"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { User } from "@/types/User";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface ManageUserProps {
  userToManage: User;
  onRolesChange: (userId: number, newRoleIds: number[]) => void;
  onUserDelete: (userId: number) => void;
}

export default function ManageUser({
  userToManage,
  onRolesChange,
  onUserDelete,
}: ManageUserProps) {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<DropdownItem[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const isCurrentUserSuperadmin = user?.roles.some(
    (r) => r.name === "Superadmin",
  );
  const isUserToManageSuperadmin = userToManage.roles.some(
    (r) => r.name === "Superadmin",
  );

  useEffect(() => {
    setSelectedRoles(
      userToManage.roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    );
  }, [userToManage.roles]);

  const handleRolesChange = async () => {
    try {
      onRolesChange(
        userToManage.id,
        selectedRoles.map((role) => role.id),
      );
      setIsRoleModalOpen(false);
      toast({
        title: "Roles actualizados",
        description:
          "Los roles del usuario han sido actualizados correctamente.",
      });
    } catch (error) {
      console.error("Error updating roles:", error);
      toast({
        title: "Error",
        description: "No se pudieron actualizar los roles del usuario.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await onUserDelete(userToManage.id);
      setIsDeleteModalOpen(false);
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado correctamente.",
      });
    } catch (error) {
      console.error("Error deleting userToManage:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario.",
        variant: "destructive",
      });
    }
  };

  const fetchRoles = async () => {
    const roles = await CatalogService.listRoles();
    return adaptToDropdown(
      roles.filter((r) => r.name !== "Superadmin"),
      "id",
      "name",
    );
  };

  const handleRoleSelect = (role: DropdownItem) => {
    setSelectedRoles((prev) => {
      const roleExists = prev.some((r) => r.id === role.id);
      if (roleExists) {
        return prev.filter((r) => r.id !== role.id);
      }
      return [...prev, role];
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setIsManageModalOpen(true)}>
        Gestionar
      </Button>

      {/* MODAL OPCIONES */}
      <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestionar usuario</DialogTitle>
          </DialogHeader>
          <div className="flex w-full items-center gap-4">
            <Image
              src={userToManage?.profilePic || "/default-profile-pic.png"}
              width={700}
              height={700}
              alt="Picture of the author"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col w-full">
              <div className="flex w-full justify-between">
                <h2 className="text-2xl font-[600]">
                  {userToManage.name + " " + userToManage.lastname}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {userToManage.roles.map((role) => (
                    <div
                      key={role.id}
                      className={`px-2 rounded-3xl w-fit h-fit ${
                        role.name === "Superadmin"
                          ? "bg-red-100 text-red-500"
                          : role.name === "Admin"
                            ? "bg-blue-100 text-blue-500"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      <span className="text-sm font-semibold">{role.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-gray-600 -mt-1">{userToManage.email}</span>
            </div>
          </div>
          <div className="space-y-4 mt-2">
            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={() => {
                setIsManageModalOpen(false);
                setIsRoleModalOpen(true);
              }}
              disabled={
                (isCurrentUserSuperadmin && isUserToManageSuperadmin) ||
                (!user?.roles.some((r) => r.name === "Superadmin") &&
                  userToManage.roles.some(
                    (r) => r.name === "Superadmin" || r.name === "Admin",
                  ))
              }
            >
              Gestionar roles
            </Button>
            <Button
              className="w-full justify-center bg-red-100 text-red-500"
              onClick={() => {
                setIsManageModalOpen(false);
                setIsDeleteModalOpen(true);
              }}
              disabled={isCurrentUserSuperadmin && isUserToManageSuperadmin}
            >
              Eliminar usuario
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ROLES MANAGEMENT MODAL */}
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestionar roles del usuario</DialogTitle>
            <DialogDescription>
              {isCurrentUserSuperadmin && isUserToManageSuperadmin ? (
                <span className="text-red-500">
                  No puedes modificar los roles de otro Superadmin.
                </span>
              ) : (
                "Selecciona los roles que deseas asignar al usuario. Puedes seleccionar múltiples roles."
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Dropdown
              value={
                selectedRoles.map((role) => role.name).join(", ") ||
                "Seleccionar roles"
              }
              fetchItems={fetchRoles}
              onSelect={handleRoleSelect}
              label="Seleccionar roles"
              multiple
              selectedItems={selectedRoles}
              disabled={isCurrentUserSuperadmin && isUserToManageSuperadmin}
            />
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsRoleModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="text-white"
              onClick={handleRolesChange}
              disabled={
                selectedRoles.length === 0 ||
                (isCurrentUserSuperadmin && isUserToManageSuperadmin)
              }
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">
              Confirmar eliminación
            </DialogTitle>
            <DialogDescription className="text-center">
              {isCurrentUserSuperadmin && isUserToManageSuperadmin ? (
                <span className="text-red-500">
                  No puedes eliminar a otro Superadmin.
                </span>
              ) : (
                <>
                  ¿Estás seguro de eliminar el usuario{" "}
                  <span className="font-medium">
                    {userToManage.name} {userToManage.lastname}
                  </span>
                  ?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-center gap-2 sm:gap-0 mt-2">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleDeleteUser}
              className="flex-1 sm:flex-none bg-red-100 text-red-500"
              disabled={isCurrentUserSuperadmin && isUserToManageSuperadmin}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
