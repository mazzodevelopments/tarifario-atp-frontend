import React, { type InputHTMLAttributes, JSX } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-[600] text-gray-700">{label}</label>
      <input
        {...props}
        className={`w-full px-2 py-2 text-sm border rounded-md focus:outline-none 
          ${className}`}
      />
    </div>
  );
}
