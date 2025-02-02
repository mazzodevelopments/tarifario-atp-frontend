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

interface ItemsListProps {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export default function ItemsList({ items, setItems }: ItemsListProps) {
  const handleItemCreated = async (newItem: Item) => {
    setItems([...items, newItem]);
  };

  const handleDeleteItem = async (id: string) => {
    setItems(items.filter((item) => item.numbering !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="border rounded-md overflow-x-hidden max-h-[18vw]">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Numeración</TableHead>
              <TableHead>Detalle</TableHead>
              <TableHead>Familia</TableHead>
              <TableHead>Subfamilia</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Part Number</TableHead>
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
                  <TableCell>{item.quantity + " " + item.unit}</TableCell>
                  <TableCell>{item.partNumber}</TableCell>
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
        <div className="flex justify-center items-center w-full mt-6">
          <DialogTrigger asChild>
            <Button className="text-sm px-4 py-2 bg-primary text-white flex items-center gap-2">
              <span className="text-md mr-2">+</span>
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
