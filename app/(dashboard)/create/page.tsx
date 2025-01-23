"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";
import QuotationDetails from "@/app/(dashboard)/create/steps/QuotationDetails";
import ItemsList from "@/app/(dashboard)/create/steps/Items/ItemList";
import BudgetList from "@/app/(dashboard)/create/steps/Budgets/BudgetList";
import SelectedBudgetsList from "@/app/(dashboard)/create/steps/Budgets/SelectedBudgetsList";
import type { QuotationData } from "@/types/QuotationData";
import type { Item } from "@/types/Item";
import type { Budget } from "@/types/Budget";

const steps = [
  { title: "Cargar Datos Cotización" },
  { title: "Agregar Items" },
  { title: "Configurar y Seleccionar Presupuestos" },
  { title: "Revisar Presupuestos Seleccionados" },
  { title: "Confirmar y Crear" },
];

export default function Create() {
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps.length;
  // ESTADOS COTIZACIÓN
  const [quotationData, setQuotationData] = useState<QuotationData | null>(
    null,
  );
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      family: "Motores",
      subfamily: "Eléctricos",
      detail: "Motor eléctrico",
      brand: "Siemens",
      quantity: 10,
      unit: "Unidades",
      partNumber: "MTR-1234",
      numbering: "P000000001",
    },
    {
      id: "2",
      family: "Hidráulicos",
      subfamily: "Bombas",
      detail: "Bomba hidráulica",
      brand: "Bosch",
      quantity: 5,
      unit: "Unidades",
      partNumber: "BMP-5678",
      numbering: "P000000002",
    },
    {
      id: "3",
      family: "Cables",
      subfamily: "Eléctricos",
      detail: "Cable eléctrico de cobre",
      brand: "General Cable",
      quantity: 100,
      unit: "Metros",
      partNumber: "CBL-2025",
      numbering: "P000000003",
    },
  ]);
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: "1",
      date: "2025-01-23",
      item: items[0].detail,
      origin: "China",
      destination: "Estados Unidos",
      supplier: "Tech Supplier Inc.",
      deliveryTime: 15,
      unitPrice: 100,
      currency: "USD",
      margin: 10,
      totalPrice: 1100,
      unitWeight: 1,
      totalWeight: 10,
      unit: "kg",
      incoterm: "FOB",
      transport: null,
      custom: null,
      delivery: null,
      numbering: "0000000001",
      stage: "COTI",
    },
    {
      id: "2",
      date: "2025-01-22",
      item: items[0].detail,
      origin: "Alemania",
      destination: "Estados Unidos",
      supplier: "Auto Parts GmbH",
      deliveryTime: 20,
      unitPrice: 150,
      currency: "EUR",
      margin: 15,
      totalPrice: 1725,
      unitWeight: 2,
      totalWeight: 20,
      unit: "kg",
      incoterm: "CIF",
      transport: null,
      custom: null,
      delivery: null,
      numbering: "0000000002",
      stage: "COTI",
    },
    {
      id: "3",
      date: "2025-01-20",
      item: items[1].detail,
      origin: "Vietnam",
      destination: "Australia",
      supplier: "VietFurnish Co.",
      deliveryTime: 25,
      unitPrice: 50,
      currency: "AUD",
      margin: 20,
      totalPrice: 1500,
      unitWeight: 5,
      totalWeight: 75,
      unit: "kg",
      incoterm: "EXW",
      transport: null,
      custom: null,
      delivery: null,
      numbering: "0000000003",
      stage: "COTI",
    },
    {
      id: "B004",
      date: "2025-01-18",
      item: items[2].detail,
      origin: "India",
      destination: "Estados Unidos",
      supplier: "Textile World",
      deliveryTime: 12,
      unitPrice: 25,
      currency: "GBP",
      margin: 10,
      totalPrice: 550,
      unitWeight: 0.5,
      totalWeight: 11,
      unit: "kg",
      incoterm: "DAP",
      transport: null,
      custom: null,
      delivery: null,
      numbering: "0000000004",
      stage: "COTI",
    },
    {
      id: "B005",
      date: "2025-01-17",
      item: items[0].detail,
      origin: "Suiza",
      destination: "Argentina",
      supplier: "SwissPharma AG",
      deliveryTime: 10,
      unitPrice: 200,
      currency: "CAD",
      margin: 5,
      totalPrice: 2100,
      unitWeight: 0.2,
      totalWeight: 2,
      unit: "kg",
      incoterm: "FCA",
      transport: null,
      custom: null,
      delivery: null,
      numbering: "0000000005",
      stage: "COTI",
    },
  ]);
  const [selectedBudgets, setSelectedBudgets] = useState<Budget[]>([]);

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
    setCurrentStep(currentStep + 1);
    // Simular la creación de la cotización
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (quotationData) {
      console.log("Creando cotización con fecha:", quotationData?.uploadDate);
    }
    setIsCreating(false);
    setIsSuccess(true);
  };

  const isNextButtonDisabled = () => {
    if (currentStep === 0) {
      return (
        !quotationData ||
        Object.keys(quotationData).some(
          (key) =>
            quotationData[key as keyof typeof quotationData].trim() === "",
        )
      );
    }
    if (currentStep === 1) {
      return items.length === 0;
    }
    if (currentStep === 2) {
      return budgets.length === 0 || selectedBudgets.length === 0;
    }
    return false;
  };

  const handleQuotationDataChange = (newData: typeof quotationData) => {
    setQuotationData(newData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <QuotationDetails
            onFormDataChange={handleQuotationDataChange}
            initialData={quotationData}
          />
        );
      case 1:
        return <ItemsList items={items} setItems={setItems} />;
      case 2:
        return (
          <BudgetList
            budgets={budgets}
            setBudgets={setBudgets}
            items={items}
            setSelectedBudgets={setSelectedBudgets}
          />
        );
      case 3:
        return <SelectedBudgetsList selectedBudgets={selectedBudgets} />;
      default:
        return <p>Contenido de la etapa {currentStep + 1}</p>;
    }
  };

  const renderStepTitle = () => {
    return steps[currentStep]?.title || "";
  };

  return (
    <div className="flex flex-col w-full h-full bg-neutral-50">
      <Header
        title="Nueva Cotización"
        description="Crea una nueva cotización"
      />
      <div className="flex w-full h-full p-6">
        <div className="flex-grow flex flex-col gap-6 w-full h-full p-[20px] border border-neutral-200 shadow-sm bg-white rounded-[18px] relative">
          {isCreating || isSuccess ? (
            <SuccessAnimation isCreating={isCreating} isSuccess={isSuccess} />
          ) : (
            <>
              <div className="flex-grow overflow-hidden">
                <div className="h-full relative flex flex-col">
                  <h3 className="text-xl font-[800] mb-4">{`Etapa ${currentStep + 1} - ${renderStepTitle()}`}</h3>
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
                {currentStep === totalSteps - 2 ? (
                  <Button
                    onClick={handleCreate}
                    className="text-white"
                    variant="primary"
                    disabled={selectedBudgets.length === 0}
                  >
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
        <div className="w-[25%] flex justify-center items-start gap-6">
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
