import type React from "react";
import type { QuotationData } from "@/types/QuotationData";
import { Calendar, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Budget } from "@/types/Budget";
import BudgetDetails from "./BudgetDetails";

interface QuotationDetailsProps {
  quotation: QuotationData;
}

const QuotationDetails: React.FC<QuotationDetailsProps> = ({ quotation }) => {
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

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
              <p className="font-medium">{quotation.client}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Comprador</p>
              <p className="font-medium">{quotation.buyer}</p>
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
                key={budget.numbering}
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
                      {budget.salesData?.totalPrice}{" "}
                      {budget.purchaseData?.currency}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="justify-center items-center py-2 px-4 rounded-xl"
                    onClick={() => setSelectedBudget(budget)}
                  >
                    Ver Detalles
                  </Button>
                </div>
                {selectedBudget && (
                  <BudgetDetails
                    budget={selectedBudget}
                    isOpen={!!selectedBudget}
                    onClose={() => setSelectedBudget(null)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default QuotationDetails;
