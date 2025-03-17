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
  role: string;
  roleId: number;
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
    role: "",
    roleId: 0,
    name: "",
    lastname: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    role: "",
    name: "",
    lastname: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      role: "",
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

    if (!formData.roleId) {
      newErrors.role = "El rol es requerido";
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
      roleId: formData.roleId,
      name: formData.name,
      lastname: formData.lastname,
    };

    console.log(userData);

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

  const handleSelect = (field: keyof NewUserForm) => (item: DropdownItem) => {
    setFormData((prev) => ({
      ...prev,
      [field]: item.name,
      roleId: item.id,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
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
      <Dropdown
        value={formData.role}
        fetchItems={fetchRoles}
        onSelect={handleSelect("role")}
        label="Rol"
        error={errors.role}
      />
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
