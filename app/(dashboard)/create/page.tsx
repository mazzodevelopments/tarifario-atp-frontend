"use client";

import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";
import IncotermSelect from "@/app/(dashboard)/create/steps/IncotermSelect";

export default function Create() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedIncoterm, setSelectedIncoterm] = useState("");
  const [totalSteps, setTotalSteps] = useState(1);

  const incoterms = [
    { value: "EXW", label: "EXW - Ex Works", steps: 5 },
    { value: "FCA", label: "FCA - Free Carrier", steps: 6 },
    { value: "CPT", label: "CPT - Carriage Paid To", steps: 7 },
    { value: "CIP", label: "CIP - Carriage and Insurance Paid To", steps: 8 },
    { value: "DAP", label: "DAP - Delivered At Place", steps: 7 },
    { value: "DPU", label: "DPU - Delivered at Place Unloaded", steps: 8 },
    { value: "DDP", label: "DDP - Delivered Duty Paid", steps: 9 },
    { value: "FAS", label: "FAS - Free Alongside Ship", steps: 6 },
    { value: "FOB", label: "FOB - Free On Board", steps: 7 },
    { value: "CFR", label: "CFR - Cost and Freight", steps: 8 },
    { value: "CIF", label: "CIF - Cost, Insurance, and Freight", steps: 9 },
  ];

  useEffect(() => {
    if (selectedIncoterm) {
      const selectedIncotermData = incoterms.find(
        (inco) => inco.value === selectedIncoterm,
      );
      if (selectedIncotermData) {
        setTotalSteps(selectedIncotermData.steps);
      }
    }
  }, [selectedIncoterm]);

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <IncotermSelect
            incoterms={incoterms}
            selectedValue={selectedIncoterm}
            setSelectedValue={setSelectedIncoterm}
          />
        );
      default:
        return <p>Contenido de la etapa {currentStep + 1}</p>;
    }
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
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps - 1}
            />
            <div className="flex-grow overflow-hidden">
              <div className="h-full relative flex flex-col">
                <h3 className="text-xl font-semibold mb-4">
                  Etapa {currentStep + 1}
                </h3>
                <div className="flex justify-center relative pt-[10%] items-center w-full mx-auto">
                  {renderStepContent()}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-auto">
              <Button
                className="px-4 py-2 bg-neutral-200 text-neutral-600 rounded-md hover:bg-neutral-300 disabled:opacity-50"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Anterior
              </Button>
              {currentStep === totalSteps - 1 ? (
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
                  disabled={currentStep === 0 && !selectedIncoterm}
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
