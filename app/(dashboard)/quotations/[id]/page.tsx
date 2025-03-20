"use client";

import { useParams } from "next/navigation";
import Header from "@/app/(dashboard)/components/Header";
import QuotationDetails from "./QuotationDetails";

export default function QuotationView() {
  const { id } = useParams();

  const taskNumber = Array.isArray(id) ? id[0] : id;

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header title={`Cotización ${taskNumber}`} />
      <div className="p-6">
        {taskNumber ? (
          <QuotationDetails taskNumber={taskNumber} />
        ) : (
          <p>No se encontró la cotización</p>
        )}
      </div>
    </div>
  );
}
