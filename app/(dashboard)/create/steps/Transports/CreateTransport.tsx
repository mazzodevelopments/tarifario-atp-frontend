import type React from "react";
import { useState } from "react";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type {
  PortBondedWarehouse,
  AirportFreightCourier,
} from "@/app/(dashboard)/create/types";

type TransportType = "MARITIME_TERRESTRIAL" | "AIR_COURIER";

interface CreateTransportProps {
  onTransportCreated: (
    transportData: PortBondedWarehouse | AirportFreightCourier,
  ) => void;
}

export default function CreateTransport({
  onTransportCreated,
}: CreateTransportProps) {
  const [transportType, setTransportType] = useState<TransportType | null>(
    null,
  );
  const [maritimeData, setMaritimeData] = useState<
    Omit<PortBondedWarehouse, "id" | "total">
  >({
    transferToCustomsWarehouse: 0,
    deconsolidation: 0,
    movement: 0,
    administrativeCharges: 0,
    electronicSeal: 0,
    emptyContainerReturnBeforeDeadline: 0,
    lateReturnFee: 0,
    storageDays: 0,
    containerCleaning: 0,
    optionalCustody: 0,
    senasaVerification: 0,
    forwarder: {
      originCharges: 0,
      internationalFreightCost: 0,
      agpFee: 0,
      localCharges: 0,
      deconsolidationFee: 0,
      billOfLadingPayment: 0,
      providerPriceList: {},
    },
  });
  const [airData, setAirData] = useState<
    Omit<AirportFreightCourier, "id" | "total">
  >({
    edcadassaStayCostPerDay: 70,
    edcadassaStayDuration: 0,
    internationalFreightCost: 0,
    internationalInsurance: 0,
    administrativeCharges: 0,
    airwayBillCuttingFee: 0,
  });

  const handleTransportTypeSelect = (item: { id: string; name: string }) => {
    setTransportType(item.id === "1" ? "MARITIME_TERRESTRIAL" : "AIR_COURIER");
  };

  const calculateMaritimeTotal = (
    data: Omit<PortBondedWarehouse, "id" | "total">,
  ): number => {
    const mainTotal = Object.entries(data).reduce((sum, [key, value]) => {
      if (key !== "forwarder" && typeof value === "number") {
        return sum + value;
      }
      return sum;
    }, 0);

    const forwarderTotal = Object.values(data.forwarder).reduce(
      (sum, value) => {
        if (typeof value === "number") {
          return sum + value;
        }
        return sum;
      },
      0,
    );

    return mainTotal + forwarderTotal;
  };

  const handleMaritimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaritimeData((prev) => {
      let updatedData: Omit<PortBondedWarehouse, "id" | "total">;
      if (name.startsWith("forwarder.")) {
        const forwarderField = name.split(".")[1];
        updatedData = {
          ...prev,
          forwarder: {
            ...prev.forwarder,
            [forwarderField]: Number(value),
          },
        };
      } else {
        updatedData = { ...prev, [name]: Number(value) };
      }
      return updatedData;
    });
  };

  const calculateAirTotal = (
    data: Omit<AirportFreightCourier, "id" | "total">,
  ): number => {
    return Object.values(data).reduce((sum, value) => {
      if (typeof value === "number") {
        return sum + value;
      }
      return sum;
    }, 0);
  };

  const handleAirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAirData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (transportType === "MARITIME_TERRESTRIAL") {
      const newMaritimeData: PortBondedWarehouse = {
        id: Math.random().toString(36).slice(2, 9),
        ...maritimeData,
        total: calculateMaritimeTotal(maritimeData),
      };
      onTransportCreated(newMaritimeData);
    } else if (transportType === "AIR_COURIER") {
      const newAirData: AirportFreightCourier = {
        id: Math.random().toString(36).slice(2, 9),
        ...airData,
        total: calculateAirTotal(airData),
      };
      onTransportCreated(newAirData);
    }
  };

  const renderInputField = (
    key: string,
    value: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ) => (
    <div key={key} className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
      </label>
      <Input
        type="number"
        name={key}
        value={value}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );

  const renderMaritimeForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        Transporte Maritimo - Terrestre
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(maritimeData).map(([key, value]) => {
          if (key === "forwarder") {
            return Object.entries(value).map(([forwarderKey, forwarderValue]) =>
              renderInputField(
                `forwarder.${forwarderKey}`,
                forwarderValue as number,
                handleMaritimeChange,
              ),
            );
          }
          return renderInputField(key, value as number, handleMaritimeChange);
        })}
      </div>
      <div className="text-xl font-bold">
        Total: ${calculateMaritimeTotal(maritimeData).toFixed(2)}
      </div>
    </div>
  );

  const renderAirForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Transporte Aereo - Courier</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(airData).map(([key, value]) =>
          renderInputField(key, value, handleAirChange),
        )}
      </div>
      <div className="text-xl font-bold">
        Total: ${calculateAirTotal(airData).toFixed(2)}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Elegir Vía
        </label>
        <Dropdown
          fetchItems={async () => [
            { id: "1", name: "Maritimo - Terrestre" },
            { id: "2", name: "Air - Courier" },
          ]}
          onSelect={handleTransportTypeSelect}
        />
      </div>

      {transportType === "MARITIME_TERRESTRIAL" && renderMaritimeForm()}
      {transportType === "AIR_COURIER" && renderAirForm()}

      <div className="flex justify-end">
        <Button type="submit" className="bg-primary text-white">
          Add Transport
        </Button>
      </div>
    </form>
  );
}
