"use client";

import { Search } from "react-feather";
import Header from "@/app/(dashboard)/components/Header";
import QuotationCard from "./QuotationCard";
import { useState } from "react";
import { quotations } from "@/app/(dashboard)/history/testData";

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuotations = quotations.filter((quotation) =>
    quotation.taskNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex justify-start w-full h-full flex-col bg-neutral-50">
      <div className="w-full h-auto  rounded-[18px] mb-2 flex-shrink-0">
        <Header
          title="Cotizaciones"
          description="Historial de cotizaciones realizadas"
        />
      </div>
      <div className="w-full px-6 pb-6">
        <div className="flex mb-2 items-center ">
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-[12vw]">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                className="w-full h-10 rounded-[18px] pl-10 pr-4 bg-white shadow-sm border border-neutral-200  text-md focus:outline-none"
                placeholder="Buscar cotización"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start mt-2">
            {filteredQuotations.map((quotation) => (
              <QuotationCard
                key={quotation.customerRequestNumber}
                {...quotation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
