export default function Proveedores() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background p-[20px]">
      <div className="w-full h-[7vw] rounded-[10px] mb-4 bg-gradient-to-r from-red-500 to-orange-300">
        <div className="flex flex-col justify-end items-start h-full p-4">
          <h2 className="text-[2vw] leading-[0.85] font-semibold text-white">
            Proveedores
          </h2>
          <p className="text-[0.8vw] leading-[1] ml-1 text-white mt-2 opacity-90">
            Lista de proveedores oficiales
          </p>
        </div>
      </div>
    </div>
  );
}
