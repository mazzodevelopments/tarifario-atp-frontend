"use client";

import React, { ChangeEvent } from "react";
import { useState, useEffect, useCallback } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { Item } from "@/types/Item";
import type { CreatePurchaseData } from "@/types/PurchaseData";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Pencil } from "lucide-react";
import type { Supplier } from "@/types/Supplier";
import SupplierForm from "@/app/(dashboard)/create/[quotationId]/purchase-data/forms/SupplierForm";
import IncotermForm from "@/app/(dashboard)/create/[quotationId]/purchase-data/forms/IncotermForm";
import CurrencyForm from "@/app/(dashboard)/create/[quotationId]/purchase-data/forms/CurrencyForm";
import WeightUnitForm from "@/app/(dashboard)/create/[quotationId]/purchase-data/forms/WeightUnitForm";
import CityForm from "@/app/(dashboard)/create/[quotationId]/purchase-data/forms/CityForm";

interface CreatePurchaseProps {
  onPurchaseCreated: (purchaseData: CreatePurchaseData) => void;
  items: Item[];
  onCancel?: () => void;
}

interface CreatePurchaseDataForm {
  date: string;
  unitPrice: number;
  margin: number;
  appliedUnitPrice: number;
  unitWeight: number;
  totalWeight: number;
  additionalObservations: string;
  item: string;
  itemId: number | null;
  origin: string;
  originCity: string;
  originCountry: string;
  destination: string;
  destinationCity: string;
  destinationCountry: string;
  supplier: string;
  supplierId: number | null;
  currency: string;
  currencyId: number | null;
  weightUnit: string;
  weightUnitId: number | null;
  incoterm: string;
  incotermId: number | null;
  productionTime: number;
  dollarValue: number;
}

