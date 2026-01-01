"use client";
import React from "react";
import clsx from "clsx";

const Button = ({ 
  children, 
  className = "", 
  variant = "solid",
  asChild = false,
  ...props 
}) => {
  const base =
    "inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] sm:min-h-0";

  const variants = {
    solid:
      "bg-black text-white hover:bg-black/90 border border-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black",
    ghost:
      "bg-white text-black border border-gray-200 hover:border-black/40 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
  };

  const buttonClasses = clsx(base, variants[variant], className);

  // If asChild is true, clone the child element and add the classes
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      className: clsx(buttonClasses, children.props?.className),
      ...props,
    });
  }

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
