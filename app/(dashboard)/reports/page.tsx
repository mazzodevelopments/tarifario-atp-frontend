import { CornerRightUp } from "react-feather";

export default function Reports() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background py-8 px-6">
      <div className="flex mb-4 items-center text-neutral-900">
        <CornerRightUp size={26} />
        <h2 className="font-semibold text-3xl mt-[1px] ml-1">Reportes</h2>
      </div>
    </div>
  );
}
