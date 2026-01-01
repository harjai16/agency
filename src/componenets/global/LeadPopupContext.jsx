"use client";

import React, { createContext, useContext, useState } from "react";

const LeadPopupContext = createContext();

export const useLeadPopup = () => {
  const context = useContext(LeadPopupContext);
  if (!context) {
    throw new Error("useLeadPopup must be used within LeadPopupProvider");
  }
  return context;
};

export const LeadPopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <LeadPopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </LeadPopupContext.Provider>
  );
};

