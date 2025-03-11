import { API_BASE_URL } from "@/app/utils/config";

const token = localStorage.getItem("token");

export const AdminService = {
  getAllUsers: async () => {
    const response = await fetch(
      `https://apitarifario.mazzodevelopments.com/admin/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 403) {
      console.error("Acceso prohibido: No tienes permisos suficientes");
      return;
    }

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.status}`);
    }

    return await response.json();
  },
};
