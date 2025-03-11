import { API_BASE_URL } from "@/app/utils/config";
import { EditSupplier, Supplier } from "@/types/Supplier";
import { Client, EditClient } from "@/types/Client";

export const CatalogService = {
  // CLIENT
  listClients: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/clients`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer clientes");
    }

    return await response.json();
  },
  listClientsWithBuyers: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/clients-buyers`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer clientes");
    }

    return await response.json();
  },
  addClient: async (newClient: Client): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/catalog/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    });

    if (!response.ok) {
      throw new Error("Error al agregar cliente");
    }

    const data = await response.json();
    console.log("Cliente agregado:", data);
    return data;
  },
  editClient: async (editedClient: EditClient): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/catalog/client`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedClient),
    });

    if (!response.ok) {
      throw new Error("Error al editar cliente");
    }

    const data = await response.json();
    console.log("Cliente editado:", data);
    return data;
  },
  // BUYER
  listBuyers: async (
    clientId: number,
  ): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(
      `${API_BASE_URL}/catalog/buyers?clientId=${clientId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer clientes");
    }

    return await response.json();
  },
  addBuyer: async (buyer: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    birthDate: string;
    street: string;
    streetNumber: string;
    country: string;
    city: string;
    zipCode: string;
    clientId: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/catalog/buyer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buyer),
    });

    if (!response.ok) {
      throw new Error("Error al agregar cliente");
    }

    const data = await response.json();
    console.log("Cliente agregado:", data);
    return data;
  },
  deleteBuyer: async (buyerId: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/catalog/buyer/${buyerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al agregar cliente");
    }

    const data = await response.json();
    return data;
  },

  // BRAND
  listBrands: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/brands`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer marcas");
    }

    return await response.json();
  },
  addBrand: async (name: string): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/catalog/brand`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar marca");
    }

    const data = await response.json();
    console.log("Marca agregado:", data);
    return data;
  },

  // MODEL
  listModels: async (
    brandId: number,
  ): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(
      `${API_BASE_URL}/catalog/models?brandId=${brandId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer marcas");
    }

    return await response.json();
  },
  addModel: async (name: string, brandId: number) => {
    const response = await fetch(`${API_BASE_URL}/catalog/model`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, brandId }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar modelo");
    }

    const data = await response.json();
    console.log("Modelo agregado:", data);
    return data;
  },

  // FAMILY
  listFamilies: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/families`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer familias");
    }

    return await response.json();
  },
  addFamily: async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/catalog/family`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar familia");
    }

    const data = await response.json();
    console.log("Familia agregado:", data);
    return data;
  },

  // SUBFAMILY
  listSubfamilies: async (
    familyId: number,
  ): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(
      `${API_BASE_URL}/catalog/subfamilies?familyId=${familyId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer subfamilias");
    }

    return await response.json();
  },
  addSubfamily: async (name: string, familyId: number): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/catalog/subfamily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, familyId }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar subfamilia");
    }

    const data = await response.json();
    console.log("Subfamilia agregado:", data);
    return data;
  },

  // SUPPLIER
  listSuppliers: async (): Promise<
    {
      id: number;
      name: string;
      isNational: boolean;
      isInternational: boolean;
      email: string;
      phone: string;
    }[]
  > => {
    const response = await fetch(`${API_BASE_URL}/catalog/suppliers`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer provedores");
    }

    return await response.json();
  },

  addSupplier: async (newSupplier: Supplier): Promise<Supplier> => {
    const response = await fetch(`${API_BASE_URL}/catalog/supplier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSupplier),
    });

    if (!response.ok) {
      throw new Error("Error al agregar provedor");
    }

    const data = await response.json();
    console.log("Proovedor agregado:", data);
    return data;
  },

  editSupplier: async (editedSupplier: EditSupplier): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/catalog/supplier`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedSupplier),
    });

    if (!response.ok) {
      throw new Error("Error al agregar provedor");
    }

    const data = await response.json();
    console.log("Proovedor agregado:", data);
    return data;
  },

  // UNITS
  listUnits: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/units`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer unidades");
    }

    return await response.json();
  },

  addUnit: async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/catalog/unit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar unidad");
    }

    const data = await response.json();
    console.log("Unidad agregado:", data);
    return data;
  },

  // WEIGHT UNITS
  listWeightUnits: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/weight-units`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer unidades de peso");
    }

    return await response.json();
  },

  addWeightUnit: async (newWeightUnit: { name: string; kgValue: number }) => {
    const response = await fetch(`${API_BASE_URL}/catalog/weight-unit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWeightUnit),
    });

    if (!response.ok) {
      throw new Error("Error al agregar unidad de peso");
    }

    const data = await response.json();
    console.log("Unidad de peso agregado:", data);
    return data;
  },

  // CURRENCIES
  listCurrencies: async (): Promise<
    { id: number; name: string; abbreviation: string; dollarValue: number }[]
  > => {
    const response = await fetch(`${API_BASE_URL}/catalog/currencies`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer currencies");
    }

    return await response.json();
  },

  addCurrency: async (newCurrency: {
    name: string;
    abbreviation: string;
    dollarValue: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/catalog/currency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCurrency),
    });

    if (!response.ok) {
      throw new Error("Error al agregar currency");
    }

    const data = await response.json();
    console.log("Currency agregado:", data);
    return data;
  },

  // INCOTERMS
  listIncoterms: async (): Promise<
    { id: number; name: string; abbreviation: string }[]
  > => {
    const response = await fetch(`${API_BASE_URL}/catalog/incoterms`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer incoterms");
    }

    return await response.json();
  },

  addIncoterm: async (newIncoterm: { name: string; abbreviation: string }) => {
    const response = await fetch(`${API_BASE_URL}/catalog/incoterm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIncoterm),
    });

    if (!response.ok) {
      throw new Error("Error al agregar incoterm");
    }

    const data = await response.json();
    console.log("Incoterm agregado:", data);
    return data;
  },

  // PAYMENT CONDITIONS
  listPaymentConditions: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/payment-conditions`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer condiciones de pago");
    }

    return await response.json();
  },
  addPaymentCondition: async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/catalog/payment-condition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar incoterm");
    }

    const data = await response.json();
    console.log("Incoterm agregado:", data);
    return data;
  },
  // ROLES
  listRoles: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/roles`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer roles");
    }

    return await response.json();
  },
};
