"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Truck, Building2, DollarSign } from "lucide-react";
import type { Budget } from "@/types/Budget";
import type { AirportFreightCourier } from "@/types/AirportFreightCourier";
import type { PortBondedWarehouse } from "@/types/PortBondedWarehouse";

interface BudgetDetailsProps {
  budget: Budget;
  isOpen: boolean;
  onClose: () => void;
}

export function BudgetDetails({ budget, isOpen, onClose }: BudgetDetailsProps) {
  if (!budget) return null;

  // Determine transport type based on the presence of airwayBillCuttingFee
  const isAirTransport =
    budget.transport && "airwayBillCuttingFee" in budget.transport;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalles del Presupuesto {budget.numbering}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Basic Information */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Package2 className="h-5 w-5" />
                Información Básica
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Ítem</p>
                  <p className="font-medium">{budget.item}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-medium">
                    {new Date(budget.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Origen</p>
                  <p className="font-medium">{budget.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Destino</p>
                  <p className="font-medium">{budget.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Proveedor</p>
                  <p className="font-medium">{budget.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tiempo de Entrega</p>
                  <p className="font-medium">{budget.deliveryTime} días</p>
                </div>
              </div>
            </section>

            {/* Pricing Information */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Información de Precios
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Precio Unitario</p>
                  <p className="font-medium">
                    {budget.unitPrice} {budget.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Margen</p>
                  <p className="font-medium">{budget.margin * 100}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Precio Total</p>
                  <p className="font-medium">
                    {budget.totalPrice} {budget.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Incoterm</p>
                  <p className="font-medium">{budget.incoterm}</p>
                </div>
              </div>
            </section>

            {/* Weight Information */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Información de Peso
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Peso Unitario</p>
                  <p className="font-medium">
                    {budget.unitWeight} {budget.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Peso Total</p>
                  <p className="font-medium">
                    {budget.totalWeight} {budget.unit}
                  </p>
                </div>
              </div>
            </section>

            {/* Transport Information */}
            {budget.transport && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Información de Transporte{" "}
                  {isAirTransport ? "Aéreo" : "Marítimo"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Common fields for both transport types */}
                  <div>
                    <p className="text-sm text-gray-500">Flete Internacional</p>
                    <p className="font-medium">
                      {
                        (budget.transport as AirportFreightCourier)
                          .internationalFreightCost
                      }{" "}
                      {budget.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Seguro Internacional
                    </p>
                    <p className="font-medium">
                      {
                        (budget.transport as AirportFreightCourier)
                          .internationalInsurance
                      }{" "}
                      {budget.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Cargos Administrativos
                    </p>
                    <p className="font-medium">
                      {budget.transport.administrativeCharges} {budget.currency}
                    </p>
                  </div>

                  {/* Air transport specific fields */}
                  {isAirTransport && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">
                          Estadía EDCADASSA
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as AirportFreightCourier)
                              .edcadassaStayDuration
                          }{" "}
                          días a{" "}
                          {
                            (budget.transport as AirportFreightCourier)
                              .edcadassaStayCostPerDay
                          }{" "}
                          {budget.currency}/día
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total EDCADASSA</p>
                        <p className="font-medium">
                          {
                            (budget.transport as AirportFreightCourier)
                              .edcadassaTotal
                          }{" "}
                          {budget.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Corte de Guía Aérea
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as AirportFreightCourier)
                              .airwayBillCuttingFee
                          }{" "}
                          {budget.currency}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Maritime transport specific fields */}
                  {!isAirTransport && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">
                          Transferencia a Depósito Fiscal
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as PortBondedWarehouse)
                              .transferToCustomsWarehouse
                          }{" "}
                          {budget.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Desconsolidación
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as PortBondedWarehouse)
                              .deconsolidation
                          }{" "}
                          {budget.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Costos de Movimiento
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as PortBondedWarehouse)
                              .movementCharges
                          }{" "}
                          {budget.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Precinto Electrónico
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as PortBondedWarehouse)
                              .electronicSeal
                          }{" "}
                          {budget.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Días de Almacenaje
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as PortBondedWarehouse)
                              .storageDays
                          }{" "}
                          días
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Costo por Día de Almacenaje
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as PortBondedWarehouse)
                              .storageDayPrice
                          }{" "}
                          {budget.currency}/día
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Total de Almacenaje
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as PortBondedWarehouse)
                              .storageDaysTotal
                          }{" "}
                          {budget.currency}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Limpieza de Contenedor
                        </p>
                        <p className="font-medium">
                          {
                            (budget.transport as PortBondedWarehouse)
                              .containerCleaning
                          }{" "}
                          {budget.currency}
                        </p>
                      </div>
                    </>
                  )}

                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">
                      {budget.transport.total} {budget.currency}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Custom Information */}
            {budget.custom && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">Información de Aduana</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Base Imponible</p>
                    <p className="font-medium">
                      {budget.custom.taxableBase} {budget.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Derechos de Importación
                    </p>
                    <p className="font-medium">
                      {budget.custom.importDutyRate} {budget.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tasa Estadística</p>
                    <p className="font-medium">
                      {budget.custom.statisticsRate} {budget.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IVA</p>
                    <p className="font-medium">
                      {budget.custom.ivaRate} {budget.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">
                      {budget.custom.total} {budget.currency}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Delivery Information */}
            {budget.delivery && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Información de Entrega
                </h3>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">
                    {budget.delivery.total} {budget.currency}
                  </p>
                </div>
              </section>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
