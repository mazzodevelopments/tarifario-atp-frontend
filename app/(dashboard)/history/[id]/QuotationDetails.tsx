import React, { useEffect, useState } from "react";
import { Calendar, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import BudgetDetails from "./BudgetDetails";
import { QuotationsService } from "@/services/QuotationsService";

interface QuotationDetail {
  id: number;
  buyer: {
    person: {
      name: string;
      lastname: string;
    };
    client: {
      name: string;
    };
  };
  receptionDate: string;
  uploadDate: string;
  expirationDateTime: string;
  materialsNeededDate: string;
  customerRequestNumber: string;
  budgets: {
    id: number;
    purchaseData: {
      item: {
        detail: string;
      };
      origin: string;
      destination: string;
      currency: {
        abbreviation: string;
      };
    };
    salesData: { totalSalePrice: number };
  }[];
}

export default function QuotationDetails({
  quotationId,
}: {
  quotationId: number;
}) {
  const [quotation, setQuotation] = useState<QuotationDetail | null>(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const completeFinishedQuotation =
          await QuotationsService.getCompleteFinishedQuotation(1);
        setQuotation(completeFinishedQuotation);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    fetchQuotation();
  }, [quotationId]);

  if (!quotation) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-120px)] pr-4">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <h3 className="font-semibold">Información del Cliente</h3>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Cliente</p>
              <p className="font-medium">{quotation.buyer.client.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Comprador</p>
              <p className="font-medium">
                {quotation.buyer.person.name +
                  " " +
                  quotation.buyer.person.lastname}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <h3 className="font-semibold">Fechas</h3>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Fecha de Recepción</p>
              <p className="font-medium">
                {new Date(quotation.receptionDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Fecha de Carga</p>
              <p className="font-medium">
                {new Date(quotation.uploadDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Fecha de Expiración</p>
              <p className="font-medium">
                {new Date(quotation.expirationDateTime).toLocaleDateString()}{" "}
                12:00hs
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Fecha Necesaria de Materiales
              </p>
              <p className="font-medium">
                {new Date(quotation.materialsNeededDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Reference Numbers */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <h3 className="font-semibold">Números de Referencia</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Número de Solicitud del Cliente
              </p>
              <p className="font-medium">{quotation.customerRequestNumber}</p>
            </div>
          </div>
        </div>

        {/* Budgets */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Presupuestos</h3>
          <div className="grid grid-cols-1 gap-4">
            {quotation.budgets?.map((budget) => (
              <div
                key={budget.id}
                className="p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="font-semibold">
                      {budget.purchaseData?.item?.detail}
                    </p>
                    <p className="text-sm text-gray-500">
                      {budget.purchaseData?.origin} →{" "}
                      {budget.purchaseData?.destination}
                    </p>
                    <p className="text-sm font-medium">
                      {budget.salesData?.totalSalePrice}{" "}
                      {budget.purchaseData?.currency.abbreviation}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="justify-center items-center py-2 px-4 rounded-xl"
                    onClick={() => setSelectedBudgetId(budget.id)}
                  >
                    Ver Detalles
                  </Button>
                </div>
                {selectedBudgetId && (
                  <BudgetDetails
                    budgetId={budget.id}
                    isOpen={!!selectedBudgetId}
                    onClose={() => setSelectedBudgetId(null)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
