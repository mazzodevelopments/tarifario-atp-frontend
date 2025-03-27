"use client";

import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for quotations
const quotations = [
  { id: 1, name: "A25R-0004", status: "pendiente" },
  { id: 2, name: "A25R-0004", status: "completada" },
  { id: 3, name: "A25R-0004", status: "pendiente" },
  { id: 4, name: "A25R-0004", status: "completada" },
  { id: 5, name: "A25R-0004", status: "pendiente" },
];

export default function QuotationsList() {
  return (
    <div className="hidden 2xl:block w-full h-full bg-white border border-neutral-200 shadow-sm rounded-[18px] relative overflow-hidden select-none">
      <div className="flex flex-col p-3 relative">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-[800] text-black">Cotizaciones</h2>
        </div>

        <div className="h-auto overflow-y-auto pr-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Nombre</TableHead>
                <TableHead className="text-left">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.name}</TableCell>
                  <TableCell>
                    <div
                      className={
                        quote.status === "pendiente"
                          ? "bg-orange-100 text-orange-600 flex py-1 justify-center items-center rounded-2xl"
                          : "bg-green-100 text-green-600 flex py-1 justify-center items-center rounded-2xl"
                      }
                    >
                      {quote.status === "pendiente"
                        ? "Pendiente"
                        : "Completada"}
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Button
                      variant="secondary"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      onClick={() => console.log(`Ir a cotizar: ${quote.id}`)}
                    >
                      Ir a cotizar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
