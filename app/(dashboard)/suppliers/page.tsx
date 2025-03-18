"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/Button";
import { CatalogService } from "@/services/CatalogService";
import type { Supplier } from "@/types/Supplier";
import SupplierForm from "@/app/(dashboard)/create/[quotationId]/purchase-data/forms/SupplierForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Pencil } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import { useRouter } from "next/navigation";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editedSupplier, setEditedSupplier] = useState<Supplier | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const fetchedSuppliers = await CatalogService.listSuppliers();
        setSuppliers(fetchedSuppliers);
        setShouldFetch(false);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    if (shouldFetch) {
      fetchSuppliers();
    }
  }, [shouldFetch]);

  const handleSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    isNational: boolean;
    isInternational: boolean;
  }) => {
    setIsLoading(true);
    try {
      if (editedSupplier) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { families, ...supplierData } = editedSupplier;
        await CatalogService.editSupplier({ ...supplierData, ...data });
      } else {
        await CatalogService.addSupplier(data);
      }
      setEditedSupplier(null);
      setEditDialogOpen(false);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving supplier:", error);
    } finally {
      setIsLoading(false);
      setShouldFetch(true);
    }
  };

  const handleEdit = (supplier: Supplier) => {
    setEditedSupplier(supplier);
    setEditDialogOpen(true);
  };

  const handleViewDetails = (supplier: Supplier) => {
    router.push(`/suppliers/${supplier.id}`);
  };

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    } else if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "normal";
    }
    setSortConfig({ key, direction });
  };

  const getSortedSuppliers = () => {
    if (!sortConfig) {
      return suppliers;
    }

    const sortedSuppliers = [...suppliers];
    if (sortConfig.direction === "normal") {
      return sortedSuppliers;
    }

    sortedSuppliers.sort((a, b) => {
      if (sortConfig.key === "name" || sortConfig.key === "email") {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortConfig.key === "type") {
        const typeA = getTypeValue(a);
        const typeB = getTypeValue(b);
        if (typeA < typeB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (typeA > typeB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });

    return sortedSuppliers;
  };

  const getTypeValue = (supplier: Supplier) => {
    if (supplier.isNational && supplier.isInternational) {
      return 2;
    } else if (supplier.isNational) {
      return 0;
    } else if (supplier.isInternational) {
      return 1;
    }
    return -1;
  };

  const sortedSuppliers = getSortedSuppliers();

  const fetchSearchResults = async (searchTerm: string) => {
    const filteredSuppliers: { id: number; name: string }[] = suppliers
      .filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
      }));
    return adaptToDropdown(filteredSuppliers, "id", "name");
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start w-[12vw]">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black mt-1">
              Proveedores
            </h2>
          </div>
          <SearchInput
            placeholder="Buscar proveedores"
            onSearch={fetchSearchResults}
            link="/suppliers"
          />
        </div>
      </div>
      <div className="mt-6 px-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="primary"
              className="py-2 px-4 rounded-lg font-semibold text-sm border bg-primary/5 text-primary"
            >
              Agregar Proveedor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
            </DialogHeader>
            <SupplierForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              closeDialog={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full px-6 pb-6 pt-4">
        <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
          <div className="border rounded-[12px] overflow-auto max-h-[70vh] relative w-full">
            <Table className="w-full bg-white">
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead
                    className="w-1/5 text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Nombre{" "}
                      {(sortConfig?.key === "name" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) ||
                        null}
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-1/5 text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Email{" "}
                      {(sortConfig?.key === "email" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) ||
                        null}
                    </div>
                  </TableHead>
                  <TableHead className="w-1/5 text-primary font-[600] text-center select-none">
                    Teléfono
                  </TableHead>
                  <TableHead
                    className="w-1/5 text-primary font-[600] text-center cursor-pointer select-none"
                    onClick={() => requestSort("type")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Tipo{" "}
                      {(sortConfig?.key === "type" &&
                        {
                          ascending: <ArrowUp size={14} />,
                          descending: <ArrowDown size={14} />,
                        }[sortConfig.direction]) ||
                        null}
                    </div>
                  </TableHead>
                  <TableHead className="w-1/5 text-primary font-[600] text-center select-none">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSuppliers.length > 0 ? (
                  sortedSuppliers.map((supplier) => (
                    <TableRow key={supplier.id} className="text-sm text-center">
                      <TableCell className="font-[600] text-black">
                        {supplier.name}
                      </TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>
                        <div
                          className={`py-1 px-3 rounded-3xl inline-block ${getTypeStyles(
                            supplier.isNational,
                            supplier.isInternational,
                          )}`}
                        >
                          {supplier.isNational && supplier.isInternational
                            ? "Ambas"
                            : supplier.isNational
                              ? "Nacional"
                              : "Internacional"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => handleEdit(supplier)}
                          >
                            <Pencil className="w-4 h-4 text-primary" />
                          </Button>
                          <Button
                            variant="secondary"
                            className="p-1 h-auto hover:bg-gray-100"
                            onClick={() => handleViewDetails(supplier)}
                          >
                            Detalles
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-36">
                    <TableCell
                      colSpan={5}
                      className="text-sm m-auto h-full text-center text-gray-500"
                    >
                      No hay proveedores registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Proveedor</DialogTitle>
          </DialogHeader>
          <SupplierForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            initialData={editedSupplier || undefined}
            closeDialog={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const getTypeStyles = (isNational: boolean, isInternational: boolean) => {
  if (isNational && isInternational) {
    return "bg-green-100 text-green-600";
  } else if (isNational) {
    return "bg-blue-100 text-blue-600";
  } else if (isInternational) {
    return "bg-purple-100 text-purple-600";
  }
  return "bg-gray-100 text-gray-600";
};
