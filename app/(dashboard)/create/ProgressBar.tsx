interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string }[];
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  steps,
}: ProgressBarProps) {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="flex gap-6 items-start h-full py-20 px-10">
      <div className="relative h-full">
        <div className="h-full bg-gray-200 rounded-full w-2.5">
          <div
            className="bg-primary rounded-full transition-all duration-300 ease-in-out absolute top-0 w-2.5"
            style={{ height: `${progress}%` }}
          ></div>
        </div>
        {/* Dots for each step */}
        <div className="absolute left-[-50%] top-0 h-full flex flex-col justify-between">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full transition-colors delay-100 duration-300 ${
                index <= currentStep
                  ? "bg-primary border-2 border-primary"
                  : "bg-white border-2 border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Step titles */}
      <div className="flex flex-col justify-between h-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-sm transition-colors duration-300 ${
              index === currentStep
                ? "text-primary font-[600]"
                : index < currentStep
                ? "text-gray-700"
                : "text-gray-400"
            }`}
          >
            {step.title}
          </div>
        ))}
      </div>
    </div>
  );
}
