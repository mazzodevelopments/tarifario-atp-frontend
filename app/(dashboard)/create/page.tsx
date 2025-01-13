"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";
import QuotationDetails from "@/app/(dashboard)/create/steps/QuotationDetails";

export default function Create() {
  // ANIMACIÓN FINAL
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // ESTADOS
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [quotationData, setQuotationData] = useState({
    name: "",
    client: "",
    buyer: "",
  });

  useEffect(() => {
    setTotalSteps(8);
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
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

  const isNextButtonDisabled = () => {
    if (currentStep === 0) {
      // Check if all properties in quotationData have non-empty values
      return Object.values(quotationData).some((value) => value.trim() === "");
    }
    return false;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <QuotationDetails
            quotationData={quotationData}
            setQuotationData={setQuotationData}
          />
        );
      default:
        return <p>Contenido de la etapa {currentStep + 1}</p>;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0:
        return "Ingresar Datos";
      default:
        return `Etapa ${currentStep + 1}`;
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-transparent px-[20]">
      <Header
        title="Nueva Cotización"
        description="Crea una nueva cotización"
      />
      <div className="flex-grow flex flex-col gap-6 w-full h-full p-[20px] bg-white rounded-[18px] relative">
        {isCreating || isSuccess ? (
          <SuccessAnimation isCreating={isCreating} isSuccess={isSuccess} />
        ) : (
          <>
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps - 1}
            />
            <div className="flex-grow overflow-hidden">
              <div className="h-full relative flex flex-col">
                <h3 className="text-xl font-semibold mb-4">{getStepTitle()}</h3>
                <div className="flex justify-center relative pt-[10%] items-center w-full mx-auto">
                  {renderStepContent()}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-auto">
              <Button
                className="px-3 py-1 bg-neutral-200 text-neutral-800 hover:bg-neutral-300 disabled:opacity-50"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Anterior
              </Button>
              {currentStep === totalSteps - 1 ? (
                <Button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-primary text-white"
                >
                  Crear Cotización
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="px-4 py-2 bg-primary text-white"
                  disabled={isNextButtonDisabled()}
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
