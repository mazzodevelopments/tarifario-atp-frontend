"use client";

import { useEffect, useState } from "react";
import { Search } from "react-feather";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/Button";
import { QuotationTableRow } from "@/app/(dashboard)/history/QuotationTableRow";
import { QuotationsService } from "@/services/QuotationsService";
import type { HistoryQuotationCard } from "@/types/Quotations";

export default function History() {
  const [unfinishedQuotations, setUnfinishedQuotations] = useState<
    HistoryQuotationCard[]
  >([]);
  const [finishedQuotations, setFinishedQuotations] = useState<
    HistoryQuotationCard[]
  >([]);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">(
    "pending",
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUnfinishedQuotations = async () => {
      try {
        const unfinishedQuotations =
          await QuotationsService.getUnfinishedQuotations();
        setUnfinishedQuotations(unfinishedQuotations);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    const fetchFinishedQuotations = async () => {
      try {
        const finishedQuotations =
          await QuotationsService.getFinishedQuotations();
        setFinishedQuotations(finishedQuotations);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    fetchUnfinishedQuotations();
    fetchFinishedQuotations();
  }, []);

  const filteredUnfinishedQuotations = unfinishedQuotations.filter(
    (quotation) =>
      quotation.taskNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredFinishedQuotations = finishedQuotations.filter((quotation) =>
    quotation.taskNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex justify-start w-full h-full flex-col bg-neutral-50">
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start w-[12vw]">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black mt-1">
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
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={() => setActiveTab("pending")}
            className={`py-2 px-4 rounded-lg font-semibold text-sm border ${
              activeTab === "pending"
                ? "bg-primary/5 text-primary"
                : "bg-white text-gray-500 border-neutral-200"
            }`}
          >
            Pendientes
          </Button>
          <Button
            onClick={() => setActiveTab("completed")}
            className={`py-2 px-4 rounded-lg font-semibold text-sm border ${
              activeTab === "completed"
                ? "bg-primary/5 text-primary"
                : "bg-white text-gray-500 border-neutral-200"
            }`}
          >
            Completadas
          </Button>
        </div>

        <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
          <div className="border rounded-[12px] overflow-auto max-h-[70vh] relative w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead className="text-primary font-[600] text-center">
                    Número
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Cliente
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Comprador
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Fecha Recepción
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Fecha Expiración
                  </TableHead>
                  {activeTab === "pending" && (
                    <TableHead className="text-primary font-[600] text-center">
                      Etapa
                    </TableHead>
                  )}
                  <TableHead className="text-primary font-[600] text-center">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTab === "pending" ? (
                  filteredUnfinishedQuotations.length > 0 ? (
                    filteredUnfinishedQuotations.map((quotation) => (
                      <QuotationTableRow
                        key={quotation.id}
                        quotation={quotation}
                        isPending={true}
                      />
                    ))
                  ) : (
                    <TableRow className="h-36">
                      <TableCell
                        colSpan={7}
                        className="text-sm m-auto h-full text-center text-gray-500"
                      >
                        No hay cotizaciones pendientes
                      </TableCell>
                    </TableRow>
                  )
                ) : filteredFinishedQuotations.length > 0 ? (
                  filteredFinishedQuotations.map((quotation) => (
                    <QuotationTableRow
                      key={quotation.id}
                      quotation={quotation}
                      isPending={false}
                    />
                  ))
                ) : (
                  <TableRow className="h-36">
                    <TableCell
                      colSpan={6}
                      className="text-sm m-auto h-full text-center text-gray-500"
                    >
                      No hay cotizaciones completadas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
