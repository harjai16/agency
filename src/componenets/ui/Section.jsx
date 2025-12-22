import React from "react";
import clsx from "clsx";

const Section = ({ children, className = "", ...props }) => {
  return (
    <section
      className={clsx("w-full", className)}
      {...props}
    >
      <div className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {children}
      </div>
    </section>
  );
};

export default Section;
