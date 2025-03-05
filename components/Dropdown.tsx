"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, ChevronUp, X } from "lucide-react";

export interface DropdownItem {
  id: number;
  name: string;
}

interface CustomFormProps {
  closeDialog: () => void;
}

type CustomFormType = React.ReactElement<CustomFormProps>;

interface DropdownProps {
  fetchItems: () => Promise<DropdownItem[]>;
  addItem?: (name: string) => Promise<number>;
  onSelect: (item: DropdownItem) => void;
  value?: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  customForm?: CustomFormType;
}

export default function Dropdown({
  fetchItems,
  addItem,
  onSelect,
  label,
  value,
  error,
  disabled,
  customForm,
}: DropdownProps) {
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<DropdownItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
      setFilteredItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchItems]);

  useEffect(() => {
    if (isOpen) {
      loadItems();
      // LIMPIAR INPUT BUSQUEDA
      setSearchValue("");
    }
  }, [isOpen, loadItems]);

  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // DROPDOWN DISABLED NO SE DEBE PODER ABRIR
  useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);
    }
  }, [disabled, isOpen]);

  useEffect(() => {
    // FILTRAR ITEMS SEGUN TERM
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }, [items, searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedValue(item.name);
    setSearchValue("");
    setIsOpen(false);
    onSelect(item);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue("");
    onSelect({ id: 0, name: "" });
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newItemName.trim() || !addItem) return;

    try {
      setIsLoading(true);
      const itemId = await addItem(newItemName.trim());

      const newItem = { name: newItemName, id: itemId };

      setItems((prevItems) => [...prevItems, newItem]);
      handleSelect(newItem);

      setNewItemName("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding new item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-[600] text-gray-700">
          {label}
        </label>
      )}
      <div className="relative w-full" ref={dropdownRef}>
        <div
          onClick={toggleDropdown}
          className={`w-full px-2 py-2 text-sm border rounded-md flex justify-between items-center ${
            error ? "border-red-500" : "border-gray-300"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span className={`${selectedValue || "text-gray-400"}`}>
            {selectedValue || "Seleccionar..."}
          </span>
          <div className="flex items-center">
            {selectedValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="mr-1 rounded-full hover:bg-gray-200 focus:outline-none"
                disabled={disabled}
              >
                <X size={14} />
              </button>
            )}
            {!disabled && (
              <ChevronUp
                size={16}
                className={`transition-transform ${isOpen ? "" : "transform rotate-180"}`}
              />
            )}
          </div>
        </div>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        {/* DROPDOWN ABIERTO */}
        <div
          className={`absolute z-10 w-full mt-1 bg-white border rounded-md overflow-hidden transform transition-all duration-200 ease-in-out ${
            isOpen && !disabled
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="relative border-b">
            <div className="p-2">
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                className="w-[85%] px-2 py-1 text-sm focus:outline-none border rounded-md"
                placeholder="Buscar..."
                disabled={disabled || isLoading}
              />
            </div>

            {isLoading && (
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
              </div>
            )}

            {!disabled && (addItem || customForm) && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <Plus size={16} />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar nuevo elemento</DialogTitle>
                  </DialogHeader>
                  {customForm ? (
                    React.cloneElement(customForm, { closeDialog })
                  ) : (
                    <form onSubmit={handleAddItem} className="mt-4">
                      <Input
                        type="text"
                        value={newItemName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNewItemName(e.target.value)
                        }
                        placeholder="Nombre del nuevo elemento"
                        disabled={isLoading}
                      />
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          type="button"
                          onClick={() => setIsDialogOpen(false)}
                          variant="secondary"
                          className="px-2"
                          disabled={isLoading}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          className="px-2 text-white"
                          disabled={isLoading || !newItemName.trim()}
                        >
                          {isLoading ? "Agregando..." : "Agregar"}
                        </Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* LISTA OPCIONES */}
          <div className="max-h-60 overflow-auto">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
