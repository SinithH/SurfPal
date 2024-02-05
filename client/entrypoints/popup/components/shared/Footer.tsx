import React from "react";
import homeIcon from '@/assets/icons/home-icon.svg';
import textToSpeechIcon from '@/assets/icons/test-to-speech-icon.svg';

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
            <div className="inline-flex">
                <button onClick={handleBackClick} className="m-4 w-7 h-7 rounded">
                    <img src={homeIcon} alt="User" />
                </button>
                {isSummery && (<div className="inline-flex">
                    <button className="m-4 w-7 h-7 rounded">
                        <img src={textToSpeechIcon} alt="User" />
                    </button>
                    <button className="m-4 p-2 h-7 flex items-center rounded-lg bg-primary text-white">
                        <span>Regenerate</span>
                    </button>
                </div>) }
            </div>
        </div>
      </>  
    );
};

export default Footer;