"use client";
import Button from "@/components/Button";
import CreateItem from "./CreateItem";
import { X } from "react-feather";
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
import { Item } from "@/types/Item";
import { PlusCircle, Upload } from "lucide-react";
import { useRef } from "react";
import * as XLSX from "xlsx";

interface ItemsListProps {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export default function ItemsList({ items, setItems }: ItemsListProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleItemCreated = async (newItem: Item) => {
    setItems([...items, newItem]);
  };

  const handleDeleteItem = async (id: string) => {
    setItems(items.filter((item) => item.numbering !== id));
  };

  const handleItemsDocumentUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          }) as any[][];

          // Skip header row and process data
          const processedItems: Item[] = rawData.slice(1).map((row) => ({
            numbering: row[0]?.toString() || "",
            detail: row[1]?.toString() || "",
            family: row[2]?.toString() || "",
            subfamily: row[3]?.toString() || "",
            brand: row[4]?.toString() || "",
            model: row[5]?.toString() || "",
            quantity: Number(row[6]) || 0,
            unit: "unidad",
            partNumber: row[7]?.toString() || "",
            productNumber: row[8]?.toString() || "",
          }));

          // Validate items before adding
          const validItems = processedItems.filter(
            (item) => item.numbering && item.detail && item.quantity > 0
          );

          if (validItems.length === 0) {
            console.error(
              "No se encontraron items válidos en el archivo Excel"
            );
            return;
          }

          setItems([...items, ...validItems]);
          console.log(`Se agregaron ${validItems.length} items correctamente`);

          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } catch (error) {
          console.error("Error processing Excel file:", error);
          console.error("Error al procesar el archivo Excel");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="w-full flex justify-center items-center max-w-4xl flex-col">
      <div className="border rounded-md max-h-[30vw] relative overflow-auto w-[54vw]">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Numeración</TableHead>
              <TableHead>Detalle</TableHead>
              <TableHead>Familia</TableHead>
              <TableHead>Subfamilia</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Part Number</TableHead>
              <TableHead>Nro. Producto Cliente</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow className="h-36">
                <TableCell
                  colSpan={8}
                  className="text-sm m-auto h-full  text-center text-gray-500"
                >
                  No hay items agregados
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.numbering} className="text-sm">
                  <TableCell>{item.numbering}</TableCell>
                  <TableCell>{item.detail}</TableCell>
                  <TableCell>{item.family}</TableCell>
                  <TableCell>{item.subfamily}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.quantity + " " + item.unit}</TableCell>
                  <TableCell>{item.partNumber}</TableCell>
                  <TableCell>{item.productNumber}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteItem(item.numbering)}
                      className="text-black hover:text-red-600 mx-2"
                    >
                      <X className="w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog>
        <div className="flex justify-center items-center w-full mt-6 gap-1">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleItemsDocumentUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            className="bg-primary/10 text-primary items-center gap-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={14} />
            Cargar Items
          </Button>
          <DialogTrigger asChild>
            <Button className=" bg-primary text-white flex items-center gap-1">
              <PlusCircle size={16} />
              Agregar Item
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar nuevo item</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreateItem onItemCreated={handleItemCreated} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
