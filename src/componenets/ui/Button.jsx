"use client";
import React from "react";
import clsx from "clsx";
import { trackClick } from "@/lib/gtag";

const Button = ({ 
  children, 
  className = "", 
  variant = "solid",
  asChild = false,
  trackEvent = true,
  eventLabel,
  ...props 
}) => {
  const handleClick = (e) => {
    // Track button click if tracking is enabled
    if (trackEvent && typeof window !== 'undefined' && window.gtag) {
      const label = eventLabel || (typeof children === 'string' ? children : 'Button');
      trackClick(label, 'button', {
        button_variant: variant,
        button_text: typeof children === 'string' ? children : 'Button',
      });
    }
    
    // Call original onClick if provided
    if (props.onClick) {
      props.onClick(e);
    }
  };
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
    const childProps = {
      className: clsx(buttonClasses, children.props?.className),
      onClick: (e) => {
        if (trackEvent && typeof window !== 'undefined' && window.gtag) {
          const label = eventLabel || (typeof children === 'string' ? children : 'Button');
          trackClick(label, 'button', {
            button_variant: variant,
            button_text: typeof children === 'string' ? children : 'Button',
          });
        }
        if (children.props?.onClick) {
          children.props.onClick(e);
        }
        if (props.onClick) {
          props.onClick(e);
        }
      },
      ...props,
    };
    return React.cloneElement(React.Children.only(children), childProps);
  }

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
