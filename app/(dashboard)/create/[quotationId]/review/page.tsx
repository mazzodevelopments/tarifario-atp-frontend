"use client";
import { useParams, useRouter } from "next/navigation";
import SelectedBudgetsList from "@/app/(dashboard)/create/[quotationId]/review/SelectedBudgetsList";
import Button from "@/components/Button";
import { QuoteService } from "@/services/QuoteService";
import { useExpo } from "@/context/ExpoContext";

export default function ReviewStep() {
  const router = useRouter();
  const { quotationId } = useParams();
  const { isExpo } = useExpo();

  const handleCreate = async () => {
    await QuoteService.updateQuotationStep(Number(quotationId), 7, isExpo);
    router.push(`/create/${quotationId}/confirm`);
  };

  const handleBack = () => {
    router.push(`/create/${quotationId}/select-budgets`);
  };

  return (
    <div>
      <SelectedBudgetsList quotationId={Number(quotationId)} />
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
            onClick={handleCreate}
            variant="primary"
            className="text-white"
          >
            Crear
          </Button>
        </div>
      </div>
    </div>
  );
}
