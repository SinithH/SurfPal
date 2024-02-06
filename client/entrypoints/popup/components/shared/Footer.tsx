import React from "react";
import homeIcon from '@/assets/icons/home-icon.svg';
import textToSpeechIcon from '@/assets/icons/test-to-speech-icon.svg';
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FooterProps {
    handleBackClick: () => void;
    isSummery: boolean
}

const Footer: React.FC<FooterProps> = ({handleBackClick, isSummery}) => {

    var isSummery: boolean = isSummery;

    return(
      <>
        <div className="fixed bottom-0 w-full">
            <hr className="mx-4"/>
            <div className="inline-flex p-4 gap-12">
                <button onClick={handleBackClick} className="w-7 h-7 rounded">
                    <img src={homeIcon} alt="User" />
                </button>
                {isSummery && (
                <div className="inline-flex gap-12">
                    <button className="w-7 h-7 rounded">
                        <img src={textToSpeechIcon} alt="User" />
                    </button>
                    <button className="p-2 h-7 inline-flex gap-3 items-center rounded-lg bg-primary text-white">
                        <span>Regenerate</span>
                        <FontAwesomeIcon icon={faRotate} />
                    </button>
                </div>) }
            </div>
        </div>
      </>  
    );
};

export default Footer;