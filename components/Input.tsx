import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <div>
      <input
        {...props}
        className={`w-full px-2 py-2 border rounded-md focus:outline-none 
          ${className}`}
      />
    </div>
  );
}
