"use client";
import { useParams, useRouter } from "next/navigation";
import ItemsList from "@/app/(dashboard)/create/[quotationId]/items/ItemList";
import Button from "@/components/Button";
import { QuoteService } from "@/services/QuoteService";
import { useExpo } from "@/context/ExpoContext";

export default function ItemsStep() {
  const router = useRouter();
  const { quotationId } = useParams();
  const { isExpo } = useExpo();

  const handleNext = async () => {
    await QuoteService.updateQuotationStep(Number(quotationId), 2, isExpo);
    router.push(`/create/${quotationId}/purchase-data`);
  };

  return (
    <div>
      <ItemsList quotationId={Number(quotationId)} />
      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex w-full justify-end">
          {/*<Button className="px-3 py-1 disabled:opacity-50" variant="secondary">*/}
          {/*  Anterior*/}
          {/*</Button>*/}
          <Button onClick={handleNext} variant="primary" className="text-white">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
