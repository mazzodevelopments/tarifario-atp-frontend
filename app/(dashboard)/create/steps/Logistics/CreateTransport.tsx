import type React from "react";
import { useState, useEffect } from "react";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { PortBondedWarehouse } from "@/types/PortBondedWarehouse";
import type { AirportFreightCourier } from "@/types/AirportFreightCourier";

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
    movementCharges: 0,
    administrativeCharges: 0,
    electronicSeal: 0,
    emptyContainerReturnDaysBeforeDeadline: 0,
    lateReturnFee: 0,
    storageDays: 0,
    storageDayPrice: 0,
    storageDaysTotal: 0,
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
    },
  });
  const [airData, setAirData] = useState<
    Omit<AirportFreightCourier, "id" | "total">
  >({
    edcadassaStayCostPerDay: 70,
    edcadassaStayDuration: 0,
    edcadassaTotal: 0,
    internationalFreightCost: 0,
    internationalInsurance: 0,
    administrativeCharges: 0,
    airwayBillCuttingFee: 0,
  });

  useEffect(() => {
    setMaritimeData((prevData) => ({
      ...prevData,
      storageDaysTotal: prevData.storageDays * prevData.storageDayPrice,
    }));
  }, [maritimeData.storageDays, maritimeData.storageDayPrice]);

  useEffect(() => {
    setAirData((prevData) => ({
      ...prevData,
      edcadassaTotal:
        prevData.edcadassaStayCostPerDay * prevData.edcadassaStayDuration,
    }));
  }, [airData.edcadassaStayCostPerDay, airData.edcadassaStayDuration]);

  const handleTransportTypeSelect = (item: { id: string; name: string }) => {
    setTransportType(item.id === "1" ? "MARITIME_TERRESTRIAL" : "AIR_COURIER");
  };

  const calculateMaritimeTotal = (
    data: Omit<PortBondedWarehouse, "id" | "total">,
  ): number => {
    const mainTotal = Object.entries(data).reduce((sum, [key, value]) => {
      if (
        key !== "forwarder" &&
        key !== "storageDays" &&
        key !== "storageDayPrice" &&
        typeof value === "number"
      ) {
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
    const baseTotal =
      data.edcadassaTotal +
      data.administrativeCharges +
      data.airwayBillCuttingFee +
      data.internationalFreightCost;

    // Calculate insurance as percentage of freight cost
    const insuranceAmount =
      (data.internationalFreightCost * data.internationalInsurance) / 100;

    return baseTotal + insuranceAmount;
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
    let total = 0;
    if (transportType === "MARITIME_TERRESTRIAL") {
      total = calculateMaritimeTotal(maritimeData);
      if (total === 0) {
        alert(
          "El valor total no puede ser 0. Por favor, complete los campos necesarios.",
        );
        return;
      }
      const newMaritimeData: PortBondedWarehouse = {
        id: Math.random().toString(36).slice(2, 9),
        ...maritimeData,
        total: total,
      };
      onTransportCreated(newMaritimeData);
    } else if (transportType === "AIR_COURIER") {
      total = calculateAirTotal(airData);
      if (total === 0) {
        alert(
          "El valor total no puede ser 0. Por favor, complete los campos necesarios.",
        );
        return;
      }
      const newAirData: AirportFreightCourier = {
        id: Math.random().toString(36).slice(2, 9),
        ...airData,
        total: total,
      };
      onTransportCreated(newAirData);
    }
  };

  const renderMaritimeForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">
        Transporte Maritimo - Terrestre
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="transferToCustomsWarehouse"
          value={maritimeData.transferToCustomsWarehouse}
          onChange={handleMaritimeChange}
          label="Traslado Depósito Fiscal"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="deconsolidation"
          value={maritimeData.deconsolidation}
          onChange={handleMaritimeChange}
          label="Desconsolidación"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="movementCharges"
          value={maritimeData.movementCharges}
          onChange={handleMaritimeChange}
          label="Movimiento"
          className="w-full"
          min={0}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          name="administrativeCharges"
          value={maritimeData.administrativeCharges}
          onChange={handleMaritimeChange}
          label="Cargos Administrativos"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="electronicSeal"
          value={maritimeData.electronicSeal}
          onChange={handleMaritimeChange}
          label="Precinto Electrónico"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="emptyContainerReturnDaysBeforeDeadline"
          value={maritimeData.emptyContainerReturnDaysBeforeDeadline}
          onChange={handleMaritimeChange}
          label="Días Libres Entrega Vacío"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="lateReturnFee"
          value={maritimeData.lateReturnFee}
          onChange={handleMaritimeChange}
          label="Costo Por Días Adicionales"
          className="w-full"
          min={0}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="storageDays"
          value={maritimeData.storageDays}
          onChange={handleMaritimeChange}
          label="Cantidad Días Almacenamiento"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="storageDayPrice"
          value={maritimeData.storageDayPrice}
          onChange={handleMaritimeChange}
          label="Precio Por Día"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="storageDaysTotal"
          value={maritimeData.storageDaysTotal}
          onChange={handleMaritimeChange}
          className="w-full"
          label="Total Días Almacenamiento"
          disabled
        />
        <Input
          type="number"
          name="containerCleaning"
          value={maritimeData.containerCleaning}
          onChange={handleMaritimeChange}
          label="Limpieza Contenedor"
          className="w-full"
          min={0}
          required
        />
        <Input
          type="number"
          name="optionalCustody"
          value={maritimeData.optionalCustody}
          onChange={handleMaritimeChange}
          label="Custodia (Opcional)"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="senasaVerification"
          value={maritimeData.senasaVerification}
          onChange={handleMaritimeChange}
          label="Verificación SENASA"
          className="w-full"
          min={0}
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">Fordwarder</h3>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="forwarder.originCharges"
          value={maritimeData.forwarder.originCharges}
          onChange={handleMaritimeChange}
          label="Gastos en Origen"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="forwarder.internationalFreightCost"
          value={maritimeData.forwarder.internationalFreightCost}
          onChange={handleMaritimeChange}
          label="Flete internacional"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="forwarder.agpFee"
          value={maritimeData.forwarder.agpFee}
          onChange={handleMaritimeChange}
          label="AGP"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="forwarder.localCharges"
          value={maritimeData.forwarder.localCharges}
          onChange={handleMaritimeChange}
          label="Gastos Locales"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="forwarder.deconsolidationFee"
          value={maritimeData.forwarder.deconsolidationFee}
          onChange={handleMaritimeChange}
          label="Desconsolidación"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="forwarder.billOfLadingPayment"
          value={maritimeData.forwarder.billOfLadingPayment}
          onChange={handleMaritimeChange}
          label="Pago BL"
          className="w-full"
          min={0}
        />
      </div>
      <div className="text-xl font-bold">
        Total: ${calculateMaritimeTotal(maritimeData).toFixed(2)}
      </div>
    </div>
  );

  const renderAirForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Transporte Aereo - Courier</h3>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="edcadassaStayCostPerDay"
          value={airData.edcadassaStayCostPerDay}
          className="w-full"
          label="Costo Por Día EDCADASSA"
          disabled
        />
        <Input
          type="number"
          name="edcadassaStayDuration"
          value={airData.edcadassaStayDuration}
          onChange={handleAirChange}
          label="Cantidad De Días EDCADASSA"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="edcadassaTotal"
          value={airData.edcadassaTotal}
          onChange={handleAirChange}
          label="Total EDCADASSA"
          className="w-full"
          disabled
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          name="internationalFreightCost"
          value={airData.internationalFreightCost}
          onChange={handleAirChange}
          label="Flete Internacional"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="internationalInsurance"
          value={airData.internationalInsurance}
          onChange={handleAirChange}
          label="Seguro Internacional (%)"
          min={0.4}
          step={0.1}
          max={100}
          className="w-full"
        />
        <Input
          type="number"
          name="administrativeCharges"
          value={airData.administrativeCharges}
          onChange={handleAirChange}
          label="Cargos Administrativos"
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          name="airwayBillCuttingFee"
          value={airData.airwayBillCuttingFee}
          onChange={handleAirChange}
          label="Corte De Guía Aerea"
          min={150}
          step={10}
          max={300}
          className="w-full"
        />
      </div>
      <div className="text-xl font-bold">
        Total: ${calculateAirTotal(airData).toFixed(2)}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Dropdown
          fetchItems={async () => [
            { id: "1", name: "Maritimo - Terrestre" },
            { id: "2", name: "Air - Courier" },
          ]}
          onSelect={handleTransportTypeSelect}
          label="Elegir Vía"
        />
      </div>
      {transportType === "MARITIME_TERRESTRIAL" && renderMaritimeForm()}
      {transportType === "AIR_COURIER" && renderAirForm()}

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary text-white"
          disabled={
            (transportType === "MARITIME_TERRESTRIAL" &&
              calculateMaritimeTotal(maritimeData) === 0) ||
            (transportType === "AIR_COURIER" &&
              calculateAirTotal(airData) === 0)
          }
        >
          Add Transport
        </Button>
      </div>
    </form>
  );
}
