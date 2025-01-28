import React, {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

interface BaseInputProps {
  label?: string;
  className?: string;
  isTextArea?: boolean;
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
  ...props
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-[600] text-gray-700">{label}</label>
      {isTextArea ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`w-full px-2 py-2 text-sm border rounded-md focus:outline-none resize-y min-h-[70px] 
            ${className}`}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={`w-full px-2 py-2 text-sm border rounded-md focus:outline-none 
            ${className}`}
        />
      )}
    </div>
  );
}
