"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud } from "react-feather";
import defaultProfilePic from "@/public/default-profile-pic.png";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";

export default function Settings() {
  const [editingField, setEditingField] = useState<string | null>(null);

  const [userData, setUserData] = useState({
    Nombre: "Matías Monzalvo",
    Email: "matiasmonzalvo@mazzodevelopments.com",
    Teléfono: "+542944723412",
    Dirección: "Soldado de la Independencia 1468",
  });

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSave = (field: string) => {
    setEditingField(null);
  };

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const EditableField = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div className="w-full py-4 flex flex-col justify-between h-full">
      <label className="text-sm font-[800] text-gray-700">{label}</label>
      <div className="relative w-full pb-1 pr-1">
        {editingField === label ? (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(label, e.target.value)}
            className="w-full pr-1.5 pt-2.5 font-[600] text-gray-600 text-sm outline-none border-b border-gray-300"
            autoFocus
          />
        ) : (
          <p className="w-full pr-1.5 pt-2.5 font-[600] text-gray-600 text-sm">
            {value}
          </p>
        )}
        <Button
          className="mt-2 text-xs rounded-xl text-white"
          onClick={() =>
            editingField === label ? handleSave(label) : handleEdit(label)
          }
        >
          {editingField === label ? "Guardar" : "Editar"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-start w-full h-full bg-neutral-50">
      <Header title="Ajustes" description="Configuración de la cuenta" />
      <div className="p-6 h-full">
        <div className="flex flex-row w-[70%] h-full justify-start items-start gap-2 bg-white rounded-[18px] p-2 border border-neutral-200 shadow-sm">
          <div className="flex flex-col w-[90%] p-4">
            <label className="text-xl font-[800] text-gray-700 mb-4">
              Mi cuenta
            </label>
            <div className="flex w-full justify-between items-center pb-4 border-b border-neutral-200">
              <div className="flex gap-4 items-center">
                <Image
                  className="w-20 h-20 rounded-[28px]"
                  src={defaultProfilePic.src || "/placeholder.svg"}
                  alt="Settings"
                  width={80}
                  height={80}
                />
                <div className="flex flex-col w-[60%]">
                  <h3 className="font-[800] text-sm text-gray-600">
                    Sube una foto de perfil
                  </h3>
                  <label className="font-[600] text-sm text-gray-500">
                    Así tu equipo te reconocerá en cada etapa.
                  </label>
                </div>
              </div>
              <div className="w-auto flex items-center justify-center gap-2">
                <Button variant="secondary">Eliminar</Button>
                <button
                  className="relative flex flex-row overflow-hidden px-3 py-2 rounded-[12px] font-[600] cursor-pointer
    transition-all duration-300 ease-out text-sm
    transform hover:scale-95 bg-neutral-900 text-white
      before:absolute before:top-0 before:left-0 before:w-full before:h-full
      before:bg-white before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-20"
                >
                  <UploadCloud className="mr-2" size={20} />
                  Nueva foto de perfil
                </button>
              </div>
            </div>
            <div className="w-full h-full">
              {Object.entries(userData).map(([label, value]) => (
                <EditableField key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
