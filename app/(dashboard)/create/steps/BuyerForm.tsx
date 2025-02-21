import React, { useCallback, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { Country, City } from "country-state-city";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";

interface BuyerFormProps {
  onSubmit: (data: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    birthDate: string;
    street: string;
    streetNumber: string;
    country: string;
    city: string;
    zipCode: string;
  }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
}

export const BuyerForm: React.FC<BuyerFormProps> = ({
  onSubmit,
  isLoading,
  closeDialog,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    birthDate: new Date().toISOString().split("T")[0],
    street: "",
    streetNumber: "",
    country: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    closeDialog?.();
  };

  const fetchCountries = useCallback(async () => {
    const countriesRaw = Country.getAllCountries();
    const countries = countriesRaw.map((country, acc) => {
      return { id: acc, name: country.name };
    });
    return Promise.resolve(adaptToDropdown(countries, "id", "name"));
  }, []);

  const fetchCities = useCallback(async (countryName: string) => {
    const country = Country.getAllCountries().find(
      (c) => c.name === countryName,
    );
    if (!country) return Promise.resolve([]);

    const cities = City.getCitiesOfCountry(country.isoCode) || [];
    return Promise.resolve(
      adaptToDropdown(
        cities.map((city, i) => ({ id: i, name: city.name })),
        "id",
        "name",
      ),
    );
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          value={formData.name}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          ) => handleChange("name", e.target.value)}
          placeholder="Nombre"
          label="Nombre"
          required
        />
        <Input
          type="text"
          value={formData.lastname}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          ) => handleChange("lastname", e.target.value)}
          placeholder="Apellido"
          label="Apellido"
          required
        />
      </div>
      <Input
        type="email"
        value={formData.email}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("email", e.target.value)}
        placeholder="Email"
        label="Email"
        required
      />
      <Input
        type="tel"
        value={formData.phone}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("phone", e.target.value)}
        placeholder="Teléfono"
        label="Teléfono"
        required
      />
      <Input
        type="date"
        value={formData.birthDate}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("birthDate", e.target.value)}
        placeholder="Fecha de Nacimiento"
        label="Fecha de Nacimiento"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          value={formData.street}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          ) => handleChange("street", e.target.value)}
          placeholder="Calle"
          label="Calle"
          required
        />
        <Input
          type="string"
          value={formData.streetNumber}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          ) => handleChange("streetNumber", e.target.value)}
          placeholder="Número"
          label="Número"
          required
        />
      </div>
      <Dropdown
        value={formData.country}
        fetchItems={fetchCountries}
        onSelect={(item) => handleChange("country", item.name)}
        label="País"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          value={formData.city}
          fetchItems={() => fetchCities(formData.country)}
          onSelect={(item) => handleChange("city", item.name)}
          label="Ciudad"
          required
          disabled={!formData.country}
        />
        <Input
          type="text"
          value={formData.zipCode}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          ) => handleChange("zipCode", e.target.value)}
          placeholder="Código Postal"
          label="Código Postal"
          required
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="submit"
          variant="primary"
          className="px-2 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Agregando..." : "Agregar"}
        </Button>
      </div>
    </form>
  );
};
