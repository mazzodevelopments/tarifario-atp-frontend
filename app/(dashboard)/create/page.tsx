"use client";

import { useState, useEffect, useMemo } from "react";
import ProgressBar from "./ProgressBar";
import SuccessAnimation from "./SuccesAnimation";
import Button from "@/components/Button";
import Header from "@/app/(dashboard)/components/Header";

import IncotermSelect from "@/app/(dashboard)/create/steps/IncotermSelect";
import LocationSelect from "@/app/(dashboard)/create/steps/LocationSelect";
import PackageOptionsAttachment from "@/app/(dashboard)/create/steps/PackageOptionsAttachment";
import { incoterms, vias, paises } from "@/app/(dashboard)/create/data";

export interface DropdownOption {
  value: string;
  label: string;
}

export default function Create() {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedIncoterm, setSelectedIncoterm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    via: "",
    origen: "",
    destino: "",
  });
  const [packageOptions, setPackageOptions] = useState({
    pickUpCost: 180,
    needsRepackaging: false,
    needsFumigation: false,
  });

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

  // FILTRADO DE VÍAS SEGÚN INCOTERM
  const filteredVias = useMemo(() => {
    if (!selectedIncoterm) return vias;

    switch (selectedIncoterm) {
      case "EXW":
        return vias;
      case "FCA":
        return vias;
      case "FOB":
        return vias.filter(
          (via) =>
            via.value !== "COURIER" &&
            via.value !== "TERRESTRE" &&
            via.value !== "AÉREO",
        );
      case "CFR":
        return vias.filter(
          (via) =>
            via.value !== "COURIER" &&
            via.value !== "TERRESTRE" &&
            via.value !== "AÉREO",
        );
      case "CIF":
        return vias.filter(
          (via) =>
            via.value !== "COURIER" &&
            via.value !== "TERRESTRE" &&
            via.value !== "AÉREO",
        );
      case "DAT":
        return vias;
      case "DAP":
        return vias;
      case "DDP":
        return vias;
      default:
        return vias;
    }
  }, [selectedIncoterm]);

  // VERIFICAR SI LA VIA SELECCIONADA SIGUE SIENDO VALIDA DESPUES DE CAMBIAR EL INCOTERM
  useEffect(() => {
    if (!filteredVias.some((via) => via.value === selectedLocation.via)) {
      setSelectedLocation((prev) => ({ ...prev, via: "" }));
    }
  }, [selectedIncoterm, filteredVias, selectedLocation.via]);

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
      return !selectedIncoterm;
    }
    if (currentStep === 1) {
      return (
        !selectedLocation.via ||
        !selectedLocation.origen ||
        !selectedLocation.destino
      );
    }
    if (currentStep === 2) {
      return packageOptions.pickUpCost < 180 || packageOptions.pickUpCost > 650;
    }
    return false;
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
      case 1:
        return (
          <LocationSelect
            vias={filteredVias}
            origenes={paises}
            destinos={paises}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        );
      case 2:
        return <PackageOptionsAttachment onOptionsChange={setPackageOptions} />;
      default:
        return <p>Contenido de la etapa {currentStep + 1}</p>;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0:
        return "Seleccionar Incoterm";
      case 1:
        return "Seleccionar Ubicaciones";
      case 2:
        return "Opciones de Paquete";
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
      <div className="flex-grow flex flex-col gap-6 w-full h-full p-[20px] bg-white shadow-sm rounded-[18px] relative">
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
                className="px-3 py-1 bg-neutral-200 text-neutral-800  hover:bg-neutral-300 disabled:opacity-50"
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
