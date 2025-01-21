"use client";

import Button from "@/components/Button";
import { Avatar } from "@/components/ui/avatar";
import { CalendarIcon, DollarSignIcon, UserIcon } from "lucide-react";

export default function CurrentQuotationCard() {
  const usersWorking = 3;
  const quotationData = {
    id: "COT-2023-001",
    client: "Acme Corporation",
    total: 15000.0,
    date: "2023-07-15",
    status: "En progreso",
  };

  return (
    <div className="w-full h-[65%] bg-white border border-neutral-200 shadow-sm rounded-[18px] relative">
      <div className="flex flex-col p-4 relative">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-md font-[600] text-black">Cotización reciente</h2>
          <div className="flex flex-col items-center w-[25%]">
            <div className="flex -space-x-2 overflow-hidden">
              <Avatar className="inline-block border-2 size-7 border-white">
                <img src="/default-profile-pic.png" alt="User 1" />
              </Avatar>
              <Avatar className="inline-block border-2 size-7 border-white">
                <img src="/default-profile-pic.png" alt="User 2" />
              </Avatar>
              <Avatar className="inline-block border-2 size-7 border-white">
                <img src="/default-profile-pic.png" alt="User 3" />
              </Avatar>
            </div>
            <span className="text-xs text-neutral-600 w-[90%] text-center">
              {usersWorking} usuarios trabajando en esta cotización
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">
              ID Cotización:
            </span>
            <span className="text-sm text-neutral-900">{quotationData.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">
              Cliente:
            </span>
            <span className="text-sm text-neutral-900">
              {quotationData.client}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">Total:</span>
            <span className="text-sm text-neutral-900">
              ${quotationData.total.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">Fecha:</span>
            <span className="text-sm text-neutral-900">
              {quotationData.date}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">
              Estado:
            </span>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {quotationData.status}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 w-auto flex justify-end gap-2 items-end h-auto">
        <Button variant="secondary" className="px-3 py-2 text-sm">
          Ver más cotizaciones
        </Button>
        <Button
          variant="primary"
          className="px-3 py-2 bg-neutral-900 text-white text-sm"
        >
          Abrir cotización
        </Button>
      </div>
    </div>
  );
}
