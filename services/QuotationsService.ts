import { API_BASE_URL } from "@/utils/config";

export const QuotationsService = {
  getAssignedQuotations: async () => {
    const response = await fetch(`${API_BASE_URL}/quotations/assigned`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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

  getUserUnfinishedQuotations: async () => {
    const response = await fetch(`${API_BASE_URL}/quotations/user-unfinished`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al traer cotizaciones");
    }

    return await response.json();
  },

  getUserFinishedQuotations: async () => {
    const response = await fetch(`${API_BASE_URL}/quotations/user-finished`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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

  getUserLastFiveFinishedQuotations: async () => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/user-last-five-finished`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

  getUserLastModifiedQuotation: async () => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/user-last-modified`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer las ultimas cotizaciones");
    }

    return await response.json();
  },
  searchQuotationByTaskNumber: async (term: string) => {
    const response = await fetch(`${API_BASE_URL}/quotations/search/${term}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer las ultimas cotizaciones");
    }

    return await response.json();
  },
  getQuotationsByUserId: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/quotations/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al traer las ultimas cotizaciones");
    }

    return await response.json();
  },
};
