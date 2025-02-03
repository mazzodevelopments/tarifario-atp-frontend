import { QuotationData } from "@/types/QuotationData";
import { Item } from "@/types/Item";
import { Budget } from "@/types/Budget";

export const CreateQuotationService = {
  fetchQuotationTaskNumber: () => {
    return "A25R-001";
  },
  loadInitialQuotationData: async (quotationData: QuotationData) => {
    console.log("QuotationDataService: ", quotationData);
  },
  loadQuotationItems: async (items: Item[]) => {
    console.log("Items: ", items);
  },
  loadPurchaseData: async (budgets: Budget[]) => {
    console.log("Budgets (PurchaseData Only): ", budgets);
  },
  loadLogistics: async (budgets: Budget[]) => {
    console.log("Budgets (Add Logistics): ", budgets);
  },
  loadSalesData: async (budgets: Budget[]) => {
    console.log("Budgets (Add SalesData): ", budgets);
  },
  loadSelectedBudgets: async (budgets: Budget[]) => {
    console.log("Budgets (Selected): ", budgets);
  },
  submitQuotation: async (quotationData: QuotationData) => {
    console.log("Cotización completa: ", quotationData);
  },
};
