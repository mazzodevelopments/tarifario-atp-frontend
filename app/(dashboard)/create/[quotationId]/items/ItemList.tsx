"use client";
import Button from "@/components/Button";
import { X } from "react-feather";
import CreateItem from "@/app/(dashboard)/create/[quotationId]/items/CreateItem";
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
import type {
  CreateItem as CreateItemType,
  CreateMassiveLoadItems,
  ListedItem,
} from "@/types/Item";
import { Pencil, PlusCircle, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import type React from "react";
import { QuoteService } from "@/services/QuoteService";

export default function ItemsList({ quotationId }: { quotationId: number }) {
  const [items, setItems] = useState<ListedItem[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [editingItem, setEditingItem] = useState<ListedItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchQuotationItems = async () => {
      try {
        setIsLoading(true);
        const quotationItems =
          await QuoteService.getQuotationItems(quotationId);
        setItems(quotationItems);
        setIsLoading(false);
        setShouldFetch(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching quotation items:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los items",
          variant: "destructive",
        });
      }
    };

    fetchQuotationItems();
  }, [shouldFetch, toast]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleItemCreated = async (newItem: CreateItemType) => {
    try {
      const item = await QuoteService.addItem(newItem, quotationId);
      setItems([...items, item]);
      setShouldFetch(true);
      setIsDialogOpen(false);
      toast({
        title: "Item creado",
        description: `El item "${newItem.detail}" ha sido creado exitosamente`,
      });
    } catch (error) {
      console.error("Error adding item:", error);
      toast({
        title: "Error",
        description: "No se pudo crear el item",
        variant: "destructive",
      });
    }
  };

  const handleItemUpdated = async (newUpdatedItem: CreateItemType) => {
    try {
      const updatedItem = await QuoteService.updateItem(
        newUpdatedItem,
        editingItem!.id,
      );
      setItems(
        items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      setShouldFetch(true);
      setIsDialogOpen(false);
      toast({
        title: "Item actualizado",
        description: "El item ha sido actualizado exitosamente",
      });
    } catch (error) {
      console.error("Error updating item:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el item",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await QuoteService.deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
      toast({
        title: "Item eliminado",
        description: "El item ha sido eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el item",
        variant: "destructive",
      });
    }
  };

  const handleItemsDocumentUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          }) as (string | number)[][];

          const processedItems: CreateMassiveLoadItems[] = rawData
            .slice(2)
            .map((row) => ({
              family: row[0]?.toString() || "",
              subfamily: row[1]?.toString() || "",
              detail: row[2]?.toString() || "",
              brand: row[3]?.toString() || null,
              model: row[4]?.toString() || null,
              quantity: Number(row[5]) || 0,
              unit: row[6]?.toString() || "",
              partNumber: row[7]?.toString() || "",
              productNumber: row[8]?.toString() || "",
            }));

          const validItems = processedItems.filter(
            (item) => item.detail && item.quantity > 0,
          );

          if (validItems.length === 0) {
            toast({
              title: "Error",
              description:
                "No se encontraron items válidos en el archivo Excel",
              variant: "destructive",
            });
            return;
          }

          try {
            await QuoteService.addItems(validItems, quotationId);
            setShouldFetch(true);
            toast({
              title: "Items cargados",
              description: `Se agregaron ${validItems.length} items correctamente`,
            });
          } catch (error) {
            console.error("Error adding items:", error);
            toast({
              title: "Error",
              description: "No se pudieron cargar los items",
              variant: "destructive",
            });
          }

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } catch (error) {
          console.error("Error processing Excel file:", error);
          toast({
            title: "Error",
            description: "Error al procesar el archivo Excel",
            variant: "destructive",
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full flex justify-center items-center max-w-4xl flex-col">
      <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
        <div className="border rounded-[12px] overflow-auto max-h-[25vw] relative w-[54vw]">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-primary/5">
                <TableHead className="text-primary font-[600] text-center">
                  Numeración
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Detalle
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Familia
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Subfamilia
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Marca
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Modelo
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Cantidad
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Part Number
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Nro. Producto Cliente
                </TableHead>
                <TableHead className="text-primary font-[600] text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow className="h-36">
                  <TableCell
                    colSpan={10}
                    className="text-sm m-auto h-full text-center text-gray-500"
                  >
                    {isLoading ? "Cargando..." : "No hay items agregados"}
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow
                    key={item.id}
                    className="text-sm text-center hover:bg-transparent"
                  >
                    <TableCell>{item.numbering}</TableCell>
                    <TableCell>{item.detail}</TableCell>
                    <TableCell>{item.family}</TableCell>
                    <TableCell>{item.subfamily.name}</TableCell>
                    <TableCell>{item.brand ? item.brand?.name : "-"}</TableCell>
                    <TableCell>{item.model ? item.model?.name : "-"}</TableCell>
                    <TableCell>
                      {item.quantity + " " + item.unit.name}
                    </TableCell>
                    <TableCell>{item.partNumber}</TableCell>
                    <TableCell>{item.productNumber}</TableCell>
                    <TableCell className="flex flex-row">
                      <Button
                        variant="secondary"
                        className="p-1 h-auto hover:bg-gray-100"
                        onClick={() => {
                          setEditingItem(item);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-4 text-primary" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(item.id)}
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex justify-center items-center w-full mt-6 gap-2">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleItemsDocumentUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            className="bg-primary/5 border border-primary/20 text-primary items-center gap-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={14} className="mt-[-1px]" />
            Cargar Items
          </Button>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white flex items-center gap-1">
              <PlusCircle size={16} />
              <span className="mt-[1.5px]">Agregar Item</span>
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="h-[]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingItem ? "Editar Item" : "Agregar nuevo item"}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreateItem
              onItemCreated={handleItemCreated}
              onItemUpdated={handleItemUpdated}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              onDialogClose={handleDialogClose}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