export default function CreatePurchase({
  onPurchaseCreated,
  items,
  onCancel,
}: CreatePurchaseProps) {
  const [formData, setFormData] = useState<CreatePurchaseDataForm>({
    date: new Date().toISOString().split("T")[0],
    item: "",
    itemId: null,
    origin: "",
    originCity: "",
    originCountry: "",
    destination: "",
    destinationCity: "",
    destinationCountry: "",
    supplier: "",
    supplierId: null,
    currency: "",
    dollarValue: 1,
    currencyId: null,
    unitPrice: 0,
    margin: 0,
    appliedUnitPrice: 0,
    productionTime: 0,
    unitWeight: 0,
    totalWeight: 0,
    weightUnit: "",
    weightUnitId: null,
    incoterm: "",
    incotermId: null,
    additionalObservations: "",
  });
  const [errors, setErrors] = useState({
    date: "",
    item: "",
    origin: "",
    destination: "",
    supplier: "",
    currency: "",
    unitPrice: "",
    margin: "",
    productionTime: "",
    unitWeight: "",
    weightUnit: "",
    incoterm: "",
  });

  const [isOriginModalOpen, setIsOriginModalOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isWithinArgentina =
    formData.originCountry === "Argentina" &&
    formData.destinationCountry === "Argentina";

  // CALCULO DEL PESO
  useEffect(() => {
    if (formData.itemId && formData.unitWeight) {
      const selectedItem = items.find((item) => item.id === formData.itemId);
      setFormData((prev) => ({
        ...prev,
        totalWeight: prev.unitWeight * (selectedItem?.quantity || 1),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        totalWeight: 0,
      }));
    }
  }, [formData.itemId, formData.unitWeight, items]);

  // CALCULO TOTAL PRECIO UNITARIO
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      appliedUnitPrice:
        prev.unitPrice * (1 + prev.margin / 100) * prev.dollarValue,
    }));
  }, [formData.unitPrice, formData.margin, formData.dollarValue]);

  const validateForm = () => {
    const newErrors = {
      date: "",
      item: "",
      origin: "",
      destination: "",
      supplier: "",
      currency: "",
      unitPrice: "",
      margin: "",
      appliedUnitPrice: "",
      productionTime: "",
      unitWeight: "",
      weightUnit: "",
      incoterm: "",
    };
    let isValid = true;

    if (!formData.date) {
      newErrors.date = "La fecha es requerida";
      isValid = false;
    }

    if (!formData.itemId) {
      newErrors.item = "El item es requerido";
      isValid = false;
    }

    if (!formData.origin) {
      newErrors.origin = "El origen es requerido";
      isValid = false;
    }

    if (!formData.destination) {
      newErrors.destination = "El destino es requerido";
      isValid = false;
    }

    if (!formData.supplierId) {
      newErrors.supplier = "El proveedor es requerido";
      isValid = false;
    }

    if (!formData.currencyId) {
      newErrors.currency = "La moneda es requerida";
      isValid = false;
    }

    if (formData.unitPrice <= 0) {
      newErrors.unitPrice = "El precio unitario debe ser mayor a 0";
      isValid = false;
    }

    if (formData.margin < 0 || formData.margin > 100) {
      newErrors.margin = "El margen debe estar entre 0 y 100";
      isValid = false;
    }

    if (formData.appliedUnitPrice <= 0) {
      newErrors.appliedUnitPrice =
        "El precio unitario aplicado debe ser mayor a 0";
      isValid = false;
    }

    if (formData.productionTime <= 0) {
      newErrors.productionTime = "El tiempo de producción debe ser mayor a 0";
      isValid = false;
    }

    if (formData.unitWeight <= 0) {
      newErrors.unitWeight = "El peso unitario debe ser mayor a 0";
      isValid = false;
    }

    if (!formData.weightUnitId) {
      newErrors.weightUnit = "La unidad de peso es requerida";
      isValid = false;
    }

    if (!isWithinArgentina && !formData.incotermId) {
      newErrors.incoterm = "El incoterm es requerido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const purchaseData: CreatePurchaseData = {
      date: formData.date,
      unitPrice: formData.unitPrice,
      margin: formData.margin,
      appliedUnitPrice: formData.appliedUnitPrice,
      unitWeight: formData.unitWeight,
      totalWeight: formData.totalWeight,
      additionalObservations: formData.additionalObservations,
      productionTime: formData.productionTime,
      itemId: formData.itemId,
      origin: formData.origin,
      destination: formData.destination,
      supplierId: formData.supplierId,
      currencyId: formData.currencyId,
      weightUnitId: formData.weightUnitId,
      incotermId: formData.incotermId,
    };
    onPurchaseCreated(purchaseData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" && value !== "" ? Math.max(0, Number(value)) : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSelect =
    (field: keyof CreatePurchaseDataForm) => (item: DropdownItem | null) => {
      if (field === "originCountry") {
        setFormData((prev) => ({
          ...prev,
          originCountry: item?.name || "",
          originCity: "", // RESET CITY WHEN COUNTRY CHANGES
        }));
      } else if (field === "destinationCountry") {
        setFormData((prev) => ({
          ...prev,
          destinationCountry: item?.name || "",
          destinationCity: "", // RESET CITY WHEN COUNTRY CHANGES
        }));
      } else if (field === "originCity") {
        setFormData((prev) => ({
          ...prev,
          originCity: item?.name || "",
        }));
      } else if (field === "destinationCity") {
        setFormData((prev) => ({
          ...prev,
          destinationCity: item?.name || "",
        }));
      } else if (field === "currency") {
        setFormData((prev) => ({
          ...prev,
          currency: item?.name || "",
          currencyId: item?.id || null,
          dollarValue:
            (item as { name: string; id: number; dollarValue: number })
              ?.dollarValue || 1,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [field]: item?.name || "",
          [`${field}Id`]: item?.id || null,
        }));
      }
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

  const fetchSuppliers = useCallback(async () => {
    const suppliers = await CatalogService.listSuppliers();
    return adaptToDropdown(suppliers, "id", "name");
  }, []);

  const fetchCurrencies = useCallback(async () => {
    const currencies = await CatalogService.listCurrencies();
    return currencies.map((currency) => ({
      id: currency.id,
      name: currency.abbreviation,
      dollarValue: currency.dollarValue,
    }));
  }, []);

  const fetchWeightUnits = useCallback(async () => {
    const weightUnits = await CatalogService.listWeightUnits();
    return adaptToDropdown(weightUnits, "id", "name");
  }, []);

  const fetchIncoterms = useCallback(async () => {
    const incoterms = await CatalogService.listIncoterms();
    return adaptToDropdown(incoterms, "id", "abbreviation");
  }, []);

  const fetchItems = useCallback(async () => {
    return adaptToDropdown(items, "id", "detail");
  }, [items]);

  const handleOriginSave = (data: { city: string; country: string }) => {
    const newOrigin = data.city
      ? `${data.city}, ${data.country}`
      : data.country;

    setFormData((prev) => ({
      ...prev,
      origin: newOrigin,
      originCity: data.city,
      originCountry: data.country,
    }));
    setIsOriginModalOpen(false);
  };

  const handleDestinationSave = (data: { city: string; country: string }) => {
    const newDestination = data.city
      ? `${data.city}, ${data.country}`
      : data.country;

    setFormData((prev) => ({
      ...prev,
      destination: newDestination,
      destinationCity: data.city,
      destinationCountry: data.country,
    }));
    setIsDestinationModalOpen(false);
  };

  const handleAddSupplier = async (newSupplier: Supplier) => {
    if (!newSupplier) return;
    try {
      setIsLoading(true);
      const addedSupplier = await CatalogService.addSupplier(newSupplier);

      const supplierId =
        addedSupplier.id !== undefined ? addedSupplier.id : null;

      setFormData((prevData) => ({
        ...prevData,
        supplier: addedSupplier.name,
        supplierId: supplierId,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error("Error adding new supplier:", error);
      setIsLoading(false);
    }
  };

  const handleAddIncoterm = async (newIncoterm: {
    name: string;
    abbreviation: string;
  }) => {
    if (!newIncoterm) return;
    try {
      setIsLoading(true);
      const addedIncoterm = await CatalogService.addIncoterm(newIncoterm);

      const incotermId =
        addedIncoterm.id !== undefined ? addedIncoterm.id : null;

      setFormData((prevData) => ({
        ...prevData,
        incoterm: addedIncoterm.abbreviation,
        incotermId: incotermId,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error("Error adding new incoterm:", error);
      setIsLoading(false);
    }
  };

  const handleAddCurrency = async (newCurrency: {
    name: string;
    abbreviation: string;
    dollarValue: number;
  }) => {
    if (!newCurrency) return;
    try {
      setIsLoading(true);
      const addedCurrency = await CatalogService.addCurrency(newCurrency);

      const currencyId =
        addedCurrency.id !== undefined ? addedCurrency.id : null;

      setFormData((prevData) => ({
        ...prevData,
        currency: addedCurrency.abbreviation,
        currencyId: currencyId,
        dollarValue: addedCurrency.dollarValue || 1,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error("Error adding new currency:", error);
      setIsLoading(false);
    }
  };

  const handleAddWeightUnit = async (newWeightUnit: {
    name: string;
    kgValue: number;
  }) => {
    if (!newWeightUnit) return;
    try {
      setIsLoading(true);
      const addedWeightUnit = await CatalogService.addWeightUnit(newWeightUnit);

      const weightUnitId =
        addedWeightUnit.id !== undefined ? addedWeightUnit.id : null;

      setFormData((prevData) => ({
        ...prevData,
        weightUnit: addedWeightUnit.name,
        weightUnitId: weightUnitId,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error("Error adding new weight unit:", error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        label="Fecha"
        error={errors.date}
      />
      <Dropdown
        value={formData.item}
        fetchItems={fetchItems}
        onSelect={handleSelect("item")}
        label="Item"
        error={errors.item}
      />
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="block text-sm font-[600] text-gray-700">
            Origen
          </label>
          <Dialog open={isOriginModalOpen} onOpenChange={setIsOriginModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                className={`flex items-center gap-1 border ${formData.origin ? "bg-white border-gray-300 rounded-md font-medium" : "text-primary  border-primary/20 bg-primary/5 hover:text-primary-dark"}`}
                onClick={() => setIsOriginModalOpen(true)}
              >
                {formData.origin ? (
                  <span className="flex w-full justify-between mt-[1.5px]">
                    {formData.origin}
                    <Pencil size={16} />
                  </span>
                ) : (
                  <div className="flex gap-1 items-center mx-auto">
                    <PlusCircle size={16} />
                    <span className="mt-[1.5px]">
                      {formData.origin || "Agregar"}
                    </span>
                  </div>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Origen</DialogTitle>
              </DialogHeader>
              <CityForm
                onSubmit={(data) => {
                  setErrors((prevErrors) => ({ ...prevErrors, origin: "" }));
                  handleOriginSave(data);
                }}
                isLoading={isLoading}
                closeDialog={() => setIsOriginModalOpen(false)}
                initialData={{
                  city: formData.originCity,
                  country: formData.originCountry,
                }}
              />
            </DialogContent>
          </Dialog>
          {errors.origin && (
            <span className="text-xs mt-1 text-red-500">{errors.origin}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-[600] text-gray-700">
            L. Entrega
          </label>
          <Dialog
            open={isDestinationModalOpen}
            onOpenChange={setIsDestinationModalOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="primary"
                className={`flex items-center gap-1 border ${formData.destination ? "bg-white border-gray-300 rounded-md font-medium" : "text-primary  border-primary/20 bg-primary/5 hover:text-primary-dark"}`}
                onClick={() => setIsDestinationModalOpen(true)}
              >
                {formData.destination ? (
                  <span className="flex w-full justify-between mt-[1.5px]">
                    {formData.destination}
                    <Pencil size={16} />
                  </span>
                ) : (
                  <div className="flex gap-1 items-center mx-auto">
                    <PlusCircle size={16} />
                    <span className="mt-[1.5px]">
                      {formData.destination || "Agregar"}
                    </span>
                  </div>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Destino</DialogTitle>
              </DialogHeader>
              <CityForm
                onSubmit={(data) => {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    destination: "",
                  }));
                  handleDestinationSave(data);
                }}
                isLoading={isLoading}
                closeDialog={() => setIsDestinationModalOpen(false)}
                initialData={{
                  city: formData.destinationCity,
                  country: formData.destinationCountry,
                }}
              />
            </DialogContent>
          </Dialog>
          {errors.destination && (
            <span className="text-xs mt-1 text-red-500">
              {errors.destination}
            </span>
          )}
        </div>
        <Input
          type="number"
          name="productionTime"
          value={formData.productionTime}
          onChange={handleChange}
          label="Tiempo de Producción (Días)"
          error={errors.productionTime}
          min="0"
        />
      </div>
      <Dropdown
        value={formData.supplier}
        fetchItems={fetchSuppliers}
        customForm={
          <SupplierForm isLoading={isLoading} onSubmit={handleAddSupplier} />
        }
        onSelect={handleSelect("supplier")}
        label="Proovedor"
        error={errors.supplier}
      />
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          value={formData.currency}
          fetchItems={fetchCurrencies}
          customForm={
            <CurrencyForm isLoading={isLoading} onSubmit={handleAddCurrency} />
          }
          onSelect={handleSelect("currency")}
          label="Moneda"
          error={errors.currency}
        />
        <Input
          type="number"
          name="unitPrice"
          value={formData.unitPrice.toFixed(2)}
          onChange={handleChange}
          label="Precio Unitario Proovedor"
          min="0"
          error={errors.unitPrice}
        />
        {!isWithinArgentina && (
          <>
            <Input
              type="number"
              name="margin"
              value={formData.margin}
              onChange={handleChange}
              label="Margen (%)"
              min="0"
              max="100"
              error={errors.margin}
            />
            <Input
              type="number"
              name="appliedUnitPrice"
              value={formData.appliedUnitPrice.toFixed(2)}
              onChange={handleChange}
              label="Precio Unitario Aplicado (USD)"
              min="0"
              disabled
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="unitWeight"
          value={formData.unitWeight}
          onChange={handleChange}
          label="Peso Unitario"
          error={errors.unitWeight}
        />
        <Dropdown
          value={formData.weightUnit}
          fetchItems={fetchWeightUnits}
          customForm={
            <WeightUnitForm
              isLoading={isLoading}
              onSubmit={handleAddWeightUnit}
            />
          }
          onSelect={handleSelect("weightUnit")}
          label="Unidad de Peso"
          error={errors.weightUnit}
        />
        <div className="flex flex-col">
          <label className="block text-sm font-[600] text-gray-700">
            Peso Total
          </label>
          <Input
            type="text"
            name="totalWeight"
            value={`${formData.totalWeight} ${formData.weightUnit || ""}`.trim()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              // EXTRAE SOLAMENTE EL VALOR NUMERICO
              const numericValue = e.target.value.replace(/[^0-9.]/g, "");
              setFormData((prev) => ({
                ...prev,
                totalWeight: numericValue ? parseFloat(numericValue) : 0,
              }));
            }}
            disabled
          />
        </div>
      </div>
      <Dropdown
        value={formData.incoterm}
        fetchItems={fetchIncoterms}
        customForm={
          <IncotermForm isLoading={isLoading} onSubmit={handleAddIncoterm} />
        }
        onSelect={handleSelect("incoterm")}
        label="Incoterm"
        error={errors.incoterm}
        disabled={isWithinArgentina}
      />
      <Input
        type="text"
        name="additionalObservations"
        value={formData.additionalObservations}
        onChange={handleChange}
        label="Observaciones Adicionales"
        placeholder="Observaciones Adicionales"
        isTextArea
      />

      {isWithinArgentina && (
        <div className="flex items-center justify-center">
          <div className="py-1 px-3 rounded-3xl bg-orange-100 inline-block">
            <span className="text-sm font-[600] text-orange-600">Nacional</span>
          </div>
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
        <Button type="submit" variant="primary" className="text-white">
          Cargar Datos De Compra
        </Button>
      </div>
    </form>
  );
}
