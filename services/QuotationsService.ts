import { API_BASE_URL } from "@/utils/config";

export const QuotationsService = {
  getAssignedQuotations: async (
    page: number = 1,
    pageSize: number = 10,
    isExpo: boolean = false,
    timeFilter?: "day" | "week" | "month",
  ) => {
    const url = `${API_BASE_URL}/quotations/assigned?page=${page}&pageSize=${pageSize}&isExpo=${isExpo}${
      timeFilter ? `&timeFilter=${timeFilter}` : ""
    }`;

    const response = await fetch(url, {
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

  getFinishedQuotations: async (
    page: number = 1,
    pageSize: number = 10,
    timeFilter?: "day" | "week" | "month",
  ) => {
    const url = `${API_BASE_URL}/quotations/finished?page=${page}&pageSize=${pageSize}${
      timeFilter ? `&timeFilter=${timeFilter}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer cotizaciones");
    }

    return await response.json();
  },

  getUserFinishedQuotations: async (
    page: number = 1,
    userId?: number,
    pageSize: number = 10,
    timeFilter?: "day" | "week" | "month",
  ) => {
    const url = `${API_BASE_URL}/quotations/user-finished?page=${page}&pageSize=${pageSize}${
      userId ? `&userId=${userId}` : ""
    }${timeFilter ? `&timeFilter=${timeFilter}` : ""}`;

    const response = await fetch(url, {
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

  getLastModifiedQuotations: async (isExpo = false) => {
    const url = `${API_BASE_URL}/quotations/last-modified${isExpo ? "?isExpo=true" : ""}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer las ultimas cotizaciones");
    }

    return await response.json();
  },

  getLastModifiedQuotation: async () => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/last-modified-quotation`,
      {
        method: "GET",
      },
    );

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
  searchQuotationByTaskNumber: async (
    term: string,
    isExpo: boolean = false,
  ): Promise<{ id: number; taskNumber: string; step: number }[]> => {
    const response = await fetch(
      `${API_BASE_URL}/quotations/search/${term}?isExpo=${isExpo}`,
      {
        method: "GET",
      },
    );

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
