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
import type { Budget } from "@/types/Budget";
import { Mail, Printer } from "lucide-react";
import "@/app/utils/formatNumber";
import { QuoteService } from "@/services/QuoteService";

export default function SelectedBudgetsList({
  quotationId,
}: {
  quotationId: number;
}) {
  const [selectedBudgets, setSelectedBudgets] = useState<Budget[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchQuotationSelectedBudgets = async () => {
      try {
        const selectedQuotationBudgets =
          await QuoteService.getSelectedBudgets(quotationId);
        setSelectedBudgets(selectedQuotationBudgets);
        setShouldFetch(false);
      } catch (error) {
        console.error("Error fetching quotation budgets:", error);
      }
    };

    fetchQuotationSelectedBudgets();
  }, [shouldFetch]);
  const handlePrint = () => {
    QuoteService.printQuotation(quotationId);
    console.log("Imprimir cotización:", selectedBudgets);
  };

  const handleMail = () => {
    QuoteService.sendQuotationViaMail(quotationId);
    console.log("Imprimir cotización:", selectedBudgets);
  };

  const calculateTotalPrice = (budget: Budget): number => {
    let total = 0;

    if (budget.purchaseData) {
      total +=
        budget.purchaseData?.appliedUnitPrice *
        (budget.purchaseData?.item?.quantity ?? 1);
    }

    if (budget.freight?.total) {
      total += budget.freight.total;
    }

    return total;
  };

  const calculateAppliedTotalPrice = (budget: Budget): number => {
    let total = 0;

    total += calculateTotalPrice(budget);
    if (budget.salesData?.margin) {
      total = total * (1 + budget.salesData?.margin / 100);
    }
    return total;
  };

  const totalSum = selectedBudgets.reduce(
    (sum, budget) => sum + calculateAppliedTotalPrice(budget),
    0,
  );

  return (
    <div className="w-full flex justify-center items-center max-w-4xl flex-col">
      <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
        <div className="border rounded-[12px] max-h-[25vw] relative overflow-auto w-[54vw]">
          <Table>
            <TableHeader className="bg-primary/5">
              <TableRow>
                <TableHead className="text-primary font-[600] text-center">
                  Numeración
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Item
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Proveedor
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Origen
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Destino
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  T. Producción
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Incoterm
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Total Flete
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Precio Total
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Margen
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Condición de Pago
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Precio V. Unitario
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Precio V. Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {selectedBudgets.length === 0 ? (
                <TableRow className="h-24 ">
                  <TableCell
                    colSpan={14}
                    className="text-sm m-auto h-full text-center text-gray-500"
                  >
                    No hay presupuestos seleccionados
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {selectedBudgets.map((budget) => (
                    <TableRow key={budget.id} className="text-sm text-center">
                      <TableCell>
                        {budget.stage + " " + budget.numbering}
                      </TableCell>
                      <TableCell>{budget.purchaseData?.item?.detail}</TableCell>
                      <TableCell>{budget.purchaseData?.supplier}</TableCell>
                      <TableCell>{budget.purchaseData?.origin}</TableCell>
                      <TableCell>{budget.purchaseData?.destination}</TableCell>
                      <TableCell>
                        {budget.purchaseData?.productionTime} días
                      </TableCell>
                      <TableCell>{budget.purchaseData?.incoterm}</TableCell>
                      <TableCell>
                        {budget.freight?.total
                          ? `$${budget.freight.total.formatNumber()}`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        ${calculateTotalPrice(budget).formatNumber()}
                      </TableCell>
                      <TableCell>
                        {(budget.salesData?.margin ?? 0) > 0
                          ? budget.salesData?.margin
                          : 0}
                        %
                      </TableCell>
                      <TableCell>
                        {budget.salesData?.paymentCondition
                          ? `${budget.salesData.paymentCondition}`
                          : "-"}
                      </TableCell>
                      <TableCell className="font-[600]">
                        $
                        {(
                          calculateAppliedTotalPrice(budget) /
                          (budget.purchaseData?.item?.quantity ?? 1)
                        ).formatNumber()}{" "}
                      </TableCell>
                      <TableCell className="font-[600]">
                        ${calculateAppliedTotalPrice(budget).formatNumber()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="text-sm font-bold bg-gray-50">
                    <TableCell colSpan={12} className="text-right">
                      Total General:
                    </TableCell>
                    <TableCell className="font-bold">
                      ${totalSum.formatNumber()}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mt-6 gap-2">
        <Button
          onClick={handlePrint}
          className="text-sm px-4 py-2 bg-primary text-white flex items-center gap-2"
          disabled={selectedBudgets.length === 0}
        >
          <Printer size={16} />
          Imprimir Cotización
        </Button>
        <Button
          onClick={handleMail}
          className="text-sm px-4 py-2 bg-primary text-white flex items-center gap-2"
          disabled={selectedBudgets.length === 0}
        >
          <Mail size={16} />
          Enviar Por Mail
        </Button>
      </div>
    </div>
  );
}
