import { Plus } from "react-feather";

export default function Create() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background p-[20px]">
      <div className="w-full h-full flex justify-center items-center rounded-[10px]  bg-secondary">
        <div className="flex flex-col justify-center w-full items-center h-full p-4">
          <div className="bg-slate-800 rounded-full p-6">
            <Plus size={48} className="text-white " />
          </div>
          <h2 className="text-[2vw] leading-[0.85] font-semibold text-white">
            Crear cotización
          </h2>
          <p className="text-[0.8vw] leading-[1] ml-1 text-white mt-2 opacity-90">
            Lista de proveedores oficiales
          </p>
        </div>
      </div>
    </div>
  );
}
