"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/Button";
import type { Client } from "@/types/Client";
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
import { Pencil, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import SearchInput from "@/components/SearchInput";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const router = useRouter();

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
    router.push(`/clients/${client.id}`);
  };

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    } else if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "normal";
    }
    setSortConfig({ key, direction });
  };

  const getSortedClients = () => {
    if (!sortConfig) {
      return clients;
    }

    const sortedClients = [...clients];
    if (sortConfig.direction === "normal") {
      return sortedClients;
    }

    sortedClients.sort((a, b) => {
      if (sortConfig.key === "name") {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortConfig.key === "buyers") {
        const buyersA = a.buyers?.length || 0;
        const buyersB = b.buyers?.length || 0;
        if (buyersA < buyersB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (buyersA > buyersB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });

    return sortedClients;
  };

  const sortedClients = getSortedClients();

  const fetchSearchResults = async (searchTerm: string) => {
    const filteredClients: { id: number; name: string }[] = clients
      .filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map((client) => ({
        id: client.id,
        name: client.name,
      }));
    return adaptToDropdown(filteredClients, "id", "name");
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start w-[12vw]">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black mt-1">
              Clientes
            </h2>
          </div>
          <SearchInput
            placeholder="Buscar clientes"
            onSearch={fetchSearchResults}
            link="/clients"
          />
        </div>
      </div>
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
            <Table className="w-full bg-white">
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead
                    className="w-1/3 text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Nombre{" "}
                      {(sortConfig?.key === "name" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) || <ArrowUpDown size={14} />}
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-1/3 text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("buyers")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Cant. de Compradores{" "}
                      {(sortConfig?.key === "buyers" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) || <ArrowUpDown size={14} />}
                    </div>
                  </TableHead>
                  <TableHead className="w-1/3 text-primary font-[600] text-center select-none">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedClients.length > 0 ? (
                  sortedClients.map((client) => (
                    <TableRow key={client.id} className="text-sm text-center">
                      <TableCell className="font-[600] text-black">
                        {client.name}
                      </TableCell>
                      <TableCell>{client.buyers?.length || 0}</TableCell>
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
                      colSpan={3}
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
    </div>
  );
}
