import { PAYMENT_CONDITIONS } from "@/app/(dashboard)/create/data";
import { DropdownItem } from "@/components/Dropdown";

export const SalesDataService = {
  fetchPaymentConditions: async () => {
    return PAYMENT_CONDITIONS;
  },
  addPaymentCondition: async (name: string): Promise<DropdownItem> => {
    return { id: Math.random().toString(36).substr(2, 9), name };
  },
};
