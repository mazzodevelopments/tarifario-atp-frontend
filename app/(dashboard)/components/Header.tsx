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
  className = "",
  searchInput,
}: HeaderProps) {
  const baseClasses = "flex justify-between items-center h-full px-6 mb-4";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
      <div className={combinedClasses}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black mt-1">
            {title}
          </h2>
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
