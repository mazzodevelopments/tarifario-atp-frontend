import { DropdownItem } from "@/components/Dropdown";

export const QuotationDataService = {
  fetchClients: async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Client 1" },
      { id: "2", name: "Client 2" },
      { id: "3", name: "Client 3" },
    ];
  },

  fetchBuyers: async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Buyer 1" },
      { id: "2", name: "Buyer 2" },
      { id: "3", name: "Buyer 3" },
    ];
  },
};
