import { CreateQuotationData, QuotationData } from "@/types/QuotationData";
import { CreateItem, CreateMassiveLoadItems } from "@/types/Item";
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
  createQuotation: async (quotationData: CreateQuotationData) => {
    const response = await fetch(`${API_BASE_URL}/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quotationData),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el item");
    }

    return await response.json();
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
  addItems: async (newItems: CreateMassiveLoadItems[], quotationId: number) => {
    const response = await fetch(`${API_BASE_URL}/quote/${quotationId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItems),
    });

    if (!response.ok) {
      throw new Error("Error al agregar los items");
    }

    const data = await response.json();
    console.log("Item agregado:", data);
    return data;
  },
  updateItem: async (editedItem: CreateItem, itemToEditId: number) => {
    const response = await fetch(`${API_BASE_URL}/quote/item`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...editedItem, id: itemToEditId }),
    });

    if (!response.ok) {
      throw new Error("Error al editar el item");
    }

    const data = await response.json();
    console.log("Item editado:", data);
    return data;
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
    console.log("Purchase Data agregada:", data);
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
  addMargin: async (
    margin: number,
    budgetId: number,
  ): Promise<{ message: string; salesDataId: number }> => {
    const response = await fetch(`${API_BASE_URL}/quote/${budgetId}/margin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ margin }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el margen");
    }

    return await response.json();
  },
  addPaymentCondition: async (paymentCondition: string, budgetId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quote/${budgetId}/payment-condition`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentCondition }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al agregar la condición de pago");
    }

    return await response.json();
  },

  // ETAPA 6
  getSelectedBudgets: async (quotationId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quote/${quotationId}/selected-budgets`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer budgets");
    }

    return await response.json();
  },
  selectBudgets: async (budgetIds: number[], quotationId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quote/${quotationId}/select-budgets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budgetIds),
      },
    );

    if (!response.ok) {
      throw new Error("Error al seleccionar budgets");
    }

    return await response.json();
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
  getTaskNumberByQuotationId: async (quotationId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quote/${quotationId}/task-number`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer el task-number");
    }

    return await response.text();
  },

  // TODAS LAS ETAPAS
  updateQuotationStep: async (quotationId: number, step: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quote/${quotationId}/update-step`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ step }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al cambiar el step");
    }

    const data = await response.json();
    return data;
  },
};
