"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/Button";
import { QuotationTableRow } from "@/app/(dashboard)/quotations/QuotationTableRow";
import { QuotationsService } from "@/services/QuotationsService";
import type { HistoryQuotationCard } from "@/types/Quotations";
import SearchInput from "@/components/SearchInput";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Quotations() {
  const [unfinishedQuotations, setUnfinishedQuotations] = useState<
    HistoryQuotationCard[]
  >([]);
  const [finishedQuotations, setFinishedQuotations] = useState<
    HistoryQuotationCard[]
  >([]);
  const [activeTab, setActiveTab] = useState<
    "pending" | "assigned" | "completed"
  >("pending");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const userRoles = user?.roles?.map((role) => role.name) || [];
  const isAdmin = userRoles.some((role) =>
    ["Superadmin", "Admin"].includes(role),
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!tab) {
      router.replace(`/quotations?tab=${isAdmin ? "pending" : "assigned"}`);
    } else if (tab === "pending" || tab === "assigned" || tab === "completed") {
      setActiveTab(tab);
    }
  }, [searchParams, router, isAdmin]);

  const handleTabChange = (tab: "pending" | "completed" | "assigned") => {
    if (tab === "pending" || tab === "assigned" || tab === "completed") {
      setActiveTab(tab);
    }
    router.push(`/quotations?tab=${tab}`);
  };

  useEffect(() => {
    const fetchUnfinishedQuotations = async () => {
      try {
        const unfinishedQuotations =
          await QuotationsService.getAssignedQuotations();
        setUnfinishedQuotations(unfinishedQuotations);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    const fetchFinishedQuotations = async () => {
      try {
        const finishedQuotations = isAdmin
          ? await QuotationsService.getFinishedQuotations()
          : await QuotationsService.getUserFinishedQuotations();
        setFinishedQuotations(finishedQuotations);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    fetchUnfinishedQuotations();
    fetchFinishedQuotations();
  }, [isAdmin]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    } else if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "normal";
    }
    setSortConfig({ key, direction });
  };

  const getSortedQuotations = (quotations: HistoryQuotationCard[]) => {
    if (!sortConfig) {
      return quotations;
    }

    const sortedQuotations = [...quotations];
    if (sortConfig.direction === "normal") {
      return sortedQuotations;
    }

    sortedQuotations.sort((a, b) => {
      if (sortConfig.key === "taskNumber") {
        if (a.taskNumber < b.taskNumber) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a.taskNumber > b.taskNumber) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortConfig.key === "clientName") {
        if (a.client < b.client) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a.client > b.client) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortConfig.key === "buyerName") {
        if (a.buyer < b.buyer) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a.buyer > b.buyer) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortConfig.key === "receptionDate") {
        if (a.receptionDate < b.receptionDate) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a.receptionDate > b.receptionDate) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortConfig.key === "expirationDate") {
        if (a.expirationDateTime < b.expirationDateTime) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a.expirationDateTime > b.expirationDateTime) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortConfig.key === "stage") {
        if (a.step < b.step) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a.step > b.step) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });

    return sortedQuotations;
  };

  const sortedUnfinishedQuotations = getSortedQuotations(unfinishedQuotations);
  const sortedFinishedQuotations = getSortedQuotations(finishedQuotations);

  const fetchSearchResults = async (searchTerm: string) => {
    const data: { id: number; taskNumber: string }[] =
      await QuotationsService.searchQuotationByTaskNumber(searchTerm);
    return adaptToDropdown(data, "id", "taskNumber");
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-neutral-50">
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start w-[16vw]">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black mt-1">
              {activeTab === "pending" || activeTab === "assigned"
                ? !isAdmin
                  ? "Cotizaciones asignadas"
                  : "Cotizaciones"
                : "Cotizaciones completadas"}
            </h2>
          </div>
          <SearchInput
            placeholder="Buscar cotización"
            onSearch={fetchSearchResults}
            link="/quotations"
            linkWithName
          />
        </div>
      </div>
      <div className="w-full px-[1vw] mt-[1vw]">
        <div className="flex space-x-[0.5vw]">
          <Button
            onClick={() => handleTabChange(isAdmin ? "pending" : "assigned")}
            className={`py-2 px-4 rounded-[12px] font-semibold text-sm border ${
              activeTab === "pending" || activeTab === "assigned"
                ? "bg-primary/5 text-primary"
                : "bg-white text-gray-500 border-neutral-200"
            }`}
          >
            Pendientes
          </Button>
          <Button
            onClick={() => handleTabChange("completed")}
            className={`py-2 px-4 rounded-[12px] font-semibold text-sm border ${
              activeTab === "completed"
                ? "bg-primary/5 text-primary"
                : "bg-white text-gray-500 border-neutral-200"
            }`}
          >
            Completadas
          </Button>
        </div>

        <div className="w-auto h-auto overflow-hidden rounded-[12px] mt-[1vw] shadow-sm shadow-cyan-500/20">
          <div className="border rounded-[12px] overflow-auto max-h-[70vh] relative w-full">
            <Table className="w-full bg-white">
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead
                    className="text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("taskNumber")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Número{" "}
                      {(sortConfig?.key === "taskNumber" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) || <ArrowUpDown size={14} />}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("clientName")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Cliente{" "}
                      {(sortConfig?.key === "clientName" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) || <ArrowUpDown size={14} />}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("buyerName")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Comprador{" "}
                      {(sortConfig?.key === "buyerName" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) || <ArrowUpDown size={14} />}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("receptionDate")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Fecha Recepción{" "}
                      {(sortConfig?.key === "receptionDate" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) || <ArrowUpDown size={14} />}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("expirationDate")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Fecha Expiración{" "}
                      {(sortConfig?.key === "expirationDate" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) || <ArrowUpDown size={14} />}
                    </div>
                  </TableHead>
                  {(activeTab === "pending" || activeTab === "assigned") && (
                    <TableHead
                      className="text-primary font-[600] text-center cursor-pointer select-none"
                      onClick={() => requestSort("stage")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Etapa{" "}
                        {(sortConfig?.key === "stage" &&
                          {
                            ascending: <ArrowUp size={14} />,
                            descending: <ArrowDown size={14} />,
                          }[sortConfig.direction]) || <ArrowUpDown size={14} />}
                      </div>
                    </TableHead>
                  )}
                  <TableHead className="text-primary font-[600] text-center">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTab === "pending" || activeTab === "assigned" ? (
                  sortedUnfinishedQuotations.length > 0 ? (
                    sortedUnfinishedQuotations.map((quotation) => (
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
                ) : sortedFinishedQuotations.length > 0 ? (
                  sortedFinishedQuotations.map((quotation) => (
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
