"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { AdminUpdateUser } from "@/types/User";

interface EditUserProps {
  user: AdminUpdateUser;
  onUserUpdated: (user: AdminUpdateUser) => void;
  onDialogClose: () => void;
}

interface EditUserForm {
  name: string;
  lastname: string;
  email: string;
  profilePic: string;
  phone: string;
  birthDate: string;
}

export default function EditUser({
  user,
  onUserUpdated,
  onDialogClose,
}: EditUserProps) {
  const [formData, setFormData] = useState<EditUserForm>({
    name: user.name || "",
    lastname: user.lastname || "",
    email: user.email || "",
    profilePic: user.profilePic || "",
    phone: user.phone || "",
    birthDate: user.birthDate || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    profilePic: "",
    phone: "",
    birthDate: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      lastname: "",
      email: "",
      profilePic: "",
      phone: "",
      birthDate: "",
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "El apellido es requerido";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "El teléfono es requerido";
      isValid = false;
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es requerida";
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

    const userData: AdminUpdateUser = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      profilePic: formData.profilePic,
      phone: formData.phone,
      birthDate: formData.birthDate,
    };

    onUserUpdated(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

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
        type="text"
        id="profilePic"
        name="profilePic"
        value={formData.profilePic}
        onChange={handleChange}
        placeholder="URL de la foto de perfil"
        label="Foto de perfil"
        error={errors.profilePic}
      />
      <Input
        type="text"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Teléfono"
        label="Teléfono"
        error={errors.phone}
      />
      <Input
        type="date"
        id="birthDate"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        placeholder="Fecha de nacimiento"
        label="Fecha de nacimiento"
        error={errors.birthDate}
      />
      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="secondary" onClick={onDialogClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" className="text-white">
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}
