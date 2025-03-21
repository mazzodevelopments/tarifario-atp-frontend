"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { User, Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";

export function QuotationSlider({
  quotations,
}: {
  quotations: {
    taskNumber: string;
    expirationDateTime: string;
    buyerName: string;
    clientName: string;
  }[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className="hidden 2xl:block w-full h-[35%] bg-white border border-neutral-200 shadow-sm rounded-[18px] relative overflow-hidden select-none">
        <div className="flex flex-col p-3 relative">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-[800] text-black">
              Cotizaciones completadas
            </h2>
            {quotations.length > 1 && (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={scrollPrev}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={scrollNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex">
              {quotations.map((quotation) => (
                <Link
                  key={quotation.taskNumber}
                  href={`/quotations/${quotation.taskNumber}`}
                  className="flex-[0_0_100%] min-w-0 mr-4 bg-white border-[0.5px] border-[#ebebebcc] rounded-lg p-4 cursor-pointer hover:bg-gray-50 flex flex-col"
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-black font-[800]">
                        {quotation.taskNumber}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} className="text-gray-400" />
                        {quotation.expirationDateTime.split("T")[0]}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      {quotation.buyerName} ({quotation.clientName})
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-[50%] translate-x-[-50%] w-[60%] flex justify-center gap-2 items-end h-auto">
          <Link href="/quotations" passHref>
            <Button
              variant="secondary"
              className="px-3 py-2 text-sm flex flex-row items-center"
            >
              <span>Ver todas las cotizaciones</span> <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
      <Button
        variant="secondary"
        className="flex 2xl:hidden bg-white text-center justify-center items-center shadow-sm gap-1 relative"
      >
        <span className="mt-[0.5px]">Ver historial de cotizaciones</span>
        <Clock size={14} />
      </Button>
    </>
  );
}
