import { API_BASE_URL } from "@/app/utils/config";

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
};
