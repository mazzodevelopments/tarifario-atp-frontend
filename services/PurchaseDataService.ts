import type { DropdownItem } from "@/components/Dropdown";
import {
  COUNTRIES,
  CURRENCIES,
  INCOTERMS,
  WEIGHT_UNITS,
} from "@/app/(dashboard)/create/data";
import { Item } from "@/types/Item";

export const PurchaseDataService = {
  fetchSuppliers: async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Proveedor A" },
      { id: "2", name: "Proveedor B" },
      { id: "3", name: "Proveedor C" },
    ];
  },

  addSupplier: async (name: string): Promise<DropdownItem> => {
    return { id: Math.random().toString(36).substr(2, 9), name };
  },

  fetchItems: async (items: Item[]): Promise<DropdownItem[]> => {
    return items.map((item) => {
      return { id: item.numbering, name: item.detail };
    });
  },

  fetchLocations: async (): Promise<DropdownItem[]> => {
    return COUNTRIES;
  },

  fetchIncoterms: async (): Promise<DropdownItem[]> => {
    return INCOTERMS;
  },

  fetchUnits: async (): Promise<DropdownItem[]> => {
    return WEIGHT_UNITS;
  },

  fetchCurrencies: async (): Promise<DropdownItem[]> => {
    return CURRENCIES;
  },
};
