import { DropdownItem } from "@/components/Dropdown";

const UNITS: DropdownItem[] = [
  { id: "1", name: "Unit A" },
  { id: "2", name: "Unit B" },
  { id: "3", name: "Unit C" },
];

export const ItemsService = {
  fetchBrands: async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Marca A" },
      { id: "2", name: "Marca B" },
      { id: "3", name: "Marca C" },
    ];
  },

  fetchFamilies: async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Familia A" },
      { id: "2", name: "Familia B" },
      { id: "3", name: "Familia C" },
    ];
  },

  fetchSubfamilies: async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Subfamilia A" },
      { id: "2", name: "Subfamilia B" },
      { id: "3", name: "Subfamilia C" },
    ];
  },

  fetchUnits: async (): Promise<DropdownItem[]> => {
    return UNITS;
  },

  addBrand: async (name: string): Promise<DropdownItem> => {
    return { id: Math.random().toString(36).substr(2, 9), name };
  },

  addFamily: async (name: string): Promise<DropdownItem> => {
    return { id: Math.random().toString(36).substr(2, 9), name };
  },

  addSubfamily: async (name: string): Promise<DropdownItem> => {
    return { id: Math.random().toString(36).substr(2, 9), name };
  },
};
