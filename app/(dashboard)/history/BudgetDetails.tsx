"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Truck,
  Building2,
  DollarSign,
  Container,
  CalendarDays,
  FileText,
  ShoppingCart,
} from "lucide-react";
import type { Budget } from "@/types/Budget";

interface BudgetDetailsProps {
  budget: Budget;
  isOpen: boolean;
  onClose: () => void;
}

export function BudgetDetails({ budget, isOpen, onClose }: BudgetDetailsProps) {
  if (!budget) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalles de {budget.numbering}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Purchase Data Information */}
            {budget.purchaseData && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Información de Compra
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Ítem</p>
                    <p className="font-medium">
                      {budget.purchaseData.item?.detail}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="font-medium">
                      {new Date(budget.purchaseData.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Origen</p>
                    <p className="font-medium">{budget.purchaseData.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Destino</p>
                    <p className="font-medium">
                      {budget.purchaseData.destination}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Proveedor</p>
                    <p className="font-medium">
                      {budget.purchaseData.supplier}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tiempo de Entrega</p>
                    <p className="font-medium">
                      {budget.purchaseData.deliveryTime} días
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Precio Unitario</p>
                    <p className="font-medium">
                      {budget.purchaseData.unitPrice}{" "}
                      {budget.purchaseData.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Precio Aplicado</p>
                    <p className="font-medium">
                      {budget.purchaseData.appliedUnitPrice}{" "}
                      {budget.purchaseData.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Margen</p>
                    <p className="font-medium">
                      {budget.purchaseData.margin * 100}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Peso Unitario</p>
                    <p className="font-medium">
                      {budget.purchaseData.unitWeight}{" "}
                      {budget.purchaseData.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Peso Total</p>
                    <p className="font-medium">
                      {budget.purchaseData.totalWeight}{" "}
                      {budget.purchaseData.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Incoterm</p>
                    <p className="font-medium">
                      {budget.purchaseData.incoterm}
                    </p>
                  </div>
                  {budget.purchaseData.additionalObservations && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">
                        Observaciones Adicionales
                      </p>
                      <p className="font-medium">
                        {budget.purchaseData.additionalObservations}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Origin Expenses */}
            {budget.freight?.originExpenses && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Gastos de Origen
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium">
                      {budget.freight?.originExpenses.pickup}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reembalaje</p>
                    <p className="font-medium">
                      {budget.freight?.originExpenses.repackaging ? "Sí" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Fumigación de Pallets
                    </p>
                    <p className="font-medium">
                      {budget.freight?.originExpenses.palletFumigation
                        ? "Sí"
                        : "No"}
                    </p>
                  </div>
                  {budget.freight?.originExpenses.customExpenses.length > 0 && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">
                        Gastos Adicionales
                      </p>
                      {budget.freight?.originExpenses.customExpenses.map(
                        (expense, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{expense.name}</span>
                            <span>{expense.value}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">
                      {budget.freight?.originExpenses.total}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Transport Information */}
            {budget.freight?.transport && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Información de Transporte
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Tipo</p>
                    <p className="font-medium">
                      {budget.freight?.transport.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">
                      {budget.freight?.transport.total}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Custom Information */}
            {budget.freight?.custom && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Container className="h-5 w-5" />
                  Información de Aduana
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Valor FOB Factura</p>
                    <p className="font-medium">
                      {budget.freight?.custom.invoiceValueFOB}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Costo Flete Internacional
                    </p>
                    <p className="font-medium">
                      {budget.freight?.custom.internationalFreightCost}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Base Imponible</p>
                    <p className="font-medium">
                      {budget.freight?.custom.taxableBase}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Derechos de Importación
                    </p>
                    <p className="font-medium">
                      {budget.freight?.custom.importDutyRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tasa Estadística</p>
                    <p className="font-medium">
                      {budget.freight?.custom.statisticsRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IVA</p>
                    <p className="font-medium">
                      {budget.freight?.custom.ivaRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IVA Adicional</p>
                    <p className="font-medium">
                      {budget.freight?.custom.additionalIvaRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tasa de Ganancias</p>
                    <p className="font-medium">
                      {budget.freight?.custom.incomeTaxRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Tasa de Ingresos Brutos
                    </p>
                    <p className="font-medium">
                      {budget.freight?.custom.grossIncomeRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cargo SIM</p>
                    <p className="font-medium">
                      {budget.freight?.custom.simFee}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Costo Mínimo Despacho
                    </p>
                    <p className="font-medium">
                      {budget.freight?.custom.minimumCustomsDispatchCost}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Cargos Operativos Aduana
                    </p>
                    <p className="font-medium">
                      {budget.freight?.custom.customsOperationalCharges}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Seguridad Eléctrica (Opcional)
                    </p>
                    <p className="font-medium">
                      {budget.freight?.custom.optionalElectricalSecurity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Cargo SENASA (Opcional)
                    </p>
                    <p className="font-medium">
                      {budget.freight?.custom.optionalSenasaFee}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">
                      {budget.freight?.custom.total}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Destination Expenses */}
            {budget.freight?.destinationExpenses && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Gastos de Destino
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Tipo</p>
                    <p className="font-medium">
                      {budget.freight?.destinationExpenses.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">
                      {budget.freight?.destinationExpenses.total}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Sales Data */}
            {budget.salesData && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Información de Venta
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Precio Unitario de Venta
                    </p>
                    <p className="font-medium">
                      {budget.salesData.unitSalePrice}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Margen</p>
                    <p className="font-medium">
                      {budget.salesData?.margin
                        ? budget.salesData.margin * 100
                        : 0}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Precio Total</p>
                    <p className="font-medium">{budget.salesData.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Condición de Pago</p>
                    <p className="font-medium">
                      {budget.salesData.paymentCondition}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Stage Information */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Estado del Presupuesto
              </h3>
              <div>
                <p className="text-sm text-gray-500">Etapa</p>
                <p className="font-medium">{budget.stage}</p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default BudgetDetails;
