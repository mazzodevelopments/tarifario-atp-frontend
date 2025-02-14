import type React from "react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface DropdownItem {
  id: number;
  name: string;
}

interface DropdownProps {
  fetchItems: () => Promise<DropdownItem[]>;
  addItem?: (name: string) => Promise<DropdownItem>;
  onSelect: (item: DropdownItem) => void;
  value?: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function Dropdown({
  fetchItems,
  addItem,
  onSelect,
  label,
  value,
  required = false,
  error,
  disabled,
}: DropdownProps) {
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<DropdownItem[]>([]);
  const [inputValue, setInputValue] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchItems().then(setItems);
  }, [fetchItems]);

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

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    );
  }, [items, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (item: DropdownItem) => {
    setInputValue(item.name);
    setIsOpen(false);
    onSelect(item);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim() && addItem) {
      const newItem = await addItem(newItemName.trim());
      setItems([...items, newItem]);
      handleSelect(newItem);
      setNewItemName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-[600] text-gray-700">{label}</label>
      <div className="relative w-full" ref={dropdownRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => setIsOpen(true)}
            className={`w-full px-2 py-2 text-sm border rounded-md focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Seleccionar o buscar..."
            required={required}
            disabled={disabled}
          />
          {addItem && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar nuevo elemento</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Input
                    type="text"
                    value={newItemName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewItemName(e.target.value)
                    }
                    placeholder="Nombre del nuevo elemento"
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      type="button"
                      onClick={() => setIsDialogOpen(false)}
                      variant="secondary"
                      className="px-2"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAddItem}
                      variant="primary"
                      className="px-2 text-white"
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <div
          className={`absolute z-10 w-full mt-1 bg-white border rounded-md max-h-60 overflow-auto transform transition-all duration-200 ease-in-out ${
            isOpen && filteredItems.length > 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
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
  );
}
