"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";
import QuotationDetails from "@/app/(dashboard)/create/steps/QuotationDetails";
import ItemsList, {
  Item,
} from "@/app/(dashboard)/create/steps/ItemList/ItemList";

const steps = [
  { title: "Cargar Datos Cotización" },
  { title: "Agregar Items" },
  { title: "Validar Precios" },
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
      detail: "Bomba centrífuga industrial",
      brand: "Grundfos",
      quantity: 2,
      unit: "Pulgada",
      partNumber: "CR-32-2",
      incoterm: "EXW",
      pickup: false,
      pickupPrice: 0,
      repackaging: false,
      palletFumigation: false,
    },
    {
      id: "2",
      detail: "Válvula de control de flujo",
      brand: "Samson",
      quantity: 5,
      unit: "Pulgada",
      partNumber: "3241-PN16",
      incoterm: "FOB",
      pickup: true,
      pickupPrice: 200,
      repackaging: true,
      palletFumigation: false,
    },
    {
      id: "3",
      detail: "Cable de instrumentación blindado",
      brand: "Belden",
      quantity: 100,
      unit: "Metro",
      partNumber: "8761-100",
      incoterm: "CIF",
      pickup: false,
      pickupPrice: 0,
      repackaging: false,
      palletFumigation: true,
    },
    {
      id: "4",
      detail: "Sensor de presión diferencial",
      brand: "Endress+Hauser",
      quantity: 3,
      unit: "Pulgada",
      partNumber: "PMD75-1BA7B6",
      incoterm: "DAP",
      pickup: true,
      pickupPrice: 250,
      repackaging: true,
      palletFumigation: true,
    },
    {
      id: "5",
      detail: 'Tubería de acero inoxidable 2"',
      brand: "Sandvik",
      quantity: 50,
      unit: "Metro",
      partNumber: "AISI316L-2",
      incoterm: "DDP",
      pickup: false,
      pickupPrice: 0,
      repackaging: false,
      palletFumigation: false,
    },
  ]);

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
                  <h3 className="text-xl font-semibold mb-4">{`Etapa ${
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
