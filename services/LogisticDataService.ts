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
};
