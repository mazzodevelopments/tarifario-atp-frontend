"use client";
import { useParams, useRouter } from "next/navigation";
import LogisticList from "@/app/(dashboard)/create/[quotationId]/logistic/LogisticList";
import Button from "@/components/Button";

export default function LogisticStep() {
  const router = useRouter();
  const { quotationId } = useParams();

  const handleNext = () => {
    router.push(`/create/${quotationId}/sales-data`);
  };

  const handleBack = () => {
    router.push(`/create/${quotationId}/purchase-data`);
  };

  return (
    <div>
      <LogisticList quotationId={Number(quotationId)} />
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
