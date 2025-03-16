"use client";

import type React from "react";
import { useState, useCallback } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { AdminService } from "@/services/AdminService";
import { useAuth } from "@/context/AuthContext";
import type { AdminUpdateUser } from "@/types/User";
import { convertImageToBase64 } from "@/utils/convertImageToBase64";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function FirstLoginForm() {
  const [formData, setFormData] = useState({
    phone: "",
    birthDate: new Date().toISOString().split("T")[0],
    password: "",
    confirmPassword: "",
    profilePic: null as string | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(
    null
  );

  const [errors, setErrors] = useState({
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const { user, login } = useAuth();

  const validateForm = () => {
    const newErrors = {
      phone: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      profilePic: "",
    };
    let isValid = true;

    if (!formData.phone) {
      newErrors.phone = "El teléfono es requerido";
      isValid = false;
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es requerida";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmar la contraseña es requerido";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    if (!formData.profilePic) {
      newErrors.profilePic = "La imagen de perfil es requerida";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    // Set canvas size to the cropped size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image onto the canvas
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userToUpdate: AdminUpdateUser = {
      id: user!.id,
      phone: formData.phone,
      birthDate: formData.birthDate,
      password: formData.password,
      profilePic: formData.profilePic || undefined,
    };

    if (user) {
      await AdminService.updateUser(user.id, userToUpdate);
      login(user.email, formData.password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Teléfono"
        type="phone"
        name="phone"
        placeholder="Teléfono"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
      />
      <Input
        label="Fecha de Nacimiento"
        type="date"
        name="birthDate"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={formData.birthDate}
        onChange={handleInputChange}
        error={errors.birthDate}
      />
      <Input
        label="Contraseña"
        placeholder="Contraseña"
        type="password"
        name="password"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
      />
      <Input
        label="Confirmar Contraseña"
        placeholder="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
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

      <div>
        <Button
          type="submit"
          className="flex justify-center w-full px-4 items-center h-10 border bg-primary text-white"
        >
          Guardar perfil
        </Button>
      </div>
    </form>
  );
}
