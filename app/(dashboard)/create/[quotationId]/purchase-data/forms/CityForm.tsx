import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { Country, City } from "country-state-city";

interface CityFormProps {
  onSubmit: (data: { city: string; country: string }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
  initialData?: { city: string; country: string };
}

export default function CityForm({
  onSubmit,
  isLoading,
  closeDialog,
  initialData,
}: CityFormProps) {
  const [formData, setFormData] = useState({
    city: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    city: "",
    country: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = { city: "", country: "" };
    let isValid = true;

    if (!formData.country) {
      newErrors.country = "El país es requerido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
    closeDialog?.();
  };

  const fetchCountries = async () => {
    const countriesRaw = Country.getAllCountries();
    const countries = countriesRaw.map((country, acc) => {
      return { id: acc, name: country.name };
    });
    return countries;
  };

  const fetchCities = async (countryName: string) => {
    const country = Country.getAllCountries().find(
      (c) => c.name === countryName,
    );
    if (!country) return [];

    const cities = City.getCitiesOfCountry(country.isoCode) || [];
    return cities.map((city, i) => ({ id: i, name: city.name }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Dropdown
        value={formData.country}
        fetchItems={fetchCountries}
        onSelect={(item) => handleChange("country", item?.name || "")}
        label="País"
        error={errors.country}
      />
      <Dropdown
        value={formData.city}
        fetchItems={() => fetchCities(formData.country)}
        onSelect={(item) => handleChange("city", item?.name || "")}
        label="Ciudad"
        disabled={!formData.country}
      />

      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="secondary" onClick={closeDialog}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="px-2 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
