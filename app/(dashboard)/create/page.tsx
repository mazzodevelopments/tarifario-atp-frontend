"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";
import QuotationDetails from "@/app/(dashboard)/create/steps/QuotationDetails";
import ItemsList, { Item } from "@/app/(dashboard)/create/steps/Items/ItemList";
import BudgetList, {
  Budget,
} from "@/app/(dashboard)/create/steps/Budgets/BudgetList";

const steps = [
  { title: "Cargar Datos Cotización" },
  { title: "Agregar Items" },
  { title: "Configurar Presupuestos" },
  { title: "Agregar Transportes" },
  { title: "Configurar Márgenes" },
  { title: "Revisar Impuestos" },
  { title: "Agregar Condiciones" },
  { title: "Vista Previa" },
  { title: "Confirmar y Crear" },
];

export default function Create() {
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps.length;
  const [quotationData, setQuotationData] = useState({
    name: "",
    client: "",
    buyer: "",
  });
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      detail: "Motor eléctrico",
      brand: "Siemens",
      quantity: 10,
      unit: "unidades",
      partNumber: "MTR-1234",
    },
    {
      id: "2",
      detail: "Bomba hidráulica",
      brand: "Bosch",
      quantity: 5,
      unit: "unidades",
      partNumber: "BMP-5678",
    },
    {
      id: "3",
      detail: "Rodamiento de bolas",
      brand: "SKF",
      quantity: 50,
      unit: "unidades",
      partNumber: "RDM-9101",
    },
  ]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

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
      case 1:
        return <ItemsList items={items} setItems={setItems} />;
      case 2:
        return (
          <BudgetList budgets={budgets} setBudgets={setBudgets} items={items} />
        );
      default:
        return <p>Contenido de la etapa {currentStep + 1}</p>;
    }
  };

  const renderStepTitle = () => {
    return steps[currentStep]?.title || "";
  };

  return (
    <div className="flex flex-col w-full h-full bg-transparent px-[20]">
      <Header
        title="Nueva Cotización"
        description="Crea una nueva cotización"
      />
      <div className="flex w-full h-full">
        <div className="flex-grow flex flex-col gap-6 w-[70%] h-full p-[20px] border-[0.5px] border-[#ebebebcc] shadow-sm bg-white rounded-[18px] relative">
          {isCreating || isSuccess ? (
            <SuccessAnimation isCreating={isCreating} isSuccess={isSuccess} />
          ) : (
            <>
              <div className="flex-grow overflow-hidden">
                <div className="h-full relative flex flex-col">
                  <h3 className="text-xl font-[800] mb-4">{`Etapa ${
                    currentStep + 1
                  } - ${renderStepTitle()}`}</h3>
                  <div className="flex justify-center relative h-full items-center w-full mx-auto">
                    {renderStepContent()}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-auto">
                <Button
                  className="px-3 py-1 disabled:opacity-50"
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Anterior
                </Button>
                {currentStep === totalSteps - 1 ? (
                  <Button onClick={handleCreate} variant="primary">
                    Crear Cotización
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="primary"
                    className="text-white"
                    disabled={isNextButtonDisabled()}
                  >
                    Siguiente
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
        <div className="w-[30%] flex justify-center items-start gap-6">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            steps={steps}
          />
        </div>
      </div>
    </div>
  );
}
