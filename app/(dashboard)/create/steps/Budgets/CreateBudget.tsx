import React, { useState, useEffect } from "react";
import { Item } from "@/app/(dashboard)/create/steps/Items/ItemList";
import { Budget } from "@/app/(dashboard)/create/types";
import {
  COUNTRIES,
  INCOTERMS,
  UNITS,
  CURRENCIES,
} from "@/app/(dashboard)/create/data";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { DialogClose } from "@/components/ui/dialog";

interface CreateBudgetProps {
  onBudgetCreated: (budget: Budget) => void;
  items: Item[];
}

export default function CreateBudget({
  onBudgetCreated,
  items,
}: CreateBudgetProps) {
  const [formData, setFormData] = useState<Omit<Budget, "id">>({
    date: new Date().toISOString().split("T")[0],
    item: "",
    origin: "",
    destination: "",
    supplier: "",
    deliveryTime: 0,
    unitPrice: 0,
    currency: 0,
    margin: 0,
    unitWeight: 0,
    totalWeight: 0,
    totalPrice: 0,
    unit: "",
    incoterm: "",
  });
  const [selectedItemQuantity, setSelectedItemQuantity] = useState<number>(0);
  const [buttonsState, setButtonsState] = useState({
    transport: false,
    customs: false,
    delivery: false,
  });

  // CALCULO DE PESO TOTAL
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalWeight: prev.unitWeight * selectedItemQuantity,
    }));
  }, [formData.unitWeight, selectedItemQuantity]);

  // CALCULO DEL PRECIO TOTAL CON MARGEN
  useEffect(() => {
    const basePrice = formData.unitPrice * selectedItemQuantity;
    const marginMultiplier = 1 + formData.margin / 100;
    const calculatedTotalPrice = basePrice * marginMultiplier;
    setFormData((prev) => ({
      ...prev,
      totalPrice: calculatedTotalPrice,
    }));
  }, [formData.unitPrice, selectedItemQuantity, formData.margin]);

  // HABILITACIÓN DE BOTONES
  useEffect(() => {
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
  }, [formData.incoterm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget: Budget = {
      id: Math.random().toString(36).slice(2, 9),
      ...formData,
    };
    onBudgetCreated(newBudget);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const numericValue = type === "number" ? parseFloat(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSelect = (field: keyof Budget) => (item: DropdownItem) => {
    setFormData((prev) => ({ ...prev, [field]: item.name }));

    // If selecting an item, update the selected item quantity
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
      <div>
        <label
          htmlFor="margin"
          className="block text-sm font-semibold text-gray-700"
        >
          Fecha
        </label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="item"
          className="block text-sm font-semibold text-gray-700"
        >
          Item
        </label>
        <Dropdown
          fetchItems={fetchItems}
          onSelect={handleSelect("item")}
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="origin"
            className="block text-sm font-semibold text-gray-700"
          >
            Origen
          </label>
          <Dropdown
            fetchItems={fetchLocations}
            onSelect={handleSelect("origin")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-semibold text-gray-700"
          >
            Destino
          </label>
          <Dropdown
            fetchItems={fetchLocations}
            onSelect={handleSelect("destination")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="deliveryTime"
            className="block text-sm font-semibold text-gray-700"
          >
            Tiempo de Entrega (Días)
          </label>
          <Input
            type="number"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="supplier"
          className="block text-sm font-semibold text-gray-700"
        >
          Proveedor
        </label>
        <Dropdown
          addItem={addSupplier}
          fetchItems={fetchSuppliers}
          onSelect={handleSelect("supplier")}
          required
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="unitPrice"
            className="block text-sm font-semibold text-gray-700"
          >
            Precio Unitario
          </label>
          <Input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-semibold text-gray-700"
          >
            Moneda
          </label>
          <Dropdown
            fetchItems={fetchCurrencies}
            onSelect={handleSelect("currency")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="margin"
            className="block text-sm font-semibold text-gray-700"
          >
            Margen (%)
          </label>
          <Input
            type="number"
            name="margin"
            value={formData.margin}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="totalPrice"
            className="block text-sm font-semibold text-gray-700"
          >
            Precio Total
          </label>
          <Input
            type="number"
            name="totalPrice"
            value={formData.totalPrice.toFixed(2)}
            disabled
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="unitWeight"
            className="block text-sm font-semibold text-gray-700"
          >
            Peso Unitario
          </label>
          <Input
            type="number"
            name="unitWeight"
            value={formData.unitWeight}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-semibold text-gray-700"
          >
            Unidad
          </label>
          <Dropdown
            fetchItems={fetchUnits}
            onSelect={handleSelect("unit")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="totalWeight"
            className="block text-sm font-semibold text-gray-700"
          >
            Peso Total
          </label>
          <Input
            type="number"
            name="totalWeight"
            value={formData.totalWeight}
            onChange={handleChange}
            disabled
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="incoterm"
          className="block text-sm font-semibold text-gray-700"
        >
          Incoterm
        </label>
        <Dropdown
          fetchItems={fetchIncoterms}
          onSelect={handleSelect("incoterm")}
          required
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="flex gap-3">
          <Button
            type="button"
            className="text-sm bg-primary/10 text-primary"
            disabled={!buttonsState.transport}
          >
            + Agregar Transporte
          </Button>
          <Button
            type="button"
            className="text-sm bg-primary/10 text-primary"
            disabled={!buttonsState.customs}
          >
            + Agregar Aduana
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

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="text-sm">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" className="text-sm bg-primary text-white">
            Crear Presupuesto
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}
