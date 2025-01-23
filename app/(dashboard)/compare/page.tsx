import Header from "@/app/(dashboard)/components/Header";

export default function Proveedores() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header
        title="Comparar"
        description="Sección para comparar cotizaciones"
      />
      <div className="flex w-full h-full p-6">
        <div className="flex flex-col gap-6 w-full h-full p-[20px] border border-neutral-200 shadow-sm bg-white rounded-[18px] relative"></div>
      </div>
    </div>
  );
}
