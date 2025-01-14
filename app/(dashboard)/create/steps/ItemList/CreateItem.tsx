"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { Item } from "@/app/(dashboard)/create/steps/ItemList/ItemList";
import Input from "@/components/Input";
import Dropdown, { DropdownItem } from "@/components/Dropdown";

const UNITS = ["Unidad", "Metro", "Kilogramo", "Litro", "Pieza"];
const INCOTERMS = ["EXW", "FOB", "FCA", "CIF", "CFR", "DAT", "DAP", "DDP"];

interface CreateItemProps {
  onItemCreated: (item: Item) => void;
  onCancel: () => void;
}

export default function CreateItem({
  onItemCreated,
  onCancel,
}: CreateItemProps) {
  const [formData, setFormData] = useState({
    detail: "",
    brand: "",
    quantity: "",
    unit: "",
    partNumber: "",
    incoterm: "",
    pickup: false,
    pickupPrice: 180,
    repackaging: false,
    palletFumigation: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      quantity: Number(formData.quantity),
    };
    onItemCreated(newItem);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleBrandSelect = (item: DropdownItem) => {
    setFormData((prev) => ({ ...prev, brand: item.name }));
  };

  const fetchBrands = async (): Promise<DropdownItem[]> => {
    // Simular la obtención de marcas desde un servicio
    return [
      { id: "1", name: "Marca A" },
      { id: "2", name: "Marca B" },
      { id: "3", name: "Marca C" },
    ];
  };

  const addBrand = async (name: string): Promise<DropdownItem> => {
    // Simular la adición de una nueva marca
    return { id: Math.random().toString(36).substr(2, 9), name };
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-700"
        >
          Detalle
        </label>
        <Input
          type="text"
          id="detail"
          name="detail"
          value={formData.detail}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700"
        >
          Marca
        </label>
        <Dropdown
          fetchItems={fetchBrands}
          addItem={addBrand}
          onSelect={handleBrandSelect}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700"
          >
            Unidad de Medida
          </label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            className="w-full px-2 py-2 border rounded-md focus:outline-none text-sm"
          >
            <option value="">Seleccionar unidad</option>
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="partNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Part Number (PN)
        </label>
        <Input
          type="text"
          id="partNumber"
          name="partNumber"
          value={formData.partNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="incoterm"
          className="block text-sm font-medium text-gray-700"
        >
          Incoterm
        </label>
        <select
          id="incoterm"
          name="incoterm"
          value={formData.incoterm}
          onChange={handleChange}
          required
          className="w-full px-2 py-2 border rounded-md focus:outline-none text-sm"
        >
          <option value="">Seleccionar Incoterm</option>
          {INCOTERMS.map((incoterm) => (
            <option key={incoterm} value={incoterm}>
              {incoterm}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="pickup"
            name="pickup"
            checked={formData.pickup}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="pickup" className="text-sm font-medium text-gray-700">
            Pickup
          </label>
        </div>
        {formData.pickup && (
          <div>
            <label
              htmlFor="pickupPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Precio de Pickup (USD 180 - USD 650)
            </label>
            <Input
              type="number"
              id="pickupPrice"
              name="pickupPrice"
              min="180"
              max="650"
              value={formData.pickupPrice}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="repackaging"
            name="repackaging"
            checked={formData.repackaging}
            onChange={handleChange}
            className="mr-2"
          />
          <label
            htmlFor="repackaging"
            className="text-sm font-medium text-gray-700"
          >
            Reembalaje (USD 190)
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="palletFumigation"
            name="palletFumigation"
            checked={formData.palletFumigation}
            onChange={handleChange}
            className="mr-2"
          />
          <label
            htmlFor="palletFumigation"
            className="text-sm font-medium text-gray-700"
          >
            Fumigación de Pallet (USD 250)
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Agregar Item
        </Button>
      </div>
    </form>
  );
}
