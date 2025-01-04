/**
 * Este es un componente de botón reutilizable que puede ser personalizado con diferentes variantes.
 */

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseClasses = "font-medium transition-colors";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary/10",
  };

  const disabledClasses = "bg-primary/20 text-secondary/60";

  const classes = `${baseClasses} ${
    disabled ? disabledClasses : variantClasses[variant]
  } ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
