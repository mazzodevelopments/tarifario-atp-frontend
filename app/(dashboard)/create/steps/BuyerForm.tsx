import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface BuyerFormProps {
  onSubmit: (data: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
  }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
}

export const BuyerForm: React.FC<BuyerFormProps> = ({
  onSubmit,
  isLoading,
  closeDialog, // Nueva prop
}) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, lastname, email, phone, birthDate, address });
    if (closeDialog) {
      closeDialog();
    } // Cierra el diálogo después de enviar el formulario
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        placeholder="Nombre"
        label="Nombre"
        required
      />
      <Input
        type="text"
        value={lastname}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLastname(e.target.value)
        }
        placeholder="Apellido"
        label="Apellido"
        required
      />
      <Input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        placeholder="Email"
        label="Email"
        required
      />
      <Input
        type="tel"
        value={phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhone(e.target.value)
        }
        placeholder="Teléfono"
        label="Teléfono"
        required
      />
      <Input
        type="date"
        value={birthDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBirthDate(e.target.value)
        }
        placeholder="Fecha de Nacimiento"
        label="Fecha de Nacimiento"
        required
      />
      <Input
        type="text"
        value={address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value)
        }
        placeholder="Dirección"
        label="Dirección"
        required
      />
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
