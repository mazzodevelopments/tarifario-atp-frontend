import Image from "next/image";
import { UploadCloud } from "react-feather";
import defaultProfilePic from "@/public/default-profile-pic.png";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";

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
    <div className="w-full py-4 flex flex-col border-b-[0.5px] border-[#ebebebcc]">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative w-full pb-1 pr-1">
        <input
          type={type}
          value={value}
          className="w-full pr-1.5 pt-2.5 font-medium text-gray-600 text-sm outline-none"
          readOnly
        />
        <Button className="mt-2 text-xs rounded-xl">Editar</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-start w-full h-full bg-transparent px-[20px]">
      <Header title="Ajustes" description="Lista de proveedores oficiales" />
      <div className="flex flex-row w-[70%] h-auto justify-start items-start gap-2 bg-white rounded-[18px] px-2 pb-2 border-[0.5px] border-[#ebebebcc]">
        <div className="flex flex-col w-[90%] p-4">
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
            <div className="w-auto flex items-center justify-center gap-2">
              <Button className="">Eliminar</Button>
              <Button className="flex items-center text-xs rounded-xl">
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
