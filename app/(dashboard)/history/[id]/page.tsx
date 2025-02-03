"use client";

import { useParams } from "next/navigation";
import Header from "@/app/(dashboard)/components/Header";
import QuotationDetails from "../QuotationDetails";
import { quotations } from "../page";

export default function QuotationView() {
  const { id } = useParams();

  const quotation = quotations.find((q) => q.taskNumber === id);

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header
        title={`Cotización ${id}`}
        description="Detalles de la cotización"
      />
      <div className="p-6">
        {quotation ? (
          <QuotationDetails quotation={quotation} />
        ) : (
          <p>No se encontró la cotización</p>
        )}
      </div>
    </div>
  );
}
