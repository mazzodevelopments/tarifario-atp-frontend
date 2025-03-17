import { API_BASE_URL } from "@/utils/config";

export const QuotationsService = {
  getUnfinishedQuotations: async () => {
    const response = await fetch(`${API_BASE_URL}/quotations/unfinished`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer cotizaciones");
    }

    return await response.json();
  },

  getFinishedQuotations: async () => {
    const response = await fetch(`${API_BASE_URL}/quotations/finished`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer cotizaciones");
    }

    return await response.json();
  },

  getUserUnfinishedQuotations: async (userId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/unfinished/${userId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer cotizaciones");
    }

    return await response.json();
  },

  getUserFinishedQuotations: async (userId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/finished/${userId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer cotizaciones");
    }

    return await response.json();
  },

  getCompleteFinishedQuotation: async (taskNumber: string) => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/${taskNumber}/finished-complete`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer cotizacion");
    }

    return await response.json();
  },

  getCompleteBudget: async (budgetId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/${budgetId}/complete-budget`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer budget");
    }

    return await response.json();
  },

  getLastFiveFinishedQuotations: async () => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/last-five-finished`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer las ultimas cotizaciones");
    }

    return await response.json();
  },

  getUserLastFiveFinishedQuotations: async (userId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/last-five-finished/${userId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer las ultimas cotizaciones");
    }

    return await response.json();
  },

  getLastModifiedQuotation: async () => {
    const response = await fetch(`${API_BASE_URL}/quotations/last-modified`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer las ultimas cotizaciones");
    }

    return await response.json();
  },
};
