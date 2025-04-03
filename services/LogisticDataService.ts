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
  fetchTransportOptions: async () => {
    return [
      { id: 1, category: "Air", type: "National" },
      { id: 2, category: "DHL", type: "National" },
      { id: 3, category: "DHL #", type: "International" },
      { id: 4, category: "LCL", type: "National" },
      { id: 5, category: "FCL 20'", type: "International" },
      { id: 6, category: "FCL 40'", type: "National" },
      { id: 7, category: "Road", type: "International" },
    ];
  },
};
