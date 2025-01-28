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
import EditCustom from "@/app/(dashboard)/create/steps/Logistics/EditCustom";
import type { Budget } from "@/types/Budget";
import type { Item } from "@/types/Item";
import type { AirportFreightCourier } from "@/types/AirportFreightCourier";
import type { PortBondedWarehouse } from "@/types/PortBondedWarehouse";
import type { Custom } from "@/types/Custom";

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
  const [editingCustomBudgetId, setEditingCustomBudgetId] = useState<
    string | null
  >(null);

  const getButtonStates = (
    incoterm: string,
  ): { transport: boolean; custom: boolean; delivery: boolean } => {
    switch (incoterm) {
      case "EXW":
        return { transport: true, custom: true, delivery: true };
      case "FOB":
        return { transport: true, custom: true, delivery: true };
      case "FCA":
        return { transport: false, custom: true, delivery: false };
      case "CIF":
        return { transport: false, custom: true, delivery: true };
      case "CFR":
        return { transport: false, custom: true, delivery: true };
      case "DAT":
        return { transport: false, custom: false, delivery: true };
      case "DAP":
        return { transport: false, custom: false, delivery: true };
      case "DDP":
        return { transport: false, custom: false, delivery: false };
      default:
        return { transport: false, custom: false, delivery: false };
    }
  };

  const handleTransportCreated = (
    transport: AirportFreightCourier | PortBondedWarehouse,
  ) => {
    if (selectedBudgetId) {
      setBudgets(
        budgets.map((budget) =>
          budget.numbering === selectedBudgetId
            ? {
                ...budget,
                transport,
              }
            : budget,
        ),
      );
      setShowTransportModal(false);
    }
  };

  const handleCustomCreatedOrUpdated = (custom: Custom) => {
    if (selectedBudgetId) {
      setBudgets(
        budgets.map((budget) =>
          budget.numbering === selectedBudgetId
            ? { ...budget, custom }
            : budget,
        ),
      );
      setShowCustomModal(false);
      setEditingCustomBudgetId(null);
      console.log(
        JSON.stringify(
          `${custom.optionalElectricalSecurity}` +
            `${custom.optionalSenasaFee}`,
        ),
      );
    }
  };

  const handleCustomDeleted = () => {
    if (selectedBudgetId) {
      setBudgets(
        budgets.map((budget) =>
          budget.numbering === selectedBudgetId
            ? {
                ...budget,
                custom: null,
              }
            : budget,
        ),
      );
      setShowCustomModal(false);
      setEditingCustomBudgetId(null);
    }
  };

  const renderActionCell = (
    budget: Budget,
    type: "transport" | "custom" | "delivery",
    setShowModal: (show: boolean) => void,
  ) => {
    const data = budget[type];
    const buttonStates = getButtonStates(budget.purchaseData?.incoterm || "");
    const isEnabled = buttonStates[type];

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBudgetId(budget.numbering);
      setShowModal(true);
    };

    if (data?.total) {
      return (
        <div className="flex items-center gap-2">
          <span className="font-[600]">${data.total.toFixed(2)}</span>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBudgetId(budget.numbering);
              setEditingCustomBudgetId(budget.numbering);
              setShowCustomModal(true);
            }}
            variant="secondary"
            className="p-1 h-auto hover:bg-gray-100"
            disabled={!isEnabled}
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
        className={`flex items-center gap-1 ${
          !isEnabled
            ? "text-gray-400 cursor-not-allowed"
            : "text-primary hover:text-primary-dark"
        }`}
        disabled={!isEnabled}
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
              <TableHead>T. Producción</TableHead>
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
                <TableRow key={budget.numbering} className="h-12">
                  <TableCell>{budget.stage + " " + budget.numbering}</TableCell>
                  <TableCell>{budget.purchaseData?.item?.detail}</TableCell>
                  <TableCell>{budget.purchaseData?.supplier}</TableCell>
                  <TableCell>{budget.purchaseData?.origin}</TableCell>
                  <TableCell>{budget.purchaseData?.destination}</TableCell>
                  <TableCell>
                    {budget.purchaseData?.deliveryTime} días
                  </TableCell>
                  <TableCell>{budget.purchaseData?.incoterm}</TableCell>
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar transporte</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreateTransport
              onTransportCreated={handleTransportCreated}
              onCancel={() => setShowTransportModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Modal */}
      <Dialog open={showCustomModal} onOpenChange={setShowCustomModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingCustomBudgetId
                ? "Editar Gastos de Aduana"
                : "Agregar Gastos de Aduana"}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            {editingCustomBudgetId ? (
              <EditCustom
                custom={
                  budgets.find((b) => b.numbering === editingCustomBudgetId)
                    ?.custom ??
                  (() => {
                    throw new Error("Custom budget not found");
                  })()
                }
                onCustomUpdated={handleCustomCreatedOrUpdated}
                onCustomDeleted={handleCustomDeleted}
                onCancel={() => {
                  setShowCustomModal(false);
                  setEditingCustomBudgetId(null);
                }}
              />
            ) : (
              <CreateCustom
                onCustomCreated={handleCustomCreatedOrUpdated}
                onCancel={() => setShowCustomModal(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delivery Modal */}
      <Dialog open={showDeliveryModal} onOpenChange={setShowDeliveryModal}>
        <DialogContent className="max-w-4xl">
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
