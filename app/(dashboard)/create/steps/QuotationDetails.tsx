import React from "react";

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

  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* INPUT NAME*/}
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

      {/* INPUT CLIENTE */}
      {/* ESTE INPUT DEBE SER UN DROPDOWN CON UN BOTON DE + PARA CREAR UN CLIENTE EN EL CASO QUE NO EXISTA */}
      <div>
        <label
          htmlFor="client"
          className="block text-sm font-medium text-gray-700"
        >
          Client
        </label>
        <input
          type="text"
          id="client"
          name="client"
          value={quotationData.client}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter client name"
        />
      </div>

      {/* INPUT BUYER */}
      {/* ESTE INPUT DEBE SER UN DROPDOWN CON UN BOTON DE + PARA CREAR UN BUYER EN EL CASO QUE NO EXISTA */}
      <div>
        <label
          htmlFor="buyer"
          className="block text-sm font-medium text-gray-700"
        >
          Buyer
        </label>
        <input
          type="text"
          id="buyer"
          name="buyer"
          value={quotationData.buyer}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter buyer name"
        />
      </div>
      {quotationData.name + quotationData.buyer + quotationData.client}
    </div>
  );
}
