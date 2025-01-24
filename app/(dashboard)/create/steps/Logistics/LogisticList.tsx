import { useState } from "react";
import Button from "@/components/Button";
import { Plus, Pencil } from "lucide-react";
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
} from "@/components/ui/dialog";
import CreateTransport from "@/app/(dashboard)/create/steps/Logistics/CreateTransport";
import CreateCustom from "@/app/(dashboard)/create/steps/Logistics/CreateCustom";
import type { Budget } from "@/types/Budget";
import type { Item } from "@/types/Item";
import { AirportFreightCourier } from "@/types/AirportFreightCourier";
import { PortBondedWarehouse } from "@/types/PortBondedWarehouse";
import { Custom } from "@/types/Custom";

interface BudgetListProps {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  items: Item[];
}

export default function LogisticList({ budgets, setBudgets }: BudgetListProps) {
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  const handleTransportCreated = (
    transport: AirportFreightCourier | PortBondedWarehouse,
  ) => {
    if (selectedBudgetId) {
      setBudgets(
        budgets.map((budget) =>
          budget.id === selectedBudgetId ? { ...budget, transport } : budget,
        ),
      );
      setShowTransportModal(false);
    }
  };

  const handleCustomCreated = (custom: Custom) => {
    if (selectedBudgetId) {
      setBudgets(
        budgets.map((budget) =>
          budget.id === selectedBudgetId ? { ...budget, custom } : budget,
        ),
      );
      setShowCustomModal(false);
    }
  };

  // const handleDeliveryCreated = (delivery: any) => {
  //   if (selectedBudgetId) {
  //     setBudgets(
  //       budgets.map((budget) =>
  //         budget.id === selectedBudgetId ? { ...budget, delivery } : budget,
  //       ),
  //     );
  //     setShowDeliveryModal(false);
  //   }
  // };

  const renderActionCell = (
    budget: Budget,
    type: "transport" | "custom" | "delivery",
    setShowModal: (show: boolean) => void,
  ) => {
    const data = budget[type];
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBudgetId(budget.id);
      setShowModal(true);
    };

    if (data?.total) {
      return (
        <div className="flex items-center gap-2">
          <span className="font-[600]">${data.total.toFixed(2)}</span>
          <Button
            onClick={handleClick}
            variant="secondary"
            className="p-1 h-auto hover:bg-gray-100"
          >
            <Pencil className="w-4 h-4 text-primary" />
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={handleClick}
        variant="secondary"
        className="flex items-center gap-1 text-primary hover:text-primary-dark"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </Button>
    );
  };

  return (
    <div className="w-full mx-auto">
      <div className="border rounded-md overflow-x-auto max-h-[30vw]">
        <Table className="w-full">
          <TableHeader className="border-b border-gray-200">
            <TableRow>
              <TableHead>Numeración</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>T. Entrega</TableHead>
              <TableHead>Incoterm</TableHead>
              <TableHead>Transporte</TableHead>
              <TableHead>Aduana</TableHead>
              <TableHead>Entrega</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {budgets.length === 0 ? (
              <TableRow className="h-24">
                <TableCell
                  colSpan={12}
                  className="text-sm m-auto h-full text-center text-gray-500"
                >
                  No hay presupuestos agregados
                </TableCell>
              </TableRow>
            ) : (
              budgets.map((budget) => (
                <TableRow key={budget.id} className="h-12">
                  <TableCell>{budget.stage + " " + budget.numbering}</TableCell>
                  <TableCell>{budget.item}</TableCell>
                  <TableCell>{budget.supplier}</TableCell>
                  <TableCell>{budget.origin}</TableCell>
                  <TableCell>{budget.destination}</TableCell>
                  <TableCell>{budget.deliveryTime} días</TableCell>
                  <TableCell>{budget.incoterm}</TableCell>
                  <TableCell>
                    {renderActionCell(
                      budget,
                      "transport",
                      setShowTransportModal,
                    )}
                  </TableCell>
                  <TableCell>
                    {renderActionCell(budget, "custom", setShowCustomModal)}
                  </TableCell>
                  <TableCell>
                    {renderActionCell(budget, "delivery", setShowDeliveryModal)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Transport Modal */}
      <Dialog open={showTransportModal} onOpenChange={setShowTransportModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar transporte</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreateTransport onTransportCreated={handleTransportCreated} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Modal */}
      <Dialog open={showCustomModal} onOpenChange={setShowCustomModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar aduana</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreateCustom onCustomCreated={handleCustomCreated} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delivery Modal */}
      <Dialog open={showDeliveryModal} onOpenChange={setShowDeliveryModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar entrega</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            {/*<CreateDelivery*/}
            {/*  onDeliveryCreated={handleDeliveryCreated}*/}
            {/*  onCancel={() => setShowDeliveryModal(false)}*/}
            {/*  budgetId={selectedBudgetId!}*/}
            {/*/>*/}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
