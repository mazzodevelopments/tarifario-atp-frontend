import React from "react";
import { useState, useEffect } from "react";
import {
  COUNTRIES,
  INCOTERMS,
  UNITS,
  CURRENCIES,
} from "@/app/(dashboard)/create/data";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  Item,
  Budget,
  PortBondedWarehouse,
  AirportFreightCourier,
} from "@/app/(dashboard)/create/types";
import CreateCustom from "@/app/(dashboard)/create/steps/Customs/CreateCustom";
import CreateTransport from "@/app/(dashboard)/create/steps/Transports/CreateTransport";

interface CreateBudgetProps {
  onBudgetCreated: (budget: Budget) => void;
  items: Item[];
  onCancel?: () => void;
}

export default function CreateBudget({
  onBudgetCreated,
  items,
  onCancel,
}: CreateBudgetProps) {
  const [formData, setFormData] = useState<Omit<Budget, "id">>({
    date: new Date().toISOString().split("T")[0],
    item: "",
    origin: "",
    destination: "",
    supplier: "",
    deliveryTime: 0,
    unitPrice: 0,
    currency: "",
    margin: 0,
    unitWeight: 0,
    totalWeight: 0,
    totalPrice: 0,
    unit: "",
    incoterm: "",
    custom: null,
    transport: null,
    delivery: null,
    numbering: "",
    stage: "COTI",
  });
  const [selectedItemQuantity, setSelectedItemQuantity] = useState<number>(0);
  const [buttonsState, setButtonsState] = useState({
    transport: false,
    customs: false,
    delivery: false,
  });
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);

  const isWithinArgentina =
    formData.origin === "Argentina" && formData.destination === "Argentina";

  // CALCULO TOTAL DEL PESO
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalWeight: prev.unitWeight * selectedItemQuantity,
    }));
  }, [formData.unitWeight, selectedItemQuantity]);

  // CALCULO DE TOTAL
  useEffect(() => {
    const basePrice = formData.unitPrice * selectedItemQuantity;
    const marginMultiplier = 1 + formData.margin / 100;
    const calculatedTotalPrice = basePrice * marginMultiplier;
    setFormData((prev) => ({
      ...prev,
      totalPrice: calculatedTotalPrice,
    }));
  }, [formData.unitPrice, selectedItemQuantity, formData.margin]);

  useEffect(() => {
    if (isWithinArgentina) {
      setButtonsState({
        transport: false,
        customs: false,
        delivery: true,
      });
      setFormData((prev) => ({
        ...prev,
        incoterm: "",
        transport: null,
        custom: null,
      }));
      return;
    }

    const updateButtonStates = (incoterm: string) => {
      switch (incoterm) {
        case "EXW":
          setButtonsState({ transport: true, customs: true, delivery: true });
          break;
        case "FOB":
          setButtonsState({ transport: true, customs: true, delivery: true });
          break;
        case "FCA":
          setButtonsState({ transport: false, customs: true, delivery: false });
          break;
        case "CIF":
          setButtonsState({ transport: false, customs: true, delivery: true });
          break;
        case "CFR":
          setButtonsState({ transport: false, customs: true, delivery: true });
          break;
        case "DAT":
          setButtonsState({ transport: false, customs: false, delivery: true });
          break;
        case "DAP":
          setButtonsState({ transport: false, customs: false, delivery: true });
          break;
        case "DDP":
          setButtonsState({
            transport: false,
            customs: false,
            delivery: false,
          });
          break;
        default:
          setButtonsState({
            transport: false,
            customs: false,
            delivery: false,
          });
      }
    };

    updateButtonStates(formData.incoterm);
  }, [
    formData.incoterm,
    formData.origin,
    formData.destination,
    isWithinArgentina,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // CHECKEO DE QUE LOS INPUTS NUMERICOS TENGAN VALORES
    const requiredNumericFields = [
      "deliveryTime",
      "unitPrice",
      "margin",
      "unitWeight",
    ];
    const hasEmptyFields = requiredNumericFields.some(
      (field) => !formData[field as keyof typeof formData],
    );

    if (hasEmptyFields) {
      alert("Please fill in all required fields with non-zero values.");
      return;
    }

    const newBudget: Budget = {
      id: Math.random().toString(36).slice(2, 9),
      ...formData,
    };
    onBudgetCreated(newBudget);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    let numericValue: string | number = value;

    if (type === "number") {
      const parsedValue = Number.parseFloat(value);
      numericValue = isNaN(parsedValue) ? "" : Math.max(0, parsedValue);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSelect = (field: keyof Budget) => (item: DropdownItem) => {
    setFormData((prev) => ({ ...prev, [field]: item.name }));

    if (field === "item") {
      const selectedItem = items.find((i) => i.detail === item.name);
      if (selectedItem) {
        setSelectedItemQuantity(selectedItem.quantity);
      }
    }
  };

  const fetchSuppliers = async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Proveedor A" },
      { id: "2", name: "Proveedor B" },
      { id: "3", name: "Proveedor C" },
    ];
  };

  const addSupplier = async (name: string): Promise<DropdownItem> => {
    return { id: Math.random().toString(36).substr(2, 9), name };
  };

  const fetchItems = async (): Promise<DropdownItem[]> => {
    return items.map((item) => {
      return { id: item.id, name: item.detail };
    });
  };

  const fetchLocations = async (): Promise<DropdownItem[]> => {
    return COUNTRIES;
  };

  const fetchIncoterms = async (): Promise<DropdownItem[]> => {
    return INCOTERMS;
  };

  const fetchUnits = async (): Promise<DropdownItem[]> => {
    return UNITS;
  };

  const fetchCurrencies = async (): Promise<DropdownItem[]> => {
    return CURRENCIES;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        label="Fecha"
        required
      />
      <Dropdown
        value={formData.item}
        fetchItems={fetchItems}
        onSelect={handleSelect("item")}
        label="Item"
        required
      />
      <div className="grid grid-cols-3 gap-4">
        <Dropdown
          value={formData.origin}
          fetchItems={fetchLocations}
          onSelect={handleSelect("origin")}
          label="Origen"
          required
        />
        <Dropdown
          value={formData.destination}
          fetchItems={fetchLocations}
          onSelect={handleSelect("destination")}
          label="Destino"
          required
        />
        <Input
          type="number"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          label="Tiempo de Entrega (Días)"
          required
          min="0"
          step="1"
        />
      </div>
      <Dropdown
        value={formData.supplier}
        addItem={addSupplier}
        fetchItems={fetchSuppliers}
        onSelect={handleSelect("supplier")}
        label="Proovedor"
        required
      />

      <div className="grid grid-cols-4 gap-4">
        <Input
          type="number"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          label="Precio Unitario"
          required
          min="0"
          step="10"
        />
        <Dropdown
          value={formData.currency}
          fetchItems={fetchCurrencies}
          onSelect={handleSelect("currency")}
          label="Moneda"
          required
        />
        <Input
          type="number"
          name="margin"
          value={formData.margin}
          onChange={handleChange}
          label="Margen (%)"
          required
          min="0"
          step="10"
        />
        <Input
          type="number"
          name="totalPrice"
          value={formData.totalPrice.toFixed(2)}
          label="Precio Total"
          disabled
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="unitWeight"
          value={formData.unitWeight}
          onChange={handleChange}
          label="Peso Unitario"
          required
          min="0"
          step="10"
        />
        <Dropdown
          value={formData.unit}
          fetchItems={fetchUnits}
          onSelect={handleSelect("unit")}
          label="Unidad"
          required
        />
        <Input
          type="number"
          name="totalWeight"
          value={formData.totalWeight}
          onChange={handleChange}
          label="Peso Total"
          disabled
        />
      </div>
      <Dropdown
        value={formData.incoterm}
        fetchItems={fetchIncoterms}
        onSelect={handleSelect("incoterm")}
        label="Incoterm"
        required
        disabled={isWithinArgentina}
      />
      <Input
        type="text"
        name="numbering"
        value={formData.numbering}
        onChange={handleChange}
        label="Numeración"
        placeholder="Ej: 0000000001"
      />

      <div className="grid grid-cols-3 gap-4">
        {formData.transport?.total && (
          <div>
            <label
              htmlFor="transportTotal"
              className="block text-sm font-semibold text-gray-700"
            >
              Precio Total Transporte
            </label>
            <span className="font-[600] text-xl">
              ${formData.transport.total.toFixed(2)}
            </span>
          </div>
        )}

        {formData.custom?.total && (
          <div>
            <label
              htmlFor="customTotal"
              className="block text-sm font-semibold text-gray-700"
            >
              Precio Total Gastos de Aduana
            </label>
            <span className="font-[600] text-xl">
              ${formData.custom.total.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <div className="flex gap-3">
          <Button
            type="button"
            className={`text-sm ${
              formData.transport === null
                ? "bg-primary/10 text-primary"
                : "bg-orange-100 text-orange-500"
            }`}
            disabled={!buttonsState.transport}
            onClick={() => {
              setIsTransportModalOpen(true);
            }}
          >
            {formData.transport === null
              ? "+Agregar Transporte"
              : "Editar Transporte"}
          </Button>
          <Button
            type="button"
            className={`text-sm ${
              formData.custom === null
                ? "bg-primary/10 text-primary"
                : "bg-orange-100 text-orange-500"
            }`}
            disabled={!buttonsState.customs}
            onClick={() => setIsCustomModalOpen(true)}
          >
            {formData.custom === null ? "+Agregar Aduana" : "Editar Aduana"}
          </Button>
          <Button
            type="button"
            className="text-sm bg-primary/10 text-primary"
            disabled={!buttonsState.delivery}
          >
            + Agregar Entrega
          </Button>
        </div>
      </div>

      {isWithinArgentina && (
        <div className="flex items-center justify-center">
          <span className="text-sm font-[600] text-orange-500">Nacional</span>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          className="text-sm"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit" className="text-sm bg-primary text-white">
          Crear Presupuesto
        </Button>
      </div>

      <Dialog open={isCustomModalOpen} onOpenChange={setIsCustomModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Agregar Gasto de Aduana
            </DialogTitle>
          </DialogHeader>
          <CreateCustom
            onCustomCreated={(newCustom) => {
              setFormData((prev) => ({
                ...prev,
                custom: newCustom,
              }));
              setIsCustomModalOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isTransportModalOpen}
        onOpenChange={setIsTransportModalOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar Transporte</DialogTitle>
          </DialogHeader>
          <CreateTransport
            onTransportCreated={(
              transportData: PortBondedWarehouse | AirportFreightCourier,
            ) => {
              setFormData((prev) => ({
                ...prev,
                transport: transportData,
              }));
              setIsTransportModalOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </form>
  );
}
