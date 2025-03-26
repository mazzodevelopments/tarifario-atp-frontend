"use client";

import React, { useState, useCallback } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import { AdminCreateUser } from "@/types/User";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";

interface CreateUserProps {
  onUserCreated: (user: AdminCreateUser) => void;
  onDialogClose: () => void;
}

interface NewUserForm {
  email: string;
  password: string;
  roles: DropdownItem[];
  roleIds: number[];
  name: string;
  lastname: string;
}

export default function CreateUser({
  onUserCreated,
  onDialogClose,
}: CreateUserProps) {
  const [formData, setFormData] = useState<NewUserForm>({
    email: "",
    password: "",
    roles: [],
    roleIds: [],
    name: "",
    lastname: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    roles: "",
    name: "",
    lastname: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      roles: "",
      name: "",
      lastname: "",
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    }

    if (formData.roleIds.length === 0) {
      newErrors.roles = "Debe seleccionar al menos un rol";
      isValid = false;
    }

    if (!formData.name) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "El apellido es requerido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    const userData: AdminCreateUser = {
      password: formData.password,
      email: formData.email,
      roleIds: formData.roleIds,
      name: formData.name,
      lastname: formData.lastname,
    };

    onUserCreated(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleRoleSelect = (item: DropdownItem) => {
    setFormData((prev) => {
      const roleExists = prev.roles.some((role) => role.id === item.id);

      const newRoles = roleExists
        ? prev.roles.filter((role) => role.id !== item.id)
        : [...prev.roles, item];

      const newRoleIds = newRoles.map((role) => role.id);

      return {
        ...prev,
        roles: newRoles,
        roleIds: newRoleIds,
      };
    });
    setErrors((prevErrors) => ({ ...prevErrors, roles: "" }));
  };

  const fetchRoles = useCallback(async () => {
    const roles = await CatalogService.listRoles();
    return adaptToDropdown(
      roles.filter((r) => r.name !== "Superadmin"),
      "id",
      "name",
    );
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          label="Nombre"
          error={errors.name}
        />
        <Input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Apellido"
          label="Apellido"
          error={errors.lastname}
        />
      </div>
      <Input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        label="Email"
        error={errors.email}
      />
      <Input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña"
        label="Contraseña"
        error={errors.password}
      />
      <div className="space-y-2">
        <Dropdown
          value={formData.roles.map((role) => role.name).join(", ") || ""}
          fetchItems={fetchRoles}
          onSelect={handleRoleSelect}
          label="Roles"
          error={errors.roles}
          multiple
          selectedItems={formData.roles}
        />
        <div className="flex flex-wrap gap-2">
          {formData.roles.map((role) => (
            <div
              key={role.id}
              className="px-2 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-2"
            >
              <span>{role.name}</span>
              <button
                type="button"
                onClick={() => handleRoleSelect(role)}
                className="hover:text-destructive"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="secondary" onClick={onDialogClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" className="text-white">
          Guardar usuario
        </Button>
      </div>
    </form>
  );
}
