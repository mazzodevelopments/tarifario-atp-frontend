import { API_BASE_URL } from "@/utils/config";
import { AdminCreateUser, AdminUpdateUser } from "@/types/User";

export const AdminService = {
  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 403) {
      console.error("Acceso prohibido: No tienes permisos suficientes");
      return;
    }

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.status}`);
    }

    return await response.json();
  },

  getUsersById: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
  updateUser: async (userToUpdate: AdminUpdateUser) => {
    const response = await fetch(`${API_BASE_URL}/admin/update-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userToUpdate),
    });

    if (response.status === 403) {
      console.error("Acceso prohibido: No tienes permisos suficientes");
      return;
    }

    if (!response.ok) {
      throw new Error(`Error al actualizar usuario: ${response.statusText}`);
    }

    return await response.json();
  },
  deleteUser: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 403) {
      console.error("Acceso prohibido: No tienes permisos suficientes");
      return;
    }

    if (!response.ok) {
      throw new Error(`Error al eliminar usuario: ${response.statusText}`);
    }

    return await response.json();
  },
};
