"use client";

import { Search } from "react-feather";
import Header from "@/app/(dashboard)/components/Header";
import QuotationCard from "./QuotationCard";
import { useEffect, useState } from "react";
import { QuotationsService } from "@/services/QuotationsService";
import { HistoryQuotationCard } from "@/types/Quotations";

export default function History() {
  const [unfinishedQuoations, setUnfinishedQuoations] = useState<
    HistoryQuotationCard[]
  >([]);
  const [finishedQuoations, setFinishedQuoations] = useState<
    HistoryQuotationCard[]
  >([]);

  useEffect(() => {
    const fetchUnfinishedQuotations = async () => {
      try {
        const unfinishedQuotations =
          await QuotationsService.getUnfinishedQuotations();
        setUnfinishedQuoations(unfinishedQuotations);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    const fetchFinishedQuotations = async () => {
      try {
        const unfinishedQuotations =
          await QuotationsService.getFinishedQuotations();
        setFinishedQuoations(unfinishedQuotations);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    fetchUnfinishedQuotations();
    fetchFinishedQuotations();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUnfinishedQuotations = unfinishedQuoations.filter((quotation) =>
    quotation.taskNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredFinishedQuotations = finishedQuoations.filter((quotation) =>
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

        {unfinishedQuoations.length > 0 && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-[600]">Pendientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start mt-2">
              {filteredUnfinishedQuotations.map((quotation) => (
                <QuotationCard key={quotation.id} {...quotation} />
              ))}
            </div>
          </div>
        )}
        {finishedQuoations.length > 0 && (
          <div className="w-full">
            <h3 className="text-lg font-[600]">Completadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start mt-2">
              {filteredFinishedQuotations.map((quotation) => (
                <QuotationCard key={quotation.id} {...quotation} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
