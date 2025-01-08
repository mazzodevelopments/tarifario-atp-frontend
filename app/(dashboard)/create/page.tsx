"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import StepContent from "./StepContent";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";

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
      <Header
        title="Nueva Cotización"
        description="Crea una nueva cotización"
        className="bg-gradient-to-r from-primary to-sky-200"
      />
      <div className="flex-grow flex flex-col gap-6 w-full p-[20px] bg-sky-50 rounded-[18px] relative">
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
