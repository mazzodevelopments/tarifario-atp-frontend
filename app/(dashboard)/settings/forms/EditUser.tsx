"use client";

import type React from "react";
import { useState, useCallback } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import Input from "@/components/Input";
import Button from "@/components/Button";
import type { AdminUpdateUser } from "@/types/User";
import { convertImageToBase64 } from "@/utils/convertImageToBase64";

interface EditUserProps {
  user: AdminUpdateUser;
  onUserUpdated: (user: AdminUpdateUser) => void;
  onDialogClose: () => void;
}

interface EditUserForm {
  name: string;
  lastname: string;
  email: string;
  profilePic: string | null;
  phone: string;
  birthDate: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
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
    profilePic: user.profilePic || null,
    phone: user.phone || "",
    birthDate: user.birthDate || "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.profilePic || null
  );
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(
    null
  );

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
      profilePic: formData.profilePic || undefined,
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setImageToCrop(base64String);
        setShowCropper(true);
        setErrors((prevErrors) => ({ ...prevErrors, profilePic: "" }));
      } catch (error) {
        console.error("Error al convertir la imagen:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          profilePic: "Error al procesar la imagen",
        }));
      }
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.crossOrigin = "anonymous";
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: CropArea
  ): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // As Base64 string
    return canvas.toDataURL("image/jpeg");
  };

  const handleCropConfirm = async () => {
    if (imageToCrop && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          imageToCrop,
          croppedAreaPixels
        );
        setFormData((prev) => ({ ...prev, profilePic: croppedImage }));
        setPreviewUrl(croppedImage);
        setShowCropper(false);
      } catch (e) {
        console.error("Error al recortar la imagen:", e);
      }
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageToCrop(null);
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

      <div>
        <label
          htmlFor="profilePic"
          className="block text-sm font-[600] text-gray-700"
        >
          Foto de perfil
        </label>
        <input
          type="file"
          name="profilePic"
          id="profilePic"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-primary/10 file:text-primary
            hover:file:bg-primary/20"
        />
        {errors.profilePic && (
          <p className="text-red-500 text-xs mt-1">{errors.profilePic}</p>
        )}

        {showCropper && imageToCrop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 w-full max-w-md">
              <h3 className="text-lg font-medium mb-2">Recortar imagen</h3>
              <div className="relative h-80 w-full mb-4">
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="flex items-center mb-4">
                <span className="mr-2 text-sm">Zoom:</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCropCancel}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  className="text-white"
                  onClick={handleCropConfirm}
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
        )}

        {previewUrl && !showCropper && (
          <div className="mt-2">
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Profile preview"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
        )}
      </div>

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
