import IncotermSelect from "@/app/(dashboard)/create/steps/IncotermSelect";

interface StepContentProps {
  step: number;
}

export default function StepContent({ step }: StepContentProps) {
  const renderStep = () => {
    switch (step) {
      case 0:
        return <IncotermSelect />;
      default:
        return <p>Contenido de la etapa {step}</p>;
    }
  };

  return (
    <div className="h-full relative flex flex-col">
      <h3 className="text-xl font-semibold mb-4">Etapa {step + 1}</h3>
      <div className="flex justify-center relative pt-[10%] items-center w-full mx-auto">
        {renderStep()}
      </div>
    </div>
  );
}
