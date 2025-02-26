import { API_BASE_URL } from "@/app/utils/config";
import { Supplier } from "@/types/Supplier";
import { Client } from "@/types/Client";

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
  editClient: async (editedClient: Client): Promise<number> => {
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

  addSupplier: async (newSupplier: Supplier): Promise<number> => {
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

  editSupplier: async (editedSupplier: Supplier): Promise<number> => {
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

  addWeightUnit: async (name: string) => {
    // TODO AGREGAR VALOR DE KG
    const response = await fetch(`${API_BASE_URL}/catalog/weight-unit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, kgValue: 1 }),
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
    { id: number; name: string; abbreviation: string }[]
  > => {
    const response = await fetch(`${API_BASE_URL}/catalog/currencies`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer currencies");
    }

    return await response.json();
  },

  addCurrency: async (name: string) => {
    // TODO AGREGAR VALOR DE DOLLAR
    const response = await fetch(`${API_BASE_URL}/catalog/currency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, abbreviation: "USD", dollarValue: 1 }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar currency");
    }

    const data = await response.json();
    console.log("Currency agregado:", data);
    return data;
  },

  // LOCATIONS
  listLocations: async () => {
    return [
      { id: 1, name: "Afganistán" },
      { id: 2, name: "Albania" },
      { id: 3, name: "Alemania" },
      { id: 4, name: "Andorra" },
      { id: 5, name: "Angola" },
      { id: 6, name: "Antigua y Barbuda" },
      { id: 7, name: "Arabia Saudita" },
      { id: 8, name: "Argelia" },
      { id: 9, name: "Argentina" },
      { id: 10, name: "Armenia" },
      { id: 11, name: "Australia" },
      { id: 12, name: "Austria" },
      { id: 13, name: "Azerbaiyán" },
      { id: 14, name: "Bahamas" },
      { id: 15, name: "Bangladés" },
      { id: 16, name: "Barbados" },
      { id: 17, name: "Baréin" },
      { id: 18, name: "Bélgica" },
      { id: 19, name: "Belice" },
      { id: 20, name: "Benín" },
      { id: 21, name: "Bielorrusia" },
      { id: 22, name: "Birmania (Myanmar)" },
      { id: 23, name: "Bolivia" },
      { id: 24, name: "Bosnia y Herzegovina" },
      { id: 25, name: "Botsuana" },
      { id: 26, name: "Brasil" },
      { id: 27, name: "Brunéi" },
      { id: 28, name: "Bulgaria" },
      { id: 29, name: "Burkina Faso" },
      { id: 30, name: "Burundi" },
      { id: 31, name: "Bután" },
      { id: 32, name: "Cabo Verde" },
      { id: 33, name: "Camboya" },
      { id: 34, name: "Camerún" },
      { id: 35, name: "Canadá" },
      { id: 36, name: "Catar" },
      { id: 37, name: "Chad" },
      { id: 38, name: "Chile" },
      { id: 39, name: "China" },
      { id: 40, name: "Chipre" },
      { id: 41, name: "Colombia" },
      { id: 42, name: "Comoras" },
      { id: 43, name: "Corea del Norte" },
      { id: 44, name: "Corea del Sur" },
      { id: 45, name: "Costa de Marfil" },
      { id: 46, name: "Costa Rica" },
      { id: 47, name: "Croacia" },
      { id: 48, name: "Cuba" },
      { id: 49, name: "Dinamarca" },
      { id: 50, name: "Ecuador" },
      { id: 51, name: "Egipto" },
      { id: 52, name: "El Salvador" },
      { id: 53, name: "Emiratos Árabes Unidos" },
      { id: 54, name: "Eritrea" },
      { id: 55, name: "Eslovaquia" },
      { id: 56, name: "Eslovenia" },
      { id: 57, name: "España" },
      { id: 58, name: "Estados Unidos" },
      { id: 59, name: "Estonia" },
      { id: 60, name: "Esuatini" },
      { id: 61, name: "Etiopía" },
      { id: 62, name: "Filipinas" },
      { id: 63, name: "Finlandia" },
      { id: 64, name: "Fiyi" },
      { id: 65, name: "Francia" },
      { id: 66, name: "Gabón" },
      { id: 67, name: "Gambia" },
      { id: 68, name: "Georgia" },
      { id: 69, name: "Ghana" },
      { id: 70, name: "Granada" },
      { id: 71, name: "Grecia" },
      { id: 72, name: "Guatemala" },
      { id: 73, name: "Guyana" },
      { id: 74, name: "Haití" },
      { id: 75, name: "Honduras" },
      { id: 76, name: "Hungría" },
      { id: 77, name: "India" },
      { id: 78, name: "Indonesia" },
      { id: 79, name: "Irak" },
      { id: 80, name: "Irán" },
      { id: 81, name: "Irlanda" },
      { id: 82, name: "Islandia" },
      { id: 83, name: "Israel" },
      { id: 84, name: "Italia" },
      { id: 85, name: "Jamaica" },
      { id: 86, name: "Japón" },
      { id: 87, name: "Jordania" },
      { id: 88, name: "Kazajistán" },
      { id: 89, name: "Kenia" },
      { id: 90, name: "Kirguistán" },
      { id: 91, name: "Kiribati" },
      { id: 92, name: "Kuwait" },
      { id: 93, name: "Laos" },
      { id: 94, name: "Lesoto" },
      { id: 95, name: "Letonia" },
      { id: 96, name: "Líbano" },
      { id: 97, name: "Liberia" },
      { id: 98, name: "Libia" },
      { id: 99, name: "Liechtenstein" },
      { id: 100, name: "Lituania" },
    ];
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

  addIncoterm: async (name: string) => {
    // TODO AGREGAR ABBREVIATION
    const response = await fetch(`${API_BASE_URL}/catalog/incoterm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, abbreviation: "EXW" }),
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
};
