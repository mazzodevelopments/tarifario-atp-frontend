import React from "react";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import Input from "@/components/Input";

interface QuotationDetailsProps {
  quotationData: {
    name: string;
    client: string;
    buyer: string;
  };
  setQuotationData: (quotationData: {
    name: string;
    client: string;
    buyer: string;
  }) => void;
}

// Simulate a function to fetch clients from an API
const fetchClients = async (): Promise<DropdownItem[]> => {
  return [
    { id: "1", name: "Client 1" },
    { id: "2", name: "Client 2" },
    { id: "3", name: "Client 3" },
  ];
};
const fetchBuyers = async (): Promise<DropdownItem[]> => {
  return [
    { id: "1", name: "Buyer 1" },
    { id: "2", name: "Buyer 2" },
    { id: "3", name: "Buyer 3" },
  ];
};
const addClient = async (name: string): Promise<DropdownItem> => {
  return { id: Date.now().toString(), name };
};
const addBuyer = async (name: string): Promise<DropdownItem> => {
  return { id: Date.now().toString(), name };
};

export default function QuotationDetails({
  quotationData,
  setQuotationData,
}: QuotationDetailsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuotationData({
      ...quotationData,
      [name]: value,
    });
  };

  const handleDropdownSelect = (field: string) => (item: DropdownItem) => {
    setQuotationData({
      ...quotationData,
      [field]: item.name,
    });
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* INPUT NAME */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-[600] text-gray-700"
        >
          Nombre
        </label>
        <Input
          id="name"
          name="name"
          value={quotationData.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
      </div>

      {/* INPUT CLIENT */}
      <div>
        <label
          htmlFor="client"
          className="block text-sm font-[600] text-gray-700"
        >
          Client
        </label>
        <Dropdown
          fetchItems={fetchClients}
          addItem={addClient}
          onSelect={handleDropdownSelect("client")}
        />
      </div>

      {/* INPUT BUYER */}
      <div>
        <label
          htmlFor="buyer"
          className="block text-sm font-[600] text-gray-700"
        >
          Buyer
        </label>
        <Dropdown
          fetchItems={fetchBuyers}
          addItem={addBuyer}
          onSelect={handleDropdownSelect("buyer")}
        />
      </div>
    </div>
  );
}
