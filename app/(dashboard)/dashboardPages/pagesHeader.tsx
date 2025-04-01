import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function PagesHeader({ title, subtitle }: HeaderProps) {
  return (
    <div className="w-full h-[10vh] flex flex-col">
      <h2 className="text-[2vw] font-[800] leading-[1.1]">{title}</h2>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}
