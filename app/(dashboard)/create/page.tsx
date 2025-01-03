export default function Create() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background p-[20px]">
      <div className="w-full h-[7vw] rounded-[10px] mb-4 bg-gradient-to-r from-green-600 to-emerald-200">
        <div className="flex flex-col justify-end items-start h-full p-4">
          <h2 className="text-[2vw] leading-[0.85] font-semibold text-white">
            Nueva Cotización
          </h2>
          <p className="text-[0.8vw] leading-[1] ml-1 text-white mt-2 opacity-90">
            Crea una nueva cotización
          </p>
        </div>
      </div>
      <div className="flex gap-6 w-full h-full py-2 px-4 border-[2px] border-gray-100 rounded-[10px] justify-center items-center"></div>
    </div>
  );
}
