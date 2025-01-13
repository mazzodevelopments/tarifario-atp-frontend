/**
 * Este es un componente de Header reutilizable para cada ruta del tarifario.
 */

import { Search } from "react-feather";

interface HeaderProps {
  title: string;
  description: string;
  className?: string;
  searchInput?: boolean;
}

export default function Header({
  title,
  description,
  className = "",
  searchInput,
}: HeaderProps) {
  const baseClasses = "flex justify-between items-center h-auto mb-4";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <div className="w-full h-auto  rounded-[18px] mb-2 flex-shrink-0">
      <div className={combinedClasses}>
        <div className="flex flex-col justify-center items-start">
          <h2 className="flex items-center text-4xl leading-[1] mb-2 p-0 font-semibold text-black">
            {title}
          </h2>
          <p className="text-md leading-[1] ml-1 text-black opacity-90">
            {description}
          </p>
        </div>
        {searchInput && (
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-[12vw]">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              />
              <input
                className="w-full h-[2.25vw] rounded-xl pl-10 pr-4 bg-sky-50  text-sm focus:outline-none placeholder-secondary"
                placeholder="Buscar cotización"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
