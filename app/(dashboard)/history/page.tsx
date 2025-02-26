"use client";

import { Search } from "react-feather";
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
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start w-[12vw]">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black">
              Cotizaciones
            </h2>
          </div>
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-[22vw]">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              />
              <input
                className="w-full h-[2.25vw] rounded-full pl-10 pr-4 bg-white shadow-sm border border-neutral-200 text-sm focus:outline-none placeholder-secondary"
                placeholder="Buscar cotización"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-6 pb-6 pt-4">
        {unfinishedQuoations.length > 0 &&
          filteredUnfinishedQuotations.length > 0 && (
            <div className="w-full mb-4">
              <h3 className="text-lg font-[600]">Pendientes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start mt-2">
                {filteredUnfinishedQuotations.map((quotation) => (
                  <QuotationCard key={quotation.id} {...quotation} />
                ))}
              </div>
            </div>
          )}
        {finishedQuoations.length > 0 &&
          filteredFinishedQuotations.length > 0 && (
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
