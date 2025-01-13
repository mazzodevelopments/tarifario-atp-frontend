import React from "react";
import Dropdown from "@/components/Dropdown";

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

interface Item {
  id: string;
  name: string;
}

// Simulate a function to fetch clients from an API
const fetchClients = async (): Promise<Item[]> => {
  return [
    { id: "1", name: "Client 1" },
    { id: "2", name: "Client 2" },
    { id: "3", name: "Client 3" },
  ];
};

// Simulate a function to fetch buyers from an API
const fetchBuyers = async (): Promise<Item[]> => {
  return [
    { id: "1", name: "Buyer 1" },
    { id: "2", name: "Buyer 2" },
    { id: "3", name: "Buyer 3" },
  ];
};

// Simulate a function to add a new client through an API
const addClient = async (name: string): Promise<Item> => {
  // In a real application, this would be an API call
  return { id: Date.now().toString(), name };
};

// Simulate a function to add a new buyer through an API
const addBuyer = async (name: string): Promise<Item> => {
  // In a real application, this would be an API call
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

  const handleDropdownSelect = (field: string) => (item: Item) => {
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
          className="block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={quotationData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter name"
        />
      </div>

      {/* INPUT CLIENT */}
      <div>
        <label
          htmlFor="client"
          className="block text-sm font-medium text-gray-700"
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
          className="block text-sm font-medium text-gray-700"
        >
          Buyer
        </label>
        <Dropdown
          fetchItems={fetchBuyers}
          addItem={addBuyer}
          onSelect={handleDropdownSelect("buyer")}
        />
      </div>

      {quotationData.name + quotationData.buyer + quotationData.client}
    </div>
  );
}
