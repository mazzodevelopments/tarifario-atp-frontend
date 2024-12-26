import { PlusSquare, Users } from "react-feather";

export default function Proveedores() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-background py-8 px-6">
      <div className="flex mb-4 items-center text-neutral-900">
        <Users size={26} />
        <h2 className="font-semibold text-3xl mt-[1px] ml-1">Proveedores</h2>
      </div>
    </div>
  );
}
