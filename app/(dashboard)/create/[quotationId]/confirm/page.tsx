"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SuccessAnimation from "@/app/(dashboard)/create/SuccesAnimation";
import { QuoteService } from "@/services/QuoteService";

export default function CreatingPage() {
  const { quotationId } = useParams();
  const [taskNumber, setTaskNumber] = useState<string>("");
  const [isCreating, setIsCreating] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchQuotationTaskNumber = async () => {
      setTaskNumber(
        await QuoteService.getTaskNumberByQuotationId(Number(quotationId)),
      );
    };

    try {
      fetchQuotationTaskNumber();
      setIsCreating(false);
      setIsSuccess(true);
    } catch (error) {
      console.log("Error obteniendo el task number: ", error);
    }
  }, []);

  return (
    <SuccessAnimation
      isCreating={isCreating}
      isSuccess={isSuccess}
      taskNumber={taskNumber}
    />
  );
}
