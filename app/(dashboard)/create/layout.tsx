"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Header from "@/app/(dashboard)/components/Header";
import ProgressBar from "@/app/(dashboard)/create/ProgressBar";
import { useExpo } from "@/context/ExpoContext";

const steps = [
  { title: "Cargar Datos", path: "/create" },
  { title: "Items", path: "/create/[quotationId]/items" },
  { title: "Compras", path: "/create/[quotationId]/purchase-data" },
  { title: "Logística", path: "/create/[quotationId]/logistic" },
  { title: "Ventas", path: "/create/[quotationId]/sales-data" },
  { title: "Presupuestos", path: "/create/[quotationId]/select-budgets" },
  { title: "Selección", path: "/create/[quotationId]/review" },
  { title: "Confirmación", path: "/create/[quotationId]/confirm" },
];

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const pathname = usePathname();
  const { quotationId } = useParams();
  const { isExpo } = useExpo();

  useEffect(() => {
    const findCurrentStepIndex = () => {
      return steps.findIndex((step) => {
        const dynamicPath = step.path.replace(
          "[quotationId]",
          quotationId?.toString() || "",
        );
        return pathname === dynamicPath;
      });
    };

    const stepIndex = findCurrentStepIndex();

    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, [pathname, quotationId]);

  return (
    <div className="flex flex-col w-full h-full bg-neutral-50">
      <Header title="Nueva Cotización" />
      <div className="flex w-full h-full p-[1vw]">
        <div className="flex flex-col gap-6 w-full h-full p-[20px] border border-neutral-200 shadow-sm bg-white rounded-[18px] relative">
          <div className="flex w-full flex-col h-full">
            <div className="flex w-full justify-center items-center h-full">
              <div className="w-full h-full relative flex flex-col">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-xl font-[800]">
                    {`Etapa ${currentStep + 1} - ${steps[currentStep].title}`}
                  </h3>
                  {isExpo && (
                    <span className="text-lg text-purple-800 font-[800]">
                      EXPO
                    </span>
                  )}
                </div>
                <div className="flex justify-center relative h-full items-center">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[25%] flex justify-center items-start gap-6">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={steps.length}
            steps={steps}
          />
        </div>
      </div>
    </div>
  );
}
