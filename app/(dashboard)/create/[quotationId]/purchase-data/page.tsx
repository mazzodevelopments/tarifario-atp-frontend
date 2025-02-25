"use client";
import { useParams, useRouter } from "next/navigation";
import PurchaseList from "@/app/(dashboard)/create/[quotationId]/purchase-data/PurchaseList";
import Button from "@/components/Button";

export default function PurchaseDataStep() {
  const router = useRouter();
  const { quotationId } = useParams();

  const handleNext = () => {
    router.push(`/create/${quotationId}/logistic`);
  };

  const handleBack = () => {
    router.push(`/create/${quotationId}/items`);
  };

  return (
    <div>
      <PurchaseList quotationId={Number(quotationId)} />
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
