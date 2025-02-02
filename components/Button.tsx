import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseStyles = `
    relative flex flex-row overflow-hidden px-3 text-sm py-2 rounded-[12px] font-[600] cursor-pointer
    transition-all duration-300 ease-out
    transform hover:enabled:scale-95 disabled:cursor-not-allowed disabled:opacity-50
  `;

  const variantStyles = {
    primary: `
      bg-neutral-900
      before:absolute before:top-0 before:left-0 before:w-full before:h-full
      before:bg-white before:opacity-0 before:transition-opacity before:duration-300
      hover:enabled:before:opacity-20
    `,
    secondary: `
      bg-transparent text-neutral-900 border border-[#ebebebcc]
      hover:enabled:bg-neutral-50
    `,
    danger: `
      bg-red-500 text-white border border-red-500
      hover:enabled:bg-red-600
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
