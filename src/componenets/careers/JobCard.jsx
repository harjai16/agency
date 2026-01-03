"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/componenets/ui/Button";
import { useLeadPopup } from "@/componenets/global/LeadPopupContext";

const JobCard = ({ job, index }) => {
  const { openPopup } = useLeadPopup();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Limit description to 150 characters
  const maxLength = 150;
  const description = job.description || "";
  const isLongDescription = description.length > maxLength;
  const truncatedDescription = isLongDescription 
    ? description.substring(0, maxLength).trim() + "..."
    : description;
  const displayDescription = isExpanded ? description : truncatedDescription;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-5 md:p-6 shadow-[0_16px_38px_rgba(15,23,42,0.04)] flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
            <span>{job.department}</span>
            <span>•</span>
            <span>{job.type}</span>
            <span>•</span>
            <span>{job.location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 mb-4 min-h-[80px]">
        <p 
          className={`text-xs md:text-sm text-gray-600 leading-relaxed ${
            !isExpanded ? 'line-clamp-4' : ''
          }`}
        >
          {displayDescription}
        </p>
        {isLongDescription && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      
      <div className="pt-3 border-t border-gray-100 mt-auto">
        <Button onClick={openPopup} className="w-full text-xs">
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
};

export default JobCard;

