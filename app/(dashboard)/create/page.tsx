"use client";

import { useRouter } from "next/navigation";
import QuotationDetails from "@/app/(dashboard)/create/[quotationId]/quotation-details/QuotationDetails";

export default function Create() {
  const router = useRouter();

  const handleQuotationSubmitSuccess = async (id: number) => {
    router.push(`/create/${id}/items`);
  };

  return (
    <div>
      <QuotationDetails onSubmitSuccess={handleQuotationSubmitSuccess} />
    </div>
  );
}
