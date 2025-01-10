import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        relative overflow-hidden px-4 py-2 rounded-[12px] font-medium text-white cursor-pointer
        transition-all duration-300 ease-out
        transform hover:scale-105
        before:absolute before:top-0 before:left-0 before:w-full before:h-full
        before:bg-white before:opacity-0 before:transition-opacity before:duration-300
        hover:before:opacity-20
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
