"use client";
import { useEffect, useState } from "react";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";
import ProgressBar from "@/app/(dashboard)/create/ProgressBar";
import QuotationDetails from "@/app/(dashboard)/create/steps/QuotationDetails/QuotationDetails";
import ItemsList from "@/app/(dashboard)/create/steps/Items/ItemList";
import PurchaseList from "@/app/(dashboard)/create/steps/Purchase/PurchaseList";
import LogisticList from "@/app/(dashboard)/create/steps/Logistics/LogisticList";
import SalesList from "@/app/(dashboard)/create/steps/Sales/SalesList";
import SelectedBudgetsList from "@/app/(dashboard)/create/steps/SelectBudgets/SelectedBudgetsList";
import type { QuotationData } from "@/types/QuotationData";
import type { Budget } from "@/types/Budget";
import { QuoteService } from "@/services/QuoteService";
import SelectableBudgetsList from "@/app/(dashboard)/create/steps/SelectBudgets/SelectableBudgetsList";
import type { Item } from "@/types/Item";

const steps = [
  { title: "Cargar Datos" },
  { title: "Items" },
  { title: "Compras" },
  { title: "Logística" },
  { title: "Ventas" },
  { title: "Presupuestos" },
  { title: "Selección" },
  { title: "Confirmación" },
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
  const [quotationId, setQuotationId] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<Budget[]>([]);
  // ESTADO BUDGETS PARA HABILITAR BOTON DE NEXT
  const [budgetsToEnableButton, setBudgetsToEnableButton] = useState<Budget[]>(
    [],
  );

  useEffect(() => {
    if (budgetsToEnableButton.length > 0) {
      setBudgetsToEnableButton(budgetsToEnableButton);
    }
  }, [budgetsToEnableButton]);

  const handleQuotationSubmitSuccess = (id: number) => {
    setQuotationId(id);
    setQuotationData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          items: [],
        };
      }
      return prevData;
    });
    setCurrentStep(currentStep + 1);
  };

  const handleNext = async () => {
    // SUBMIT FORM DE QUOTATION DATA
    if (currentStep === 0) {
      const quotationDetailsElement = document.querySelector("form");
      if (quotationDetailsElement) {
        quotationDetailsElement.requestSubmit();
      }
      return;
    }
    // SELECCIONAR BUDGETS
    if (currentStep === 5 && quotationData?.taskNumber) {
      try {
        await QuoteService.selectBudgets(
          selectedBudgets.map((b) => b.id),
          quotationId!,
        );
      } catch (error) {
        console.error("Error seleccionando presupuestos", error);
        return;
      }
    }

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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (quotationData) {
      try {
        await QuoteService.saveQuotation(quotationData);
      } catch (error) {
        console.error("Error submitting quotation:", error);
      }
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
            key !== "budgets" &&
            typeof quotationData[key as keyof QuotationData] === "string" &&
            (quotationData[key as keyof QuotationData] as string).trim() === "",
        )
      );
    }
    if (currentStep === 1 && items) {
      return items.length === 0;
    }

    if (currentStep === 2 && budgetsToEnableButton) {
      return budgetsToEnableButton.length === 0;
    }

    if (currentStep === 3 && budgetsToEnableButton) {
      // TODO: TODOS LOS BUDGETS TIENEN QUE TENER UN FLETE ASIGNADO
    }

    if (currentStep === 4 && budgetsToEnableButton) {
      return budgetsToEnableButton.length === 0;
    }

    if (currentStep === 5 && budgetsToEnableButton) {
      return budgetsToEnableButton.length === 0;
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
            onSubmitSuccess={handleQuotationSubmitSuccess}
            initialData={quotationData}
          />
        );
      case 1:
        return (
          <ItemsList
            quotationId={quotationId!}
            items={items}
            setItems={setItems}
          />
        );
      case 2:
        return (
          <PurchaseList
            quotationId={quotationId!}
            items={items}
            setBudgetsToEnableButton={setBudgetsToEnableButton}
          />
        );
      case 3:
        return <LogisticList quotationId={quotationId!} />;
      case 4:
        return (
          <SalesList
            quotationId={quotationId!}
            setBudgetsToEnableButton={setBudgetsToEnableButton}
          />
        );
      case 5:
        return (
          <SelectableBudgetsList
            quotationId={quotationId!}
            selectedBudgets={selectedBudgets}
            setSelectedBudgets={setSelectedBudgets}
            setBudgetsToEnableButton={setBudgetsToEnableButton}
          />
        );
      case 6:
        return <SelectedBudgetsList quotationId={quotationId!} />;
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
        <div className="flex flex-col gap-6 w-full h-full p-[20px] border border-neutral-200 shadow-sm bg-white rounded-[18px] relative">
          {isCreating || isSuccess ? (
            <SuccessAnimation
              isCreating={isCreating}
              isSuccess={isSuccess}
              taskNumber={quotationData?.taskNumber ?? ""}
            />
          ) : (
            <div className="flex w-full flex-col h-full">
              <div className="flex w-full justify-center items-center h-full">
                <div className="w-full h-full relative flex flex-col">
                  <h3 className="text-xl font-[800]">{`Etapa ${currentStep + 1} - ${renderStepTitle()}`}</h3>
                  <div className="flex justify-center relative h-full items-center">
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
            </div>
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
