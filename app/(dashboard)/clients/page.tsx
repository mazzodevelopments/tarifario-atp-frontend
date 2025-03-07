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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import ClientDetails from "@/app/(dashboard)/clients/ClientDetails"; // Asegúrate de importar el componente

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const fetchedClients = await CatalogService.listClientsWithBuyers();
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { buyers, ...clientData } = editedClient;
        await CatalogService.editClient({ ...clientData, ...data });
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

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setDetailDialogOpen(true);
  };

  const handleBuyerAdded = () => {
    setShouldFetch(true);
  };

  const handleCloseDetails = () => {
    setDetailDialogOpen(false);
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header title="Clientes" description="Lista de clientes oficiales" />
      <div className="mt-6 px-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="primary"
              className="py-2 px-4 rounded-lg font-semibold text-sm border bg-primary/5 text-primary"
            >
              Agregar Cliente
            </Button>
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

      <div className="w-full px-6 pb-6 pt-4">
        <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
          <div className="border rounded-[12px] overflow-auto max-h-[70vh] relative w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead className="text-primary font-[600] text-center">
                    Nombre
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Cant. de Compradores
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <TableRow key={client.id} className="text-sm text-center">
                      <TableCell className="font-[600] text-black">
                        {client.name}
                      </TableCell>
                      <TableCell className="font-[600] text-black">
                        {client.buyers?.length || 0}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => handleEdit(client)}
                          >
                            <Pencil className="w-4 h-4 text-primary" />
                          </Button>
                          <Button
                            variant="secondary"
                            className="p-1 h-auto hover:bg-gray-100"
                            onClick={() => handleViewDetails(client)}
                          >
                            Detalles
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-36">
                    <TableCell
                      colSpan={2}
                      className="text-sm m-auto h-full text-center text-gray-500"
                    >
                      No hay clientes registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
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

      {selectedClient && (
        <ClientDetails
          client={selectedClient}
          onClose={handleCloseDetails}
          onBuyerAdded={handleBuyerAdded}
          open={detailDialogOpen}
        />
      )}
    </div>
  );
}
