"use client";
import { useParams, useRouter } from "next/navigation";
import SalesList from "@/app/(dashboard)/create/[quotationId]/sales-data/SalesList";
import Button from "@/components/Button";
import { QuoteService } from "@/services/QuoteService";
import { useExpo } from "@/context/ExpoContext";

export default function SalesDataStep() {
  const router = useRouter();
  const { quotationId } = useParams();
  const { isExpo } = useExpo();

  const handleNext = async () => {
    await QuoteService.updateQuotationStep(Number(quotationId), 5, isExpo);
    router.push(`/create/${quotationId}/select-budgets`);
  };

  const handleBack = () => {
    router.push(`/create/${quotationId}/logistic`);
  };

  return (
    <div>
      <SalesList quotationId={Number(quotationId)} />
      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex w-full justify-between">
          <Button
            onClick={handleBack}
            className="px-3 py-1 disabled:opacity-50"
            variant="secondary"
          >
            Anterior
          </Button>
          <Button onClick={handleNext} variant="primary" className="text-white">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
