import { API_BASE_URL } from "@/app/utils/config";
import { AdminCreateUser } from "@/types/User";

export const AdminService = {
  getAllUsers: async () => {
    const response = await fetch(
      `https://apitarifario.mazzodevelopments.com/admin/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  createUser: async (newUser: AdminCreateUser) => {
    const response = await fetch(`${API_BASE_URL}/admin/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
        lastname: newUser.lastname,
        password: newUser.password,
        roleId: newUser.roleId,
      }),
    });

    if (response.status === 403) {
      console.error("Acceso prohibido: No tienes permisos suficientes");
      return;
    }

    if (!response.ok) {
      throw new Error(`Error al crear usuario: ${response.statusText}`);
    }

    return await response.json();
  },
};
