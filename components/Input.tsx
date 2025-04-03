import React, {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

interface BaseInputProps {
  label?: string;
  className?: string;
  isTextArea?: boolean;
  error?: string;
}

type InputProps = BaseInputProps &
  (
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>
  );

export default function Input({
  label,
  className = "",
  isTextArea = false,
  error,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-[600] text-gray-700">
          {label}
        </label>
      )}
      {isTextArea ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none resize-y min-h-[70px] 
            ${className} ${error ? "border-red-500" : ""}`}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={`w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none 
            ${className} ${error ? "border-red-500" : ""}`}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
