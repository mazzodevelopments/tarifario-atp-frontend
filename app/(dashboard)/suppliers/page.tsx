"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Pencil,
  Trash,
} from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import { useRouter } from "next/navigation";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editedSupplier, setEditedSupplier] = useState<Supplier | null>(null);
  const [supplierToDelete, setSupplierToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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

  const openDeleteDialog = (family: { id: number; name: string }) => {
    setSupplierToDelete({
      id: Number(family.id),
      name: family.name,
    });
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSupplierToDelete(null);
  };

  const handleSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    isNational: boolean;
    isInternational: boolean;
    families?: { id: number; name: string };
  }) => {
    setIsLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { families, ...submittedData } = data;

    try {
      if (editedSupplier) {
        await CatalogService.editSupplier({
          ...submittedData,
        });
      } else {
        await CatalogService.addSupplier({ ...submittedData });
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

  const handleDeleteSupplier = async () => {
    if (!supplierToDelete) return;

    setIsLoading(true);
    try {
      await CatalogService.deleteSupplier(supplierToDelete.id);
      setSuppliers(
        suppliers.filter((supplier) => supplier.id !== supplierToDelete.id)
      );
      setIsLoading(false);
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
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
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
      }));
    return adaptToDropdown(filteredSuppliers, "id", "name");
  };

  return (
    <RoleProtectedRoute allowedRoles={["Admin", "Superadmin"]}>
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
        <div className="mt-[1vw] px-[1vw]">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                className="py-2 px-4 rounded-[12px] font-semibold text-sm border bg-primary/5 text-primary"
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

        <div className="w-full p-[1vw]">
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
                          }[sortConfig.direction]) || <ArrowUpDown size={14} />}
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
                          }[sortConfig.direction]) || <ArrowUpDown size={14} />}
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
                          }[sortConfig.direction]) || <ArrowUpDown size={14} />}
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
                      <TableRow
                        key={supplier.id}
                        className="text-sm text-center"
                      >
                        <TableCell className="font-[600] text-black">
                          {supplier.name}
                        </TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell>
                          <div
                            className={`py-1 px-3 rounded-3xl inline-block ${getTypeStyles(
                              supplier.isNational,
                              supplier.isInternational
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
                              className="p-1 h-auto hover:bg-gray-100"
                              onClick={() => handleViewDetails(supplier)}
                            >
                              Detalles
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => handleEdit(supplier)}
                            >
                              <Pencil className="w-4 h-4 text-primary" />
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => openDeleteDialog(supplier)}
                            >
                              <Trash className="w-4 h-4 text-red-500" />
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

        {/* EDIT DIALOG*/}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Proveedor</DialogTitle>
            </DialogHeader>
            {editedSupplier && (
              <SupplierForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                initialData={editedSupplier || undefined}
                closeDialog={() => setEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* DELETE DIALOG */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <DialogTitle className="text-center">
                Confirmar eliminación
              </DialogTitle>
              <DialogDescription className="text-center">
                ¿Estás seguro de eliminar el proovedor{" "}
                <span className="font-medium">{supplierToDelete?.name}</span> de
                este proveedor?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-center gap-2 sm:gap-0 mt-2">
              <Button
                variant="secondary"
                onClick={closeDeleteDialog}
                className="flex-1 sm:flex-none"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleDeleteSupplier}
                className="flex-1 sm:flex-none bg-red-100 text-red-500"
                disabled={isLoading}
              >
                {isLoading ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </RoleProtectedRoute>
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
