import type { DropdownItem } from "@/components/Dropdown";

export const LogisticDataService = {
  fetchDeliveryTransportOptions: async (): Promise<DropdownItem[]> => {
    return [
      { id: 1, name: "Moto" },
      { id: 2, name: "Camión hasta 3.000 kg" },
      { id: 3, name: "Camión hasta 7.000 kg" },
      { id: 4, name: "Semi" },
      { id: 5, name: "Contenedor" },
    ];
  },
  fetchTransportOptions: async (): Promise<DropdownItem[]> => {
    return [
      { id: 1, name: "Air" },
      { id: 2, name: "DHL" },
      { id: 3, name: "DHL #" },
      { id: 4, name: "LCL" },
      { id: 5, name: "FCL 20'" },
      { id: 6, name: "FCL 40'" },
      { id: 7, name: "Road" },
    ];
  },
};
