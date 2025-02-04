import { QuotationData } from "@/types/QuotationData";
import { Item } from "@/types/Item";
import { Budget } from "@/types/Budget";

export const CreateQuotationService = {
  fetchQuotationTaskNumber: () => {
    return "A25R-0001";
  },
  loadInitialQuotationData: async (quotationData: QuotationData) => {
    console.log("QuotationDataService: ", quotationData);
  },
  loadQuotationItems: async (taskNumber: string, items: Item[]) => {
    console.log(`Items - ${taskNumber}: `, items);
  },
  loadPurchaseData: async (taskNumber: string, budgets: Budget[]) => {
    console.log(`Budgets - ${taskNumber} (PurchaseData Only): `, budgets);
  },
  loadLogistics: async (taskNumber: string, budgets: Budget[]) => {
    console.log(`Budgets - ${taskNumber} (Add Logistics): `, budgets);
  },
  loadSalesData: async (taskNumber: string, budgets: Budget[]) => {
    console.log(`Budgets - ${taskNumber} (Add SalesData): `, budgets);
  },
  loadSelectedBudgets: async (taskNumber: string, budgets: Budget[]) => {
    console.log(`Budgets - ${taskNumber} (Selected): `, budgets);
  },
  submitQuotation: async (quotationData: QuotationData) => {
    console.log("Cotización completa: ", quotationData);
  },
};
