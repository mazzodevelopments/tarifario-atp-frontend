import Image from "next/image";
import { UploadCloud } from "react-feather";
import defaultProfilePic from "@/public/default-profile-pic.png";
import Button from "@/components/Button";

export default function Reports() {
  const inputFields = [
    { label: "Nombre", type: "text", value: "Matías Monzalvo" },
    {
      label: "Email",
      type: "email",
      value: "matiasmonzalvo@mazzodevelopments.com",
    },
    { label: "Teléfono", type: "tel", value: "+542944723412" },
    {
      label: "Dirección",
      type: "text",
      value: "Soldado de la Independencia 1468",
    },
  ];

  const EditableInput = ({
    label,
    type,
    value,
  }: {
    label: string;
    type: string;
    value: string;
  }) => (
    <div className="w-full mt-4 flex flex-col">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative w-full pb-1 pr-1 border-b-2 border-gray-100">
        <input
          type={type}
          value={value}
          className="w-full pr-1.5 pt-2.5 font-medium text-gray-600 text-sm outline-none"
          readOnly
        />
        <Button
          className="absolute right-0 top-0 text-xs rounded-xl px-3.5 py-2"
          variant="primary"
        >
          Editar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-start w-full h-full bg-background p-[20px]">
      <div className="w-full h-[7vw] rounded-[10px] mb-4 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="flex flex-col justify-end items-start h-full p-4">
          <h2 className="text-[2vw] leading-[0.85] font-semibold text-white">
            Ajustes
          </h2>
          <p className="text-[0.8vw] leading-[1] ml-1 text-white mt-2 opacity-90">
            Lista de proveedores oficiales
          </p>
        </div>
      </div>
      <div className="flex flex-row w-full h-auto justify-start items-start gap-2 bg-white rounded-[10px] px-2 pb-2 border-2 border-gray-100">
        <div className="flex flex-col w-[60%] p-4">
          <label className="text-md font-semibold text-gray-700 mb-2">
            Mi cuenta
          </label>
          <div className="flex w-full justify-between items-center pb-4 border-b-2 border-gray-100">
            <div className="flex gap-4 items-center">
              <Image
                className="w-20 h-20 rounded-[28px]"
                src={defaultProfilePic.src}
                alt="Settings"
                width={80}
                height={80}
              />
              <div className="flex flex-col w-[60%]">
                <h3 className="font-semibold text-sm text-gray-600">
                  Sube una foto de perfil
                </h3>
                <label className="font-medium text-sm text-gray-500">
                  Así tu equipo te reconocerá en cada etapa.
                </label>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                className="text-xs rounded-xl px-3.5 py-1.5"
              >
                Eliminar
              </Button>
              <Button className="flex items-center text-xs w-full rounded-xl px-3.5 py-1.5">
                <UploadCloud className="mr-2" size={20} />
                Nueva foto de perfil
              </Button>
            </div>
          </div>
          <div className="w-full">
            {inputFields.map((field, index) => (
              <EditableInput key={index} {...field} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
