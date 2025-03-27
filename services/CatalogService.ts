import { API_BASE_URL } from "@/utils/config";
import { CreateSupplier, Supplier } from "@/types/Supplier";
import { Client, CreateClient } from "@/types/Client";
import { Buyer, CreateBuyer } from "@/types/Buyer";
import { Brand, Model } from "@/types/Model";
import { Family, Subfamily } from "@/types/Family";
import { CreateWeightUnit, Unit, WeightUnit } from "@/types/Unit";
import { CreateCurrency, Currency } from "@/types/Currency";
import { CreateIncoterm, Incoterm } from "@/services/Incoterm";
import { PaymentCondition } from "@/types/PaymentCondition";
import { OfferedCondition } from "@/types/OfferedCondition";

export const CatalogService = {
  // CLIENT
  listClients: async (): Promise<Client[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/clients`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer clientes");
    }

    return await response.json();
  },
  listClientsWithBuyers: async (): Promise<Client[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/clients-buyers`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer clientes");
    }

    return await response.json();
  },
  getClientById: async (clientId: number) => {
    const response = await fetch(`${API_BASE_URL}/catalog/client/${clientId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer clientes");
    }

    return await response.json();
  },
  addClient: async (newClient: CreateClient): Promise<Client> => {
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
  editClient: async (
    editedClient: Partial<Client>,
  ): Promise<{ message: string }> => {
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
  deleteClient: async (clientId: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/catalog/client/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar client");
    }

    const data = await response.json();
    console.log("Proovedor client:", data);
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
  addBuyer: async (newBuyer: CreateBuyer): Promise<Buyer> => {
    const response = await fetch(`${API_BASE_URL}/catalog/buyer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBuyer),
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
  listBrands: async (): Promise<Brand[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/brands`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer marcas");
    }

    return await response.json();
  },
  addBrand: async (name: string): Promise<Brand> => {
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
  listModels: async (brandId: number): Promise<Model[]> => {
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
  addModel: async (name: string, brandId: number): Promise<Model> => {
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
  listFamilies: async (): Promise<Family[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/families`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer familias");
    }

    return await response.json();
  },
  addFamily: async (name: string): Promise<Family> => {
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
  listSubfamilies: async (familyId: number): Promise<Subfamily[]> => {
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
  addSubfamily: async (name: string, familyId: number): Promise<Subfamily> => {
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
  listSuppliers: async (): Promise<Supplier[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/suppliers`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer provedores");
    }

    return await response.json();
  },

  getSupplierById: async (supplierId: number): Promise<Supplier> => {
    const response = await fetch(
      `${API_BASE_URL}/catalog/supplier/${supplierId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Error al traer supplier");
    }

    return await response.json();
  },

  addSupplier: async (newSupplier: CreateSupplier): Promise<Supplier> => {
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

  editSupplier: async (
    editedSupplier: Partial<Supplier>,
  ): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/catalog/supplier`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedSupplier),
    });

    if (!response.ok) {
      throw new Error("Error al editar provedor");
    }

    const data = await response.json();
    console.log("Proovedor editado:", data);
    return data;
  },

  deleteSupplier: async (supplierId: number): Promise<{ message: string }> => {
    const response = await fetch(
      `${API_BASE_URL}/catalog/supplier/${supplierId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error al eliminar proovedor");
    }

    const data = await response.json();
    console.log("Proovedor eliminado:", data);
    return data;
  },

  // UNITS
  listUnits: async (): Promise<Unit[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/units`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer unidades");
    }

    return await response.json();
  },

  addUnit: async (name: string): Promise<Unit> => {
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
  listWeightUnits: async (): Promise<WeightUnit[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/weight-units`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer unidades de peso");
    }

    return await response.json();
  },

  addWeightUnit: async (
    newWeightUnit: CreateWeightUnit,
  ): Promise<WeightUnit> => {
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
  listCurrencies: async (): Promise<Currency[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/currencies`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer currencies");
    }

    return await response.json();
  },

  addCurrency: async (newCurrency: CreateCurrency): Promise<Currency> => {
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
  listIncoterms: async (): Promise<Incoterm[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/incoterms`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer incoterms");
    }

    return await response.json();
  },

  addIncoterm: async (newIncoterm: CreateIncoterm): Promise<Incoterm> => {
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
  listPaymentConditions: async (): Promise<PaymentCondition[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/payment-conditions`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer condiciones de pago");
    }

    return await response.json();
  },
  addPaymentCondition: async (name: string): Promise<PaymentCondition> => {
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
  // OFFERED CONDITIONS
  listOfferedConditions: async (): Promise<PaymentCondition[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/offered-conditions`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer condiciones de pago");
    }

    return await response.json();
  },
  addOfferedCondition: async (name: string): Promise<OfferedCondition> => {
    const response = await fetch(`${API_BASE_URL}/catalog/offered-condition`, {
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
