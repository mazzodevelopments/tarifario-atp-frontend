import React, { useCallback, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { Country, City } from "country-state-city";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import parsePhoneNumberFromString from "libphonenumber-js";

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

export default function BuyerForm({
  onSubmit,
  isLoading,
  closeDialog,
}: BuyerFormProps) {
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

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    birthDate: "",
    street: "",
    streetNumber: "",
    country: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      birthDate: "",
      street: "",
      streetNumber: "",
      country: "",
      city: "",
      zipCode: "",
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "El apellido es requerido";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "El teléfono es requerido";
      isValid = false;
    } else {
      const phoneNumber = parsePhoneNumberFromString(formData.phone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        newErrors.phone =
          "El teléfono debe ser válido e incluir un código de región (ej: +52)";
        isValid = false;
      }
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es requerida";
      isValid = false;
    }

    if (!formData.street) {
      newErrors.street = "La calle es requerida";
      isValid = false;
    }

    if (!formData.streetNumber) {
      newErrors.streetNumber = "El número de calle es requerido";
      isValid = false;
    }

    if (!formData.country) {
      newErrors.country = "El país es requerido";
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = "La ciudad es requerida";
      isValid = false;
    }

    if (!formData.zipCode) {
      newErrors.zipCode = "El código postal es requerido";
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
          error={errors.name}
        />
        <Input
          type="text"
          value={formData.lastname}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          ) => handleChange("lastname", e.target.value)}
          placeholder="Apellido"
          label="Apellido"
          error={errors.lastname}
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
        error={errors.email}
      />
      <Input
        type="tel"
        value={formData.phone}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("phone", e.target.value)}
        placeholder="Teléfono"
        label="Teléfono"
        error={errors.phone}
      />
      <Input
        type="date"
        value={formData.birthDate}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("birthDate", e.target.value)}
        placeholder="Fecha de Nacimiento"
        label="Fecha de Nacimiento"
        error={errors.birthDate}
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
          error={errors.street}
        />
        <Input
          type="string"
          value={formData.streetNumber}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          ) => handleChange("streetNumber", e.target.value)}
          placeholder="Número"
          label="Número"
          error={errors.streetNumber}
        />
      </div>
      <Dropdown
        value={formData.country}
        fetchItems={fetchCountries}
        onSelect={(item) => handleChange("country", item.name)}
        label="País"
        error={errors.country}
      />
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          value={formData.city}
          fetchItems={() => fetchCities(formData.country)}
          onSelect={(item) => handleChange("city", item.name)}
          label="Ciudad"
          error={errors.city}
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
          error={errors.zipCode}
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
}
