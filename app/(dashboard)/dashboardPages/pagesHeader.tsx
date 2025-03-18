import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function PagesHeader({ title, subtitle }: HeaderProps) {
  return (
    <div className="w-full flex flex-col pb-[0.5vw]">
      <h2 className="text-[2vw] font-[800] leading-[1.1]">{title}</h2>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}
