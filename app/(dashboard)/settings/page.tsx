import Image from "next/image";
import { UploadCloud } from "react-feather";
import defaultProfilePic from "@/public/default-profile-pic.png";
import Button from "@/components/Button";

export default function Reports() {
  return (
    <div className="flex flex-col justify-start w-full h-full bg-background py-8 px-6">
      <div className="flex mb-4 items-center">
        <h2 className="text-3xl font-semibold text-gray mt-[1px] ml-2">
          Ajustes
        </h2>
      </div>
      <div className="flex flex-row w-full h-full justify-start items-start gap-2 bg-white rounded-[40px] px-2 pb-2 border-2 border-gray-100">
        <div className="flex flex-col w-full p-4">
          <label className="text-md font-semibold text-gray-700 mb-2">
            Foto de perfil
          </label>
          <div className="flex justify-start items-center">
            <Image
              className="w-24 h-24 rounded-[28px]"
              src={defaultProfilePic.src}
              alt="Settings"
              width={200}
              height={200}
            />
            <div className="flex flex-col gap-2 ml-4">
              <Button className="flex items-center text-xs w-full rounded-xl px-3.5 py-2">
                <UploadCloud className="mr-2" size={20} />
                Nueva foto de perfil
              </Button>
              <Button
                variant="outline"
                className="text-xs rounded-xl px-3.5 py-2"
              >
                Eliminar
              </Button>
            </div>
          </div>
          <div className="w-full mt-6 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Nombre
            </label>
            <div className="relative w-full p-1 rounded-xl border-2 border-gray-100">
              <input
                type="name"
                value="Matías Monzalvo"
                className="w-full p-1.5 font-medium text-gray-600 text-sm outline-none"
                readOnly
              />
              <Button
                className="absolute right-0 top-0 bottom-0 text-xs rounded-l-none rounded-xl px-2"
                variant="primary"
              >
                Modificar
              </Button>
            </div>
          </div>
          <div className="w-full mt-4 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative w-full p-1 rounded-xl border-2 border-gray-100">
              <input
                type="email"
                value="matiasmonzalvo@mazzodevelopments.com"
                className="w-full p-1.5 font-medium text-gray-600 text-sm outline-none"
                readOnly
              />
              <Button
                className="absolute right-0 top-0 bottom-0 text-xs rounded-l-none rounded-xl px-2"
                variant="primary"
              >
                Modificar
              </Button>
            </div>
          </div>
          <div className="w-full mt-4 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Teléfono
            </label>
            <div className="relative w-full p-1 rounded-xl border-2 border-gray-100">
              <input
                type="phone"
                value="+542944723412"
                className="w-full p-1.5 font-medium text-gray-600 text-sm outline-none"
                readOnly
              />
              <Button
                className="absolute right-0 top-0 bottom-0 text-xs rounded-l-none rounded-xl px-2"
                variant="primary"
              >
                Modificar
              </Button>
            </div>
          </div>
          <div className="w-full mt-4 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Dirección
            </label>
            <div className="relative w-full p-1 rounded-xl border-2 border-gray-100">
              <input
                type="address"
                value="Soldado de la Independencia 1468"
                className="w-full p-1.5 font-medium text-gray-600 text-sm outline-none"
                readOnly
              />
              <Button
                className="absolute right-0 top-0 bottom-0 text-xs rounded-l-none rounded-xl px-2"
                variant="primary"
              >
                Modificar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
