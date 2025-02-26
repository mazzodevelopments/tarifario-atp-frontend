"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/(dashboard)/components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/Button";
import { Client } from "@/types/Client";
import ClientForm from "@/app/(dashboard)/create/[quotationId]/quotation-details/forms/ClientForm";
import { CatalogService } from "@/services/CatalogService";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const fetchedClients = await CatalogService.listClients();
        setClients(fetchedClients);
        setShouldFetch(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    if (shouldFetch) {
      fetchClients();
    }
  }, [shouldFetch]);

  const handleSubmit = async (data: { name: string }) => {
    setIsLoading(true);
    try {
      if (editedClient) {
        await CatalogService.editClient({ ...editedClient, ...data });
      } else {
        await CatalogService.addClient(data);
      }
      setEditedClient(null);
      setEditDialogOpen(false);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving client:", error);
    } finally {
      setIsLoading(false);
      setShouldFetch(true);
    }
  };

  const handleEdit = (client: Client) => {
    setEditedClient(client);
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
            </DialogHeader>
            <ClientForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              closeDialog={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-4 rounded-[16px] border border-neutral-200 shadow-sm"
          >
            <h3 className="font-semibold">{client.name}</h3>
            <p className="text-sm text-gray-600">
              Cantidad de cotizaciones: 12
            </p>
            <div className="flex justify-end w-full gap-2 mt-2">
              <Button variant="secondary" onClick={() => handleEdit(client)}>
                Editar
              </Button>
              <Button variant="primary" className="text-white">
                Detalles
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          <ClientForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            initialData={editedClient || undefined}
            closeDialog={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
