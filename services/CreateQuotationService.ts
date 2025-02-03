import { QuotationData } from "@/types/QuotationData";

export const CreateQuotationService = {
  fetchQuotationTaskNumber: () => {
    return "A25R-001";
  },
  loadInitialQuotationData: (quotationData: QuotationData) => {
    console.log("QuotationDataService: ", quotationData);
  },
};
