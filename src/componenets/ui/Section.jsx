import React from "react";
import clsx from "clsx";

const Section = ({ children, className = "", ...props }) => {
  return (
    <section
      className={clsx("w-full", className)}
      {...props}
    >
      <div className="fullhd px-20 mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

export default Section;
