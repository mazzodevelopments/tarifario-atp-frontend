"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import Button from "@/components/Button";
import { CatalogService } from "@/services/CatalogService";
import { AlertTriangle, Trash } from "lucide-react";
import { Client } from "@/types/Client";
import BuyerForm from "@/app/(dashboard)/create/[quotationId]/quotation-details/forms/BuyerForm";

interface ClientDetailsProps {
  client: Client;
  onClose: () => void;
  onBuyerAdded: () => void;
  open: boolean;
}

export default function ClientDetails({
  client: initialClient,
  onClose,
  onBuyerAdded,
  open,
}: ClientDetailsProps) {
  const [client, setClient] = useState<Client>(initialClient);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [buyerToDelete, setBuyerToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isBuyerFormOpen, setIsBuyerFormOpen] = useState(false);

  useEffect(() => {
    setClient(initialClient);
  }, [initialClient]);

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
        clientId: client.id!,
      });

      const updatedClient = {
        ...client,
        buyers: [
          ...(client.buyers || []),
          {
            id: buyerId,
            name: data.name + " " + data.lastname,
          },
        ],
      };

      setClient(updatedClient);
      setIsBuyerFormOpen(false);

      onBuyerAdded();
    } catch (error) {
      console.error("Error agregando comprador:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteDialog = (buyer: { id: string; name: string }) => {
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
        ...client,
        buyers: client.buyers!.filter(
          (buyer) => Number(buyer.id) !== buyerToDelete.id,
        ),
      };

      setClient(updatedClient);

      onBuyerAdded();

      closeDeleteDialog();
    } catch (error) {
      console.error("Error eliminando comprador:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader className="space-y-3 pb-4 border-b">
            <DialogTitle className="text-2xl font-extrabold tracking-tight">
              {client.name}
            </DialogTitle>
          </DialogHeader>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">
              Compradores
            </h4>
            {client.buyers && client.buyers.length > 0 ? (
              <div className="space-y-2">
                {client.buyers.map((buyer) => (
                  <div
                    className="flex items-center justify-between h-6"
                    key={buyer.id}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-700 mr-1"></div>
                      <span className="text-gray-700 text-sm">
                        {buyer.name} {buyer.lastname}
                      </span>
                    </div>
                    <button
                      onClick={() => openDeleteDialog(buyer)}
                      className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      disabled={isLoading}
                      type="button"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No hay compradores asociados a este cliente.
              </p>
            )}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">
              Agregar Comprador
            </h4>
            <Button
              variant="primary"
              className="flex px-4 items-center h-10 w-full justify-center border bg-primary/5 text-primary"
              onClick={() => setIsBuyerFormOpen(true)}
              disabled={isLoading}
            >
              Agregar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* BUYER FORM */}
      <Dialog open={isBuyerFormOpen} onOpenChange={setIsBuyerFormOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Agregar Comprador</DialogTitle>
          </DialogHeader>
          <BuyerForm onSubmit={handleAddBuyer} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
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
              <span className="font-medium">{buyerToDelete?.name}</span> de este
              proveedor?
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
    </>
  );
}
