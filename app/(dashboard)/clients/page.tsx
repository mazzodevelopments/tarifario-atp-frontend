"use client";

import { useState } from "react";
import Header from "@/app/(dashboard)/components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import { Mail, Phone, Pin } from "lucide-react";

interface Client {
  id: number;
  nombre: string;
  mail: string;
  direccion: string;
  telefono: string;
  buyers?: { id: number; name: string; email: string; phone: string }[];
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      nombre: "Cliente A",
      mail: "contacto@empresaa.com",
      direccion: "Calle Principal 123",
      telefono: "1234567890",
      buyers: [
        {
          id: 1,
          name: "Buyer A",
          email: "buyerA@example.com",
          phone: "111-222-3333",
        },
      ],
    },
    {
      id: 2,
      nombre: "Cliente A",
      mail: "contacto@empresaa.com",
      direccion: "Calle Principal 123",
      telefono: "1234567890",
      buyers: [
        {
          id: 1,
          name: "Buyer A",
          email: "buyerA@example.com",
          phone: "111-222-3333",
        },
      ],
    },
    {
      id: 3,
      nombre: "Cliente A",
      mail: "contacto@empresaa.com",
      direccion: "Calle Principal 123",
      telefono: "1234567890",
      buyers: [
        {
          id: 1,
          name: "Buyer A",
          email: "buyerA@example.com",
          phone: "111-222-3333",
        },
      ],
    },
  ]);

  const [nuevoCliente, setNuevoCliente] = useState<Omit<Client, "id">>({
    nombre: "",
    mail: "",
    direccion: "",
    telefono: "",
    buyers: [],
  });

  const [clienteEditando, setClienteEditando] = useState<Client | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [nuevoBuyer, setNuevoBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clienteEditando) {
      setClients(
        clients.map((c) =>
          c.id === clienteEditando.id ? { ...clienteEditando } : c
        )
      );
      setClienteEditando(null);
    } else {
      setClients([...clients, { id: Date.now(), ...nuevoCliente }]);
      setNuevoCliente({
        nombre: "",
        mail: "",
        direccion: "",
        telefono: "",
        buyers: [],
      });
    }
    setDialogOpen(false);
    setEditDialogOpen(false);
  };

  const handleEdit = (client: Client) => {
    setClienteEditando(client);
    setEditDialogOpen(true);
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header title="Clientes" description="Lista de clientes oficiales" />
      <div className="mt-6 px-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="text-white">Agregar Cliente</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium mb-1"
                  >
                    Nombre
                  </label>
                  <Input
                    id="nombre"
                    value={nuevoCliente.nombre}
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        nombre: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mail"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="mail"
                    type="email"
                    value={nuevoCliente.mail}
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        mail: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="direccion"
                    className="block text-sm font-medium mb-1"
                  >
                    Dirección
                  </label>
                  <Input
                    id="direccion"
                    value={nuevoCliente.direccion}
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        direccion: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium mb-1"
                  >
                    Teléfono
                  </label>
                  <Input
                    id="telefono"
                    value={nuevoCliente.telefono}
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        telefono: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="text-white text-center justify-center w-full"
              >
                Guardar Cliente
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-6 px-6 pb-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-6 rounded-[16px] border border-neutral-200 shadow-sm space-y-4"
          >
            <div>
              <h3 className="text-xl font-semibold">{client.nombre}</h3>
              <div className="flex flex-col gap-2 mt-2 space-y-1 text-sm text-gray-600">
                <p className="flex gap-2 items-center">
                  <Mail size={18} /> {client.mail}
                </p>
                <p className="flex gap-2 items-center">
                  <Pin size={18} /> {client.direccion}
                </p>
                <p className="flex gap-2 items-center">
                  <Phone size={18} /> {client.telefono}
                </p>
              </div>
            </div>
            <div className="flex justify-end w-full gap-2">
              <Button variant="secondary" onClick={() => handleEdit(client)}>
                Editar
              </Button>
              <Button variant="primary" className="text-white">
                Cotizaciones
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          {clienteEditando && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="edit-nombre"
                    className="block text-sm font-medium mb-1"
                  >
                    Nombre
                  </label>
                  <Input
                    id="edit-nombre"
                    value={clienteEditando.nombre}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        nombre: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-mail"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="edit-mail"
                    type="email"
                    value={clienteEditando.mail}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        mail: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-direccion"
                    className="block text-sm font-medium mb-1"
                  >
                    Dirección
                  </label>
                  <Input
                    id="edit-direccion"
                    value={clienteEditando.direccion}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        direccion: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-telefono"
                    className="block text-sm font-medium mb-1"
                  >
                    Teléfono
                  </label>
                  <Input
                    id="edit-telefono"
                    value={clienteEditando.telefono}
                    onChange={(e) =>
                      setClienteEditando({
                        ...clienteEditando,
                        telefono: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Compradores</h4>
                {clienteEditando.buyers?.map((buyer, index) => (
                  <div key={buyer.id} className="flex items-center space-x-2">
                    <Input
                      value={buyer.name}
                      onChange={(e) => {
                        const updatedBuyers = [...clienteEditando.buyers!];
                        updatedBuyers[index] = {
                          ...buyer,
                          name: e.target.value,
                        };
                        setClienteEditando({
                          ...clienteEditando,
                          buyers: updatedBuyers,
                        });
                      }}
                    />
                    <Input
                      type="email"
                      value={buyer.email}
                      onChange={(e) => {
                        const updatedBuyers = [...clienteEditando.buyers!];
                        updatedBuyers[index] = {
                          ...buyer,
                          email: e.target.value,
                        };
                        setClienteEditando({
                          ...clienteEditando,
                          buyers: updatedBuyers,
                        });
                      }}
                    />
                    <Input
                      value={buyer.phone}
                      onChange={(e) => {
                        const updatedBuyers = [...clienteEditando.buyers!];
                        updatedBuyers[index] = {
                          ...buyer,
                          phone: e.target.value,
                        };
                        setClienteEditando({
                          ...clienteEditando,
                          buyers: updatedBuyers,
                        });
                      }}
                    />
                    <Button
                      type="button"
                      variant="danger"
                      className="w-20 justify-center items-center"
                      onClick={() => {
                        setClienteEditando({
                          ...clienteEditando,
                          buyers: clienteEditando.buyers!.filter(
                            (_, i) => i !== index
                          ),
                        });
                      }}
                    >
                      X
                    </Button>
                  </div>
                ))}
                <div className="space-y-2">
                  <Input
                    placeholder="Nombre del comprador"
                    value={nuevoBuyer.name}
                    onChange={(e) =>
                      setNuevoBuyer({ ...nuevoBuyer, name: e.target.value })
                    }
                  />
                  <Input
                    type="email"
                    placeholder="Email del comprador"
                    value={nuevoBuyer.email}
                    onChange={(e) =>
                      setNuevoBuyer({ ...nuevoBuyer, email: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Teléfono del comprador"
                    value={nuevoBuyer.phone}
                    onChange={(e) =>
                      setNuevoBuyer({ ...nuevoBuyer, phone: e.target.value })
                    }
                  />
                  <Button
                    type="button"
                    className="w-full text-primary bg-primary/5 border border-primary justify-center items-center"
                    onClick={() => {
                      if (
                        nuevoBuyer.name &&
                        nuevoBuyer.email &&
                        nuevoBuyer.phone
                      ) {
                        setClienteEditando({
                          ...clienteEditando,
                          buyers: [
                            ...clienteEditando!.buyers!,
                            { id: Date.now(), ...nuevoBuyer },
                          ],
                        });
                        setNuevoBuyer({ name: "", email: "", phone: "" });
                      }
                    }}
                  >
                    Agregar Comprador
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="text-white text-center justify-center w-full"
              >
                Guardar Cambios
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
