"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import StepContent from "./StepContent";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";

export default function Create() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = async () => {
    setIsCreating(true);
    // Simular la creación de la cotización
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCreating(false);
    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col w-full h-full bg-background p-[20px]">
      <div className="w-full h-[7vw] rounded-[10px] mb-4 bg-gradient-to-r from-primary to-sky-200 flex-shrink-0">
        <div className="flex flex-col justify-end items-start h-full p-4">
          <h2 className="text-[2vw] leading-[0.85] font-semibold text-white">
            Nueva Cotización
          </h2>
          <p className="text-[0.8vw] leading-[1] ml-1 text-white mt-2 opacity-90">
            Crea una nueva cotización
          </p>
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-6 w-full p-[20px] border-[2px] border-gray-100 rounded-[10px] relative">
        {isCreating || isSuccess ? (
          <SuccessAnimation isCreating={isCreating} isSuccess={isSuccess} />
        ) : (
          <>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <div className="flex-grow overflow-hidden">
              <StepContent step={currentStep} />
            </div>
            <div className="flex justify-between mt-auto">
              <Button
                className="px-4 py-2 bg-neutral-200 text-neutral-600 rounded-md hover:bg-neutral-300 disabled:opacity-50"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Anterior
              </Button>
              {currentStep === totalSteps ? (
                <Button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-primary text-white rounded-[6px]"
                >
                  Crear Cotización
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="px-4 py-2 bg-primary text-white rounded-[6px]"
                >
                  Siguiente
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
