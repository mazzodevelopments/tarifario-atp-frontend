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

// Mock data for quotations with expiration dates
const quotations = [
  {
    id: 1,
    name: "A25R-0004",
    status: "pendiente",
    expirationDate: "2024-04-15",
  },
  {
    id: 2,
    name: "A25R-0004",
    status: "completada",
    expirationDate: "2024-04-20",
  },
  {
    id: 3,
    name: "A25R-0004",
    status: "pendiente",
    expirationDate: "2024-04-25",
  },
  {
    id: 4,
    name: "A25R-0004",
    status: "completada",
    expirationDate: "2024-04-30",
  },
  {
    id: 5,
    name: "A25R-0004",
    status: "pendiente",
    expirationDate: "2024-05-05",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function QuotationsList() {
  return (
    <div className="2xl:block w-full h-full bg-white border border-neutral-200 shadow-sm rounded-[18px] relative overflow-hidden select-none">
      <div className="flex flex-col p-3 relative">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-[800] text-black">Cotizaciones</h2>
        </div>

        <div className="h-auto overflow-y-auto pr-1">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">
                  Fecha de Expiración
                </TableHead>
                <TableHead className="text-center">Cotizar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quote) => (
                <TableRow key={quote.id} className="hover:bg-transparent">
                  <TableCell className="font-medium text-center">
                    {quote.name}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <div
                      className={
                        quote.status === "pendiente"
                          ? "bg-orange-100 text-orange-600 flex w-[100px] py-1 justify-center items-center rounded-2xl"
                          : "bg-green-100 text-green-600 flex w-[100px] py-1 justify-center items-center rounded-2xl"
                      }
                    >
                      {quote.status === "pendiente"
                        ? "Pendiente"
                        : "Completada"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(quote.expirationDate)}
                  </TableCell>
                  <TableCell className="flex justify-center">
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
