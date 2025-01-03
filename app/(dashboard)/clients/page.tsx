export default function Proveedores() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background p-[20px]">
      <div className="w-full h-[7vw] rounded-[10px] mb-4 bg-gradient-to-r from-purple-600 to-purple-300">
        <div className="flex flex-col justify-end items-start h-full p-4">
          <h2 className="text-[2vw] leading-[0.85] font-semibold text-white">
            Clientes
          </h2>
          <p className="text-[0.8vw] leading-[1] ml-1 text-white mt-2 opacity-90">
            Lista de clientes
          </p>
        </div>
      </div>
    </div>
  );
}
