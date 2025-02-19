import { DropdownItem } from "@/components/Dropdown";
import { API_BASE_URL } from "@/app/utils/config";

export const CatalogService = {
  // CLIENT
  listClients: async () => {
    return [
      { id: 1, name: "Client 1" },
      { id: 2, name: "Client 2" },
      { id: 3, name: "Client 3" },
    ];
  },
  addClient: async (name: string) => {
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // BUYER
  listBuyers: async (clientId: number) => {
    console.log(clientId);
    return [
      { id: 1, name: "Buyer 1" },
      { id: 2, name: "Buyer 2" },
      { id: 3, name: "Buyer 3" },
    ];
  },
  addBuyer: async (name: string, clientId: number) => {
    console.log(clientId);
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // BRAND
  listBrands: async () => {
    return [
      { id: 1, name: "Marca A" },
      { id: 2, name: "Marca B" },
      { id: 3, name: "Marca C" },
    ];
  },
  addBrand: async (name: string) => {
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // MODEL
  listModels: async (brandId: number) => {
    console.log(brandId);
    return [
      { id: 1, name: "Modelo A" },
      { id: 2, name: "Modelo B" },
      { id: 3, name: "Modelo C" },
    ];
  },
  addModel: async (name: string, brandId: number) => {
    console.log(brandId);
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // FAMILY
  addFamily: async (name: string): Promise<DropdownItem> => {
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
  listFamilies: async (): Promise<{ id: number; name: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/catalog/families`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al traer familias");
    }

    return await response.json();
  },

  // SUBFAMILY
  listSubfamilies: async (familyId: number) => {
    console.log(familyId);
    return [
      { id: 1, name: "Subfamilia A" },
      { id: 2, name: "Subfamilia B" },
      { id: 3, name: "Subfamilia C" },
    ];
  },
  addSubfamily: async (name: string, familyId: number) => {
    console.log(familyId);
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // SUPPLIER
  listSuppliers: async () => {
    return [
      { id: 1, name: "Proveedor A" },
      { id: 2, name: "Proveedor B" },
      { id: 3, name: "Proveedor C" },
    ];
  },

  addSupplier: async (name: string) => {
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // UNITS
  listUnits: async (): Promise<DropdownItem[]> => {
    return [
      { id: 1, name: "Unidad" },
      { id: 2, name: "Metro" },
      { id: 3, name: "Kilogramo" },
      { id: 4, name: "Litro" },
    ];
  },

  // WEIGHT UNITS
  listWeightUnits: async () => {
    return [
      { id: 1, name: "Kgrs." },
      { id: 2, name: "Lbs." },
    ];
  },

  // CURRENCIES
  listCurrencies: async () => {
    return [
      { id: 1, name: "USD" },
      { id: 2, name: "EUR" },
      { id: 3, name: "MXN" },
      { id: 4, name: "GBP" },
      { id: 5, name: "JPY" },
      { id: 6, name: "CAD" },
      { id: 7, name: "AUD" },
      { id: 8, name: "CHF" },
      { id: 9, name: "CNY" },
      { id: 10, name: "BRL" },
    ];
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
  listIncoterms: async () => {
    return [
      { id: 1, name: "EXW" },
      { id: 2, name: "FOB" },
      { id: 3, name: "FCA" },
      { id: 4, name: "CIF" },
      { id: 5, name: "CFR" },
      { id: 6, name: "DAT" },
      { id: 7, name: "DAP" },
      { id: 8, name: "DDP" },
    ];
  },

  // PAYMENT CONDITIONS
  listPaymentConditions: async () => {
    return [
      { id: 1, name: "A Convenir" },
      { id: 2, name: "50% Ant. | 50% Deliv." },
      { id: 3, name: "30% Ant. | 70% Deliv." },
      { id: 4, name: "30% Ant. | 70% 15 días." },
      { id: 5, name: "30% Ant. | 70% 30 días." },
      { id: 6, name: "50% Ant. | 50% 30 días." },
      { id: 7, name: "40% Ant. | 60% 30 días." },
      { id: 8, name: "50% Ant. | 50% 15 días." },
      { id: 9, name: "50% F/F | 50% 30 días." },
      { id: 10, name: "50% Deliv. | 50% 30 días." },
      { id: 11, name: "50% Ant. | 50% Previo despacho" },
      { id: 12, name: "50% Ant. | 50% Previo embarque" },
      { id: 13, name: "50% Aprob. SIRA | 50% Pre-embarque" },
      { id: 14, name: "30% Aprov. SIRA | 70% Deliv." },
      { id: 15, name: "100% Ant. Cheque 30 días" },
      { id: 16, name: "100% Ant." },
      { id: 17, name: "100% Deliv." },
      { id: 18, name: "7 Días F/F" },
      { id: 19, name: "15 días F/F" },
      { id: 20, name: "20 días F/F" },
      { id: 21, name: "30 días F/F" },
      { id: 22, name: "60 días F/F" },
      { id: 23, name: "90 días F/F" },
      { id: 24, name: "Echeck 30 días" },
      { id: 25, name: "Echeck 60 días" },
    ];
  },
  addPaymentCondition: async (name: string): Promise<DropdownItem> => {
    return { id: Math.floor(Math.random() * 1000000), name };
  },
};
