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

interface ManageUserProps {
  user: User;
  onRoleChange: (userId: number, newRoleId: number) => void;
  onUserDelete: (userId: number) => void;
}

export default function ManageUser({
  user,
  onRoleChange,
  onUserDelete,
}: ManageUserProps) {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<DropdownItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {}, []);

  const handleRoleChange = async () => {
    if (selectedRole) {
      try {
        await onRoleChange(user.id, selectedRole.id);
        setIsRoleModalOpen(false);
        toast({
          title: "Rol actualizado",
          description: `El rol del usuario ha sido cambiado a ${selectedRole.name}.`,
        });
      } catch (error) {
        console.error("Error updating role:", error);
        toast({
          title: "Error",
          description: "No se pudo actualizar el rol del usuario.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      await onUserDelete(user.id);
      setIsDeleteModalOpen(false);
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

  const fetchRoles = async () => {
    const roles = await CatalogService.listRoles();
    return adaptToDropdown(
      roles.filter((r) => r.name !== "Superadmin"),
      "id",
      "name",
    );
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
          <div className="flex flex-col">
            <div className="flex w-full justify-between">
              <h2 className="text-2xl font-[600]">
                {user.name + " " + user.lastname}
              </h2>
              <div
                className={`mt-2 px-2 rounded-3xl w-fit ${
                  user.role.name === "Superadmin"
                    ? "bg-red-100 text-red-500"
                    : user.role.name === "Admin"
                      ? "bg-blue-100 text-blue-500"
                      : "bg-green-100 text-green-600"
                }`}
              >
                <span className="text-sm font-semibold">{user.role.name}</span>
              </div>
            </div>
            <span>{user.email}</span>
          </div>
          <div className="space-y-4 mt-2">
            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={() => {
                setIsManageModalOpen(false);
                setIsRoleModalOpen(true);
              }}
            >
              Cambiar rol
            </Button>
            <Button
              className="w-full justify-center bg-red-100 text-red-500"
              onClick={() => {
                setIsManageModalOpen(false);
                setIsDeleteModalOpen(true);
              }}
            >
              Eliminar usuario
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ROL CHANGE MODAL */}
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar rol del usuario</DialogTitle>
          </DialogHeader>
          <Dropdown
            value={selectedRole?.name || ""}
            fetchItems={fetchRoles}
            onSelect={(item) => setSelectedRole(item)}
            label="Seleccionar nuevo rol"
          />
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
              onClick={handleRoleChange}
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
              ¿Estás seguro de eliminar el usuario{" "}
              <span className="font-medium">
                {user.name} {user.lastname}
              </span>
              ?
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
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
