interface StepContentProps {
  step: number;
}

export default function StepContent({ step }: StepContentProps) {
  return (
    <div className="flex-grow">
      <h3 className="text-xl font-semibold mb-4">Etapa {step}</h3>
      {/* Aquí puedes agregar el contenido específico de cada etapa */}
      <p>Contenido de la etapa {step}</p>
    </div>
  );
}
