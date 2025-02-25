"use client";
import { useParams, useRouter } from "next/navigation";
import SelectableBudgetsList from "@/app/(dashboard)/create/[quotationId]/select-budgets/SelectableBudgetsList";
import Button from "@/components/Button";
import { useState } from "react";
import { Budget } from "@/types/Budget";
import { QuoteService } from "@/services/QuoteService";

export default function SelectBudgetsStep() {
  const router = useRouter();
  const { quotationId } = useParams();
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const handleNext = async () => {
    try {
      const budgetIds = budgets.map((budget) => budget.id);

      await QuoteService.selectBudgets(budgetIds, Number(quotationId));

      router.push(`/create/${quotationId}/review`);
    } catch (error) {
      console.error("Error al seleccionar presupuestos:", error);
    }
  };

  const handleBack = () => {
    router.push(`/create/${quotationId}/sales-data`);
  };

  return (
    <div>
      <SelectableBudgetsList
        quotationId={Number(quotationId)}
        setBudgetsToEnableButton={setBudgets}
      />
      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex w-full justify-between">
          <Button
            onClick={handleBack}
            className="px-3 py-1 disabled:opacity-50"
            variant="secondary"
          >
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            variant="primary"
            className="text-white"
            disabled={budgets.length <= 0}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
