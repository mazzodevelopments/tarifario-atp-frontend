import { useState, useEffect } from "react";
import { Plus, Pencil, PlusCircle } from "lucide-react";
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
import Button from "@/components/Button";
import TransportForm from "@/app/(dashboard)/create/steps/Logistics/TransportForm";
import CustomForm from "@/app/(dashboard)/create/steps/Logistics/CustomForm";
import OriginExpensesForm from "@/app/(dashboard)/create/steps/Logistics/OriginExpensesForm";
import DestinationExpensesForm from "@/app/(dashboard)/create/steps/Logistics/DestinationExpensesForm";
import type { Budget } from "@/types/Budget";
import type { Item } from "@/types/Item";
import type { OriginExpenses } from "@/types/OriginExpenses";
import type { Transport } from "@/types/Transport";
import type { Custom } from "@/types/Custom";
import type { DestinationExpenses } from "@/types/DestinationExpenses";
import type { Freight } from "@/types/Freight";
import "@/app/utils/formatNumber";

interface BudgetListProps {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  items: Item[];
  freights: Freight[];
  setFreights: (freigths: Freight[]) => void;
}

export default function LogisticList({
  budgets,
  setBudgets,
  freights,
  setFreights,
}: BudgetListProps) {
  const [activeTab, setActiveTab] = useState<"logistics" | "freights">(
    "logistics"
  );
  const [selectedFreightId, setSelectedFreightId] = useState<string | null>(
    null
  );
  const [selectedFreights, setSelectedFreights] = useState<
    Record<string, string>
  >({});
  const [showOriginExpensesModal, setShowOriginExpensesModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showDestinationExpensesModal, setShowDestinationExpensesModal] =
    useState(false);
  const [editingOriginExpenses, setEditingOriginExpenses] =
    useState<OriginExpenses | null>(null);
  const [editingCustom, setEditingCustom] = useState<Custom | null>(null);
  const [editingTransport, setEditingTransport] = useState<Transport | null>(
    null
  );
  const [editingDestinationExpenses, setEditingDestinationExpenses] =
    useState<DestinationExpenses | null>(null);

  // Initialize selectedFreights from existing budget assignments
  useEffect(() => {
    const initialSelections: Record<string, string> = {};
    budgets.forEach((budget) => {
      if (budget.freight?.id) {
        initialSelections[budget.numbering] = budget.freight.id;
      }
    });
    setSelectedFreights(initialSelections);
  }, []); // Only run once on component mount

  const handleFreightUpdate = <
    T extends Transport | OriginExpenses | Custom | DestinationExpenses | null
  >(
    field: "transport" | "originExpenses" | "custom" | "destinationExpenses",
    value: T,
    setShowModal: (value: boolean) => void,
    setEditing: (value: T | null) => void
  ) => {
    if (selectedFreightId) {
      setFreights(
        freights.map((freight) =>
          freight.id === selectedFreightId
            ? {
                ...freight,
                [field]: value,
                total: calculateTotal({
                  ...freight,
                  [field]: value,
                }),
              }
            : freight
        )
      );

      // Update budgets that use this freight to reflect the changes
      setBudgets(
        budgets.map((budget) =>
          budget.freight?.id === selectedFreightId
            ? {
                ...budget,
                freight: {
                  ...budget.freight,
                  [field]: value,
                  total: calculateTotal({
                    ...budget.freight,
                    [field]: value,
                  }),
                },
              }
            : budget
        )
      );

      setShowModal(false);
      setEditing(null);
    }
  };

  const calculateTotal = (freight: Partial<Freight>) => {
    return [
      freight.originExpenses?.total || 0,
      freight.transport?.total || 0,
      freight.custom?.total || 0,
      freight.destinationExpenses?.total || 0,
    ].reduce((a, b) => a + b, 0);
  };

  const createNewFreight = () => {
    const newFreight: Freight = {
      id: `freight-${freights.length + 1}`,
      name: `Flete ${freights.length + 1}`,
      originExpenses: null,
      transport: null,
      custom: null,
      destinationExpenses: null,
      total: 0,
    };
    setFreights([...freights, newFreight]);
  };

  const handleAssignFreight = (budgetId: string, freightId: string) => {
    const freight = freights.find((f) => f.id === freightId);
    if (freight) {
      setSelectedFreights((prev) => ({
        ...prev,
        [budgetId]: freightId,
      }));

      setBudgets(
        budgets.map((budget) =>
          budget.numbering === budgetId
            ? {
                ...budget,
                freight: freight,
              }
            : budget
        )
      );
    }
  };

  const renderLogisticsTable = () => (
    <Table>
      <TableHeader className="bg-primary/5">
        <TableRow>
          <TableHead className="text-primary font-[600]">Numeración</TableHead>
          <TableHead className="text-primary font-[600]">Item</TableHead>
          <TableHead className="text-primary font-[600]">Proveedor</TableHead>
          <TableHead className="text-primary font-[600]">
            Precio Unitario
          </TableHead>
          <TableHead className="text-primary font-[600]">Extendido</TableHead>
          <TableHead className="text-primary font-[600]">Origen</TableHead>
          <TableHead className="text-primary font-[600]">L. Entrega</TableHead>
          <TableHead className="text-primary font-[600]">
            T. Producción
          </TableHead>
          <TableHead className="text-primary font-[600]">Incoterm</TableHead>
          <TableHead className="text-primary font-[600]">Flete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white divide-y divide-gray-200">
        {budgets.length === 0 ? (
          <TableRow className="h-24">
            <TableCell
              colSpan={10}
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
              <TableCell>{budget.purchaseData?.deliveryTime} días</TableCell>
              <TableCell>{budget.purchaseData?.incoterm}</TableCell>
              <TableCell>
                <select
                  className="border rounded p-1"
                  value={selectedFreights[budget.numbering] || ""}
                  onChange={(e) =>
                    handleAssignFreight(budget.numbering, e.target.value)
                  }
                >
                  <option value="">Seleccionar Flete</option>
                  {freights.map((freight) => (
                    <option key={freight.id} value={freight.id}>
                      {freight.name} (${freight.total.formatNumber()})
                    </option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  const renderFreightActionCell = (
    freight: Freight,
    type: "transport" | "custom" | "destinationExpenses" | "origin",
    setShowModal: (show: boolean) => void
  ) => {
    const data = type === "origin" ? freight.originExpenses : freight[type];

    if (data?.total) {
      return (
        <div className="flex items-center gap-2">
          <span className="font-[600]">${data.total.formatNumber()}</span>
          <Button
            onClick={() => {
              setSelectedFreightId(freight.id);
              if (type === "custom") {
                setEditingCustom(freight.custom as Custom);
                setShowCustomModal(true);
              } else if (type === "transport") {
                setEditingTransport(freight.transport as Transport);
                setShowTransportModal(true);
              } else if (type === "origin") {
                setEditingOriginExpenses(
                  freight.originExpenses as OriginExpenses
                );
                setShowOriginExpensesModal(true);
              } else if (type === "destinationExpenses") {
                setEditingDestinationExpenses(
                  freight.destinationExpenses as DestinationExpenses
                );
                setShowDestinationExpensesModal(true);
              }
            }}
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
        onClick={() => {
          setSelectedFreightId(freight.id);
          setShowModal(true);
        }}
        variant="secondary"
        className="flex items-center gap-1 text-primary hover:text-primary-dark"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </Button>
    );
  };

  const renderFreightsTable = () => (
    <>
      {freights.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-4">
          <p className="text-gray-500">No hay fletes creados</p>
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-primary/5">
            <TableRow>
              <TableHead className="text-primary font-[600]">Nombre</TableHead>
              <TableHead className="text-primary font-[600]">
                Gastos Origen
              </TableHead>
              <TableHead className="text-primary font-[600]">
                Transporte
              </TableHead>
              <TableHead className="text-primary font-[600]">Aduana</TableHead>
              <TableHead className="text-primary font-[600]">
                Gastos Destino
              </TableHead>
              <TableHead className="text-primary font-[600]">Total</TableHead>
              <TableHead className="text-primary font-[600]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {freights.map((freight) => (
              <TableRow key={freight.id} className="h-12">
                <TableCell>{freight.name}</TableCell>
                <TableCell>
                  {renderFreightActionCell(
                    freight,
                    "origin",
                    setShowOriginExpensesModal
                  )}
                </TableCell>
                <TableCell>
                  {renderFreightActionCell(
                    freight,
                    "transport",
                    setShowTransportModal
                  )}
                </TableCell>
                <TableCell>
                  {renderFreightActionCell(
                    freight,
                    "custom",
                    setShowCustomModal
                  )}
                </TableCell>
                <TableCell>
                  {renderFreightActionCell(
                    freight,
                    "destinationExpenses",
                    setShowDestinationExpensesModal
                  )}
                </TableCell>
                <TableCell>${freight.total.formatNumber()}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );

  return (
    <div className="flex justify-start items-center w-[54vw] flex-col">
      <div className="w-full mb-4 flex gap-2">
        <button
          className={`px-4 py-1 text-md rounded-3xl transition-all  ${
            activeTab === "logistics"
              ? "bg-primary text-white font-[600]"
              : "bg-primary/5 border border-primary/20 text-primary font-[500]"
          }`}
          onClick={() => setActiveTab("logistics")}
        >
          Logística
        </button>
        <button
          className={`px-4 py-1 text-md rounded-3xl transition-all  ${
            activeTab === "freights"
              ? "bg-primary text-white font-[600]"
              : "bg-primary/5 border border-primary/20 text-primary font-[500]"
          }`}
          onClick={() => setActiveTab("freights")}
        >
          Fletes
        </button>
      </div>
      <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
        <div className="border rounded-[12px] max-h-[30vw] relative overflow-auto w-[54vw]">
          {activeTab === "logistics"
            ? renderLogisticsTable()
            : renderFreightsTable()}
        </div>
      </div>

      {activeTab === "freights" && (
        <div className="flex justify-center items-center w-full mt-6">
          <Button
            onClick={createNewFreight}
            className=" bg-primary text-white flex items-center gap-1"
          >
            <PlusCircle size={16} />
            <span className="mt-[1.5px]">Crear Nuevo Flete</span>
          </Button>
        </div>
      )}

      {/* MODAL GASTOS ORIGEN */}
      <Dialog
        open={showOriginExpensesModal}
        onOpenChange={setShowOriginExpensesModal}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingOriginExpenses
                ? "Editar Gastos de Origen"
                : "Agregar Gastos de Origen"}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <OriginExpensesForm
              onOriginExpensesCreated={(expenses) => {
                handleFreightUpdate(
                  "originExpenses",
                  expenses,
                  setShowOriginExpensesModal,
                  setEditingOriginExpenses
                );
              }}
              onCancel={() => {
                setShowOriginExpensesModal(false);
                setEditingOriginExpenses(null);
              }}
              existingExpenses={editingOriginExpenses}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL TRANSPORTE */}
      <Dialog open={showTransportModal} onOpenChange={setShowTransportModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingTransport ? "Editar transporte" : "Agregar transporte"}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <TransportForm
              onTransportCreated={(transport) =>
                handleFreightUpdate(
                  "transport",
                  transport,
                  setShowTransportModal,
                  setEditingTransport
                )
              }
              onCancel={() => {
                setShowTransportModal(false);
                setEditingTransport(null);
              }}
              existingTransport={editingTransport}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL ADUANA */}
      <Dialog open={showCustomModal} onOpenChange={setShowCustomModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingCustom
                ? "Editar Gastos de Aduana"
                : "Agregar Gastos de Aduana"}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CustomForm
              onCustomCreated={(custom) => {
                handleFreightUpdate(
                  "custom",
                  custom,
                  setShowCustomModal,
                  setEditingCustom
                );
              }}
              onCancel={() => {
                setShowCustomModal(false);
                setEditingCustom(null);
              }}
              existingCustom={editingCustom}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL GASTOS DESTINO */}
      <Dialog
        open={showDestinationExpensesModal}
        onOpenChange={setShowDestinationExpensesModal}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingDestinationExpenses
                ? "Editar Gastos de Destino"
                : "Agregar Gastos de Destino"}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <DestinationExpensesForm
              onDestinationExpensesCreated={(expenses) => {
                handleFreightUpdate(
                  "destinationExpenses",
                  expenses,
                  setShowDestinationExpensesModal,
                  setEditingDestinationExpenses
                );
              }}
              onCancel={() => {
                setShowDestinationExpensesModal(false);
                setEditingDestinationExpenses(null);
              }}
              existingDestinationExpenses={editingDestinationExpenses}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
