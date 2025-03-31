"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import CreatePurchase from "./CreatePurchase";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import type { Budget } from "@/types/Budget";
import type { Item } from "@/types/Item";
import type { CreatePurchaseData } from "@/types/PurchaseData";
import { X } from "react-feather";
import "@/utils/formatNumber";
import { PlusCircle } from "lucide-react";
import { QuoteService } from "@/services/QuoteService";

export default function PurchaseList({ quotationId }: { quotationId: number }) {
  const [items, setItems] = useState<Item[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchQuotationBudgets = async () => {
      try {
        setIsLoading(true);
        const quotationBudgets = await QuoteService.getQuotationBudgets(
          quotationId,
          "purchase-data",
        );
        setBudgets(quotationBudgets);
        setIsLoading(false);
        setShouldFetch(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching quotation budgets:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los presupuestos",
          variant: "destructive",
        });
      }
    };

    const fetchQuotationItems = async () => {
      try {
        const quotationItems =
          await QuoteService.getQuotationItems(quotationId);
        setItems(quotationItems);
        setShouldFetch(false);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los items",
          variant: "destructive",
        });
      }
    };

    fetchQuotationBudgets();
    fetchQuotationItems();
  }, [shouldFetch, toast]);

  const onPurchaseCreated = async (newPurchase: CreatePurchaseData) => {
    try {
      await QuoteService.addPurchaseData(newPurchase, quotationId);
      setShowCreateModal(false);
      setShouldFetch(true);
      toast({
        title: "Presupuesto Creado",
        description: `Los datos de compra para el item "${items.find((i) => i.id === newPurchase.itemId)?.detail}" se han creado exitosamente`,
      });
    } catch (error) {
      console.error("Error creating Purchase Data:", error);
      toast({
        title: "Error",
        description: "No se pudieron crear los datos de compra",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBudget = async (id: number) => {
    try {
      await QuoteService.deletePurchaseData(id);
      setBudgets(budgets.filter((budget) => budget.id !== id));
      setShouldFetch(true);
      toast({
        title: "Presupuesto eliminado",
        description: "El presupuesto ha sido eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el presupuesto",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center max-w-4xl flex-col">
      <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
        <div className="border rounded-[12px] max-h-[25vw] relative overflow-auto w-[54vw] ">
          <Table>
            <TableHeader className="border-b border-gray-200">
              <TableRow className="bg-primary/5">
                <TableHead className="text-primary font-[600] text-center">
                  Numeración
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Item
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Proveedor
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Ofrecido
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Precio Unitario
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Extendido
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Origen
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  L. Entrega
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  T. Producción
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Incoterm
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Observaciones Adicionales
                </TableHead>
                <TableHead className="text-primary text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {budgets.length === 0 ? (
                <TableRow className="h-24">
                  <TableCell
                    colSpan={12}
                    className="text-sm m-auto h-full text-center text-gray-500"
                  >
                    {isLoading
                      ? "Cargando..."
                      : "No hay presupuestos agregados"}
                  </TableCell>
                </TableRow>
              ) : (
                budgets.map((budget) => (
                  <TableRow key={budget.id} className="h-12 text-center">
                    <TableCell>{budget.numbering}</TableCell>
                    <TableCell>{budget.purchaseData?.item?.detail}</TableCell>
                    <TableCell>{budget.purchaseData?.supplier}</TableCell>
                    <TableCell>
                      {budget.purchaseData?.offeredCondition}
                    </TableCell>
                    <TableCell>
                      ${budget.purchaseData?.appliedUnitPrice.formatNumber()}
                    </TableCell>
                    <TableCell>
                      $
                      {(
                        (budget.purchaseData?.appliedUnitPrice ?? 0) *
                        (budget.purchaseData?.item?.quantity ?? 1)
                      ).formatNumber()}
                    </TableCell>
                    <TableCell>{budget.purchaseData?.origin}</TableCell>
                    <TableCell>{budget.purchaseData?.destination}</TableCell>
                    <TableCell>
                      {budget.purchaseData?.productionTime} días
                    </TableCell>
                    <TableCell>{budget.purchaseData?.incoterm}</TableCell>
                    <TableCell>
                      {budget.purchaseData?.additionalObservations !== ""
                        ? budget.purchaseData?.additionalObservations
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="bg-white border border-neutral-200 text-red-800 hover:text-red-600 hover:bg-red-50 mx-2"
                      >
                        <X className="w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <div className="flex justify-center items-center w-full mt-6">
          <DialogTrigger asChild>
            <Button className="bg-primary text-white flex items-center gap-1">
              <PlusCircle size={16} />
              <span className="mt-[1.5px]">Agregar Datos De Compra</span>
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar compra</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreatePurchase
              onPurchaseCreated={onPurchaseCreated}
              items={items}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
