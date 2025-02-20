import { QuotationData } from "@/types/QuotationData";
import { TEST_BUDGETS } from "@/app/(dashboard)/create/testData";
import { CreateItem, Item } from "@/types/Item";
import { CreatePurchaseData, PurchaseData } from "@/types/PurchaseData";
import { SalesData } from "@/types/SalesData";
import { API_BASE_URL } from "@/app/utils/config";

export const QuoteService = {
  // ETAPA 1
  fetchQuotationTaskNumber: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/quote/task-number`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer el task-number");
    }

    return await response.text();
  },
  createQuotation: async (quotationData: QuotationData) => {
    console.log("QuotationDataService: ", quotationData);
    return 1;
  },

  // ETAPA 2
  getQuotationItems: async (quotationId: number) => {
    const response = await fetch(`${API_BASE_URL}/quote/${quotationId}/items`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer el task-number");
    }

    return await response.json();
  },
  addItem: async (newItem: CreateItem, quotationId: number) => {
    console.log("LLAMADO A LA API PARA AGREGAR ITEM", newItem, quotationId);
    const response = await fetch(`${API_BASE_URL}/quote/${quotationId}/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el item");
    }

    const data = await response.json();
    console.log("Item agregado:", data);
    return data;
  },
  updateItem: async (editedItem: Item) => {
    console.log("LLAMADO A LA API PARA EDITAR ITEM", editedItem);
  },
  deleteItem: async (itemId: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/quote/items/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el item");
    }

    return await response.json();
  },

  // ETAPA 3
  getQuotationBudgets: async (quotationId: number, query: string) => {
    const response = await fetch(
      `${API_BASE_URL}/quote/${quotationId}/budgets?includes=${query}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer budgets");
    }

    return await response.json();
  },
  addPurchaseData: async (
    newPurchaseData: CreatePurchaseData,
    quotationId: number,
  ) => {
    console.log(
      "LLAMADO A LA API PARA AGREGAR PURCHASE DATA",
      newPurchaseData,
      quotationId,
    );
    const response = await fetch(
      `${API_BASE_URL}/quote/${quotationId}/budgets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPurchaseData),
      },
    );

    if (!response.ok) {
      throw new Error("Error al agregar el item");
    }

    const data = await response.json();
    console.log("Item agregado:", data);
    return data;
  },
  updatePurchaseData: async (editedPurchaseData: PurchaseData) => {
    console.log(
      "LLAMADO A LA API PARA EDITAR PURCHASE DATA",
      editedPurchaseData,
    );
  },
  deletePurchaseData: async (purchaseDataId: string) => {
    // ID EN REALIDAD ES NUMBER
    console.log("LLAMADO A LA API PARA ELIMINAR PURCHASE DATA", purchaseDataId);
  },

  // ETAPA 4
  // TODO

  // ETAPA 5
  addMargin: async (margin: number, quotationId: number) => {
    console.log("LLAMADO A LA API PARA ADD MARGIN", margin, quotationId);
  },
  addPaymentCondition: async (
    paymentCondition: string,
    quotationId: number,
  ) => {
    console.log(
      "LLAMADO A LA API PARA ADD PAYMENT CONDITION",
      paymentCondition,
      quotationId,
    );
  },
  updateSalesData: async (salesData: SalesData) => {
    console.log("LLAMADO A LA API PARA EDITAR SALESDATA", salesData);
  },
  deleteSalesData: async (salesDataId: number) => {
    console.log("LLAMADO A LA API PARA EDITAR SALESDATA", salesDataId);
  },

  // ETAPA 6
  getSelectedBudgets: async (quotationId: number) => {
    console.log(
      "LLAMADO A LA API PARA OBTENER TODOS LOS BUDGETS SELECCIONADOS",
      quotationId,
    );
    return TEST_BUDGETS.slice(0, 2);
  },
  selectBudgets: async (budgetIds: string[], quotationId: number) => {
    // IDS DEBEN SER NUMBERS
    console.log(
      "LLAMADO A LA API PARA SELECCIONAR BUDGETS",
      budgetIds,
      quotationId,
    );
  },

  // ETAPA 7
  printQuotation: async (quotationId: number) => {
    console.log("IMPRIMIR COTIZACION", quotationId);
  },
  sendQuotationViaMail: async (quotationId: number) => {
    console.log("ENVIAR COTIZACION POR MAIL", quotationId);
  },
  // ETAPA 8
  saveQuotation: async (quotationData: QuotationData) => {
    console.log("Cotización completa: ", quotationData);
  },
};
