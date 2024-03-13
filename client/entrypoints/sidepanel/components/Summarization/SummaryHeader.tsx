import React, { useState } from 'react';
import useStore from '../../context/store';
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SummaryHeader: React.FC<{ handleSummaryClick: any; handleParaSummaryClick: any }> = ({ handleSummaryClick, handleParaSummaryClick }) => {
  const {summaryType} = useStore()
  return (
    <div className="font-kanit text-base font-semibold my-2 flex flex-row justify-center border-2 border-primary rounded-md">
        <button onClick={handleSummaryClick} className={`w-1/2 p-2 h-7 inline-flex gap-3 items-center rounded-l-sm ${summaryType == "page" ? 'bg-primary text-white' : 'text-primary bg-white'}`}>
          <span>Page Summary</span>
        </button>

        <button onClick={handleParaSummaryClick} className={`w-1/2 p-2 h-7 inline-flex gap-3 items-center rounded-r-sm text-white ${summaryType == "paragraph" ? 'bg-primary text-white' : 'text-primary bg-white'}`}>
          <span>Paragraph Summary</span>
        </button>
    </div>
  );
};

export default SummaryHeader;
