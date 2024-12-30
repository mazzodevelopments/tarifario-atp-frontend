import Image from "next/image";
import { UploadCloud } from "react-feather";

export default function Reports() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background py-8 px-6">
      <div className="flex mb-4 items-center text-neutral-900">
        <h2 className="font-semibold text-3xl mt-[1px] ml-2">Ajustes</h2>
      </div>
      <div className="flex justify-start items-start w-full h-full flex-row gap-2 bg-white rounded-[40px] px-2 py-2">
        <div className="border-2 border-neutral-100 w-[35%] p-6 rounded-2xl">
          <h3 className="text-lg mb-2">Foto de perfil</h3>
          <div className="flex justify-start items-center flex-row">
            <Image
              className="w-24 h-24 rounded-[28px]"
              src="/DEFAULT_PROFILE_PIC.png"
              alt="Settings"
              width={200}
              height={200}
            />
            <button className="bg-blue-500 text-white ml-4 rounded-3xl px-4 py-2 flex items-center">
              <UploadCloud className="mr-2" size={20} />
              Nueva foto de perfil
            </button>
            <button className="bg-neutral-100 text-neutral-900 ml-2 rounded-3xl px-4 py-2">
              Eliminar
            </button>
          </div>
        </div>

        <div className="border-2 border-neutral-100 w-[35%] p-6 rounded-2xl flex flex-col">
          <label className="text-lg mb-2">Nombre</label>
          <input type="text" className="input" placeholder="Nombre" />
          <label className="text-lg mb-2">Email</label>
          <input type="text" className="input" placeholder="Email" />
        </div>
        <div className="border-2 border-neutral-100 w-[30%] p-6 rounded-2xl flex flex-row items-center justify-center ">
          <h3 className="text-[2vw] font-bold text-primary leading-[1]">atp</h3>
          <h3 className="text-[2vw] font-semibold uppercase leading-[1] text-gray-900">
            solutions
          </h3>
        </div>
      </div>
    </div>
  );
}
