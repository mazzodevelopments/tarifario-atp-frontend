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
import { QuotationTableRow } from "@/app/(dashboard)/quotations/QuotationTableRow";
import { QuotationsService } from "@/services/QuotationsService";
import type { HistoryQuotationCard } from "@/types/Quotations";
import { useParams } from "next/navigation";
import { User } from "@/types/User";
import { AdminService } from "@/services/AdminService";
import Image from "next/image";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

export default function UserHistory() {
  const [userQuotations, setUserQuotations] = useState<HistoryQuotationCard[]>(
    [],
  );
  const [user, setUser] = useState<User | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>({ key: "stage", direction: "ascending" });

  const { id } = useParams();

  useEffect(() => {
    const fetchUserQuotations = async () => {
      try {
        const quotations = await QuotationsService.getQuotationsByUserId(
          Number(id),
        );
        setUserQuotations(quotations);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    const getUser = async () => {
      try {
        const data = await AdminService.getUsersById(Number(id));
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserQuotations();
    getUser();
  }, []);

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

  const sortedUserQuotations = getSortedQuotations(userQuotations);

  return (
    <RoleProtectedRoute allowedRoles={["Admin", "Superadmin"]}>
      <div className="flex justify-start w-full h-full flex-col bg-neutral-50">
        <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
          <div className="flex justify-between items-center h-full px-6 mb-4">
            <div className="flex flex-col justify-center items-start w-[25vw]">
              <div className="flex gap-3 items-center">
                <h2 className="text-xl leading-tight font-bold text-black p-0 mt-1">
                  Cotizaciones
                </h2>
                <span className="text-xl font-medium text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <Image
                    src={user?.profilePic || "/default-profile-pic.png"}
                    width={32}
                    height={32}
                    alt="Picture of the author"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <h2 className="text-xl leading-tight font-bold text-black p-0 mt-1 -ml-0.5">
                    {user?.name + " " + user?.lastname}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-6 pb-6 pt-4">
          <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
            <div className="border rounded-[12px] overflow-auto max-h-[70vh] relative w-full">
              <Table className="w-full">
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
                    <TableHead className="text-primary font-[600] text-center">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                  {sortedUserQuotations.length > 0 ? (
                    sortedUserQuotations.map((quotation) => (
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
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </RoleProtectedRoute>
  );
}
