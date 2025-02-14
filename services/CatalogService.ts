import { DropdownItem } from "@/components/Dropdown";

export const CatalogService = {
  // BRAND
  listBrands: async (): Promise<DropdownItem[]> => {
    return [
      { id: 1, name: "Marca A" },
      { id: 2, name: "Marca B" },
      { id: 3, name: "Marca C" },
    ];
  },
  addBrand: async (name: string): Promise<DropdownItem> => {
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // MODEL
  listModels: async (brandId: number): Promise<DropdownItem[]> => {
    console.log(brandId);
    return [
      { id: 1, name: "Modelo A" },
      { id: 2, name: "Modelo B" },
      { id: 3, name: "Modelo C" },
    ];
  },
  addModel: async (name: string): Promise<DropdownItem> => {
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // FAMILY
  addFamily: async (name: string): Promise<DropdownItem> => {
    return { id: Math.floor(Math.random() * 1000000), name };
  },
  listFamilies: async (): Promise<DropdownItem[]> => {
    return [
      { id: 1, name: "Familia A" },
      { id: 2, name: "Familia B" },
      { id: 3, name: "Familia C" },
    ];
  },

  // SUBFAMILY
  listSubfamilies: async (familyId: number): Promise<DropdownItem[]> => {
    console.log(familyId);
    return [
      { id: 1, name: "Subfamilia A" },
      { id: 2, name: "Subfamilia B" },
      { id: 3, name: "Subfamilia C" },
    ];
  },
  addSubfamily: async (name: string): Promise<DropdownItem> => {
    return { id: Math.floor(Math.random() * 1000000), name };
  },

  // UNITS
  listUnits: async (): Promise<DropdownItem[]> => {
    return [
      { id: 1, name: "Unit A" },
      { id: 2, name: "Unit B" },
      { id: 3, name: "Unit C" },
    ];
  },
};
