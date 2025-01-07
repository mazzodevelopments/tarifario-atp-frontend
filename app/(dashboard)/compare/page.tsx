import Header from "@/app/(dashboard)/components/Header";

export default function Proveedores() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background p-[20px]">
      <Header
        title="Comparar"
        description="Sección para comparar cotizaciones"
        className="bg-gradient-to-r from-red-500 to-orange-300"
      />
    </div>
  );
}
