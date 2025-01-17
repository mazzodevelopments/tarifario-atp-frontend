import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseStyles = `
    relative flex flex-row overflow-hidden px-3 py-2 rounded-[12px] font-[600] cursor-pointer
    transition-all duration-300 ease-out
    transform hover:scale-95 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-neutral-900 text-white
      before:absolute before:top-0 before:left-0 before:w-full before:h-full
      before:bg-white before:opacity-0 before:transition-opacity before:duration-300
      hover:before:opacity-20
    `,
    secondary: `
      bg-transparent text-neutral-900 border border-[#ebebebcc]
      hover:bg-neutral-50
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
      <span className="relative z-10 text-sm">{children}</span>
    </button>
  );
};

export default Button;
