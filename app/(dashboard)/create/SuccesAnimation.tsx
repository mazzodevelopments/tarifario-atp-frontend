import { Check } from "react-feather";

interface SuccessAnimationProps {
  isCreating: boolean;
  isSuccess: boolean;
}

export default function SuccessAnimation({
  isCreating,
  isSuccess,
}: SuccessAnimationProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {isCreating ? (
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      ) : isSuccess ? (
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-secondary text-white p-2 mb-4">
            <Check size={52} />
          </div>
          <p className="text-2xl font-[600] text-secondary">
            Cotización creada con éxito
          </p>
        </div>
      ) : null}
    </div>
  );
}
