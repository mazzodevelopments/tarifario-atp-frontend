/**
 Este es un componente de botón reutilizable que puede ser personalizado con diferentes variantes.
 **/

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "rounded-lg font-semibold transition-colors";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary/10",
  };

  const classes = `${baseClasses} ${variantClasses[variant]}  ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
