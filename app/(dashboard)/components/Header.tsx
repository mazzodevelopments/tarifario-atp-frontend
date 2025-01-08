/**
 * Este es un componente de Header reutilizable para cada ruta del tarifario.
 */

interface HeaderProps {
  title: string;
  description: string;
  className?: string;
}

export default function Header({
  title,
  description,
  className = "",
}: HeaderProps) {
  const baseClasses = "w-full h-[7vw] rounded-[18px] mb-4";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <div className={combinedClasses}>
      <div className="flex flex-col justify-end items-start h-full p-4">
        <h2 className="text-[2vw] leading-[0.85] font-semibold text-white">
          {title}
        </h2>
        <p className="text-[0.8vw] leading-[1] ml-1 text-white mt-2 opacity-90">
          {description}
        </p>
      </div>
    </div>
  );
}
