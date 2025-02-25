"use client";

import { useParams } from "next/navigation";
import Header from "@/app/(dashboard)/components/Header";
import QuotationDetails from "./QuotationDetails";

export default function QuotationView() {
  const { id } = useParams();

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header
        title={`Cotización ${id}`}
        description="Detalles de la cotización"
      />
      <div className="p-6">
        {id ? (
          <QuotationDetails quotationId={Number(id)} />
        ) : (
          <p>No se encontró la cotización</p>
        )}
      </div>
    </div>
  );
}
