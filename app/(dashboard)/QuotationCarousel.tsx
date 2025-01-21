"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  User,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/Button";

interface Cotizacion {
  id: string;
  name: string;
  client: string;
  date: string;
  value: number;
}

interface QuotationSliderProps {
  cotizaciones: Cotizacion[];
}

export function QuotationSlider({ cotizaciones }: QuotationSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full h-[35%] bg-white border border-neutral-200 shadow-sm rounded-[18px] relative overflow-hidden select-none">
      <div className="flex flex-col p-3 relative">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-md font-[600] text-black">
            Cotizaciones completadas
          </h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={scrollPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" onClick={scrollNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex">
            {cotizaciones.map((cotizacion) => (
              <div
                key={cotizacion.id}
                className="flex-[0_0_100%] min-w-0 mr-4 bg-white border-[0.5px] border-[#ebebebcc] rounded-lg p-4 cursor-pointer hover:bg-gray-50 flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-black font-[800] mb-2">
                      {cotizacion.name}
                    </h3>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      {cotizacion.client}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} className="text-gray-400" />
                      {cotizacion.date.split("T")[0]}
                    </div>
                    <div className="flex items-center text-primary font-[800]">
                      <DollarSign size={16} />
                      {cotizacion.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-[50%] translate-x-[-50%] w-[60%] flex justify-center gap-2 items-end h-auto">
        <Button
          variant="secondary"
          className="px-3 py-2 text-sm flex flex-row items-center"
        >
          <span>Ver todas las cotizaciones</span> <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
