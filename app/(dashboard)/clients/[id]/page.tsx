"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CatalogService } from "@/services/CatalogService";
import { AlertTriangle, Trash } from "lucide-react";
import { Client } from "@/types/Client";
import BuyerForm from "@/app/(dashboard)/create/[quotationId]/quotation-details/forms/BuyerForm";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import Header from "@/app/(dashboard)/components/Header";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function ClientDetailsPage() {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [buyerToDelete, setBuyerToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isBuyerFormOpen, setIsBuyerFormOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        console.log(id);
        const fetchedClient = await CatalogService.getClientById(Number(id));
        setClient(fetchedClient);
      } catch (error) {
        console.error("Error fetching client:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleAddBuyer = async (data: {
    phone: string;
    name: string;
    lastname: string;
    email: string;
    birthDate: string;
    street: string;
    streetNumber: string;
    country: string;
    city: string;
    zipCode: string;
  }) => {
    setIsLoading(true);
    try {
      const buyerId = await CatalogService.addBuyer({
        ...data,
        clientId: client!.id!,
      });

      const updatedClient = {
        ...client!,
        buyers: [
          ...(client!.buyers || []),
          {
            id: buyerId,
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
          },
        ],
      };

      setClient(updatedClient);
      setIsBuyerFormOpen(false);
    } catch (error) {
      console.error("Error agregando comprador:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteDialog = (buyer: { id: number; name: string }) => {
    setBuyerToDelete({
      id: Number(buyer.id),
      name: buyer.name,
    });
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBuyerToDelete(null);
  };

  const handleDeleteBuyer = async () => {
    if (!buyerToDelete) return;

    setIsLoading(true);
    try {
      await CatalogService.deleteBuyer(buyerToDelete.id);

      const updatedClient = {
        ...client!,
        buyers: client!.buyers!.filter(
          (buyer) => Number(buyer.id) !== buyerToDelete.id,
        ),
      };

      setClient(updatedClient);
      closeDeleteDialog();
    } catch (error) {
      console.error("Error eliminando comprador:", error);
    } finally {
      setIsLoading(false);
    }
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

  const getSortedBuyers = () => {
    if (!client || !client.buyers) return [];

    const buyers = [...client.buyers];
    if (!sortConfig) return buyers;

    if (sortConfig.direction === "normal") return buyers;

    return buyers.sort((a, b) => {
      if (sortConfig.key === "name") {
        const nameA = `${a.name} ${a.lastname}`.toLowerCase();
        const nameB = `${b.name} ${b.lastname}`.toLowerCase();
        if (nameA < nameB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortConfig.key === "email" && a.email && b.email) {
        if (a.email < b.email) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a.email > b.email) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });
  };

  const sortedBuyers = getSortedBuyers();

  if (client)
    return (
      <div className="flex justify-start w-full h-full flex-col bg-transparent">
        <Header title="Clients" description="" />
        <div className="flex justify-between items-center w-full mt-6 px-6">
          <h2 className="text-xl font-[800]">{client?.name}</h2>
        </div>
        <div className="mt-6 px-6">
          <Button
            variant="primary"
            className="py-2 px-4 rounded-lg font-semibold text-sm border bg-primary/5 text-primary"
            onClick={() => setIsBuyerFormOpen(true)}
          >
            Agregar Comprador
          </Button>
        </div>

        <div className="w-full px-6 pb-6 pt-4">
          <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
            <div className="border rounded-[12px] overflow-auto max-h-[70vh] relative w-full">
              <Table className="w-full bg-white">
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead
                      className="w-1/4 text-primary font-[600] text-center cursor-pointer select-none"
                      onClick={() => requestSort("name")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Nombre{" "}
                        {(sortConfig?.key === "name" &&
                          {
                            ascending: <ArrowUp size={14} />,
                            descending: <ArrowDown size={14} />,
                          }[sortConfig.direction]) ||
                          null}
                      </div>
                    </TableHead>
                    <TableHead
                      className="w-1/4 text-primary font-[600] text-center cursor-pointer select-none"
                      onClick={() => requestSort("email")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Email{" "}
                        {(sortConfig?.key === "email" &&
                          {
                            ascending: <ArrowUp size={14} />,
                            descending: <ArrowDown size={14} />,
                          }[sortConfig.direction]) ||
                          null}
                      </div>
                    </TableHead>
                    <TableHead className="w-1/4 text-primary font-[600] text-center">
                      Teléfono
                    </TableHead>
                    <TableHead className="w-1/4 text-primary font-[600] text-center">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBuyers.length > 0 ? (
                    sortedBuyers.map((buyer) => (
                      <TableRow key={buyer.id} className="text-sm text-center">
                        <TableCell className="font-[600] text-black">
                          {buyer.name + " " + buyer.lastname}
                        </TableCell>
                        <TableCell>{buyer.email}</TableCell>
                        <TableCell>{buyer.phone}</TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="secondary"
                              onClick={() => openDeleteDialog(buyer)}
                            >
                              <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="h-36">
                      <TableCell
                        colSpan={4}
                        className="text-sm m-auto h-full text-center text-gray-500"
                      >
                        No hay compradores registrados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* BUYER FORM */}
        <Dialog open={isBuyerFormOpen} onOpenChange={setIsBuyerFormOpen}>
          <DialogContent className="max-w-md sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Agregar Comprador</DialogTitle>
            </DialogHeader>
            <BuyerForm onSubmit={handleAddBuyer} isLoading={isLoading} />
          </DialogContent>
        </Dialog>

        {/* DELETE DIALOG */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <DialogTitle className="text-center">
                Confirmar eliminación
              </DialogTitle>
              <DialogDescription className="text-center">
                ¿Estás seguro de eliminar el comprador{" "}
                <span className="font-medium">{buyerToDelete?.name}</span> de
                este proveedor?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-center gap-2 sm:gap-0 mt-2">
              <Button
                variant="secondary"
                onClick={closeDeleteDialog}
                className="flex-1 sm:flex-none"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleDeleteBuyer}
                className="flex-1 sm:flex-none bg-red-100 text-red-500"
                disabled={isLoading}
              >
                {isLoading ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
}
