"use client";

import Button from "@/components/Button";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuotationData } from "@/types/QuotationData";

export default function CurrentQuotationCard() {
  const usersWorking = 12;
  const quotation: QuotationData = {
    taskNumber: "A25R-0005",
    client: "MicroTech Solutions",
    buyer: "Andrea Gómez",
    receptionDate: "2025-01-18",
    uploadDate: "2025-01-19",
    expirationDateTime: "2025-02-05T20:00:00",
    materialsNeededDate: "2025-02-01",
    customerRequestNumber: "REQ-2025-005",
    atpInternRequestNumber: "ATP-INT-9042",
  };

  // const formatNumber = (num: number) => {
  //   return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  // };

  return (
    <div className="w-full h-[65%] bg-white border border-neutral-200 shadow-sm rounded-[18px] relative">
      <div className="flex flex-col p-4 relative">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-lg font-[800] text-black">Cotización reciente</h2>
          <div className="flex flex-col items-end w-[25%]">
            <TooltipProvider>
              <Tooltip delayDuration={250}>
                <TooltipTrigger>
                  <div className="flex -space-x-2 overflow-hidden items-center hover:bg-neutral-100 p-1 rounded-md">
                    <Avatar className="inline-block border-2 size-7 border-white">
                      <img src="/default-profile-pic.png" alt="User 1" />
                    </Avatar>
                    <Avatar className="inline-block border-2 size-7 border-white">
                      <img src="/default-profile-pic.png" alt="User 2" />
                    </Avatar>
                    <Avatar className="inline-block border-2 size-7 border-white">
                      <img src="/default-profile-pic.png" alt="User 3" />
                    </Avatar>
                    <div className="pl-3">
                      <span className="font-[600]">+9</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-sky-100">
                  <p className="text-primary text-[1.2em] font-[600]">
                    {usersWorking} usuarios trabajando
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">
              N# Tarea:
            </span>
            <span className="text-md text-neutral-900">
              {quotation.taskNumber}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">
              Cliente:
            </span>
            <span className="text-md text-neutral-900">{quotation.client}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">Total:</span>
            <span className="text-md text-neutral-900">$56000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">Fecha:</span>
            <span className="text-md text-neutral-900">
              {new Date(quotation.uploadDate).toLocaleDateString("es-ES")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">
              Estado:
            </span>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              En Progreso
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
