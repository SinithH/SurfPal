import React, { useEffect, useState } from "react";
import homeIcon from '@/assets/icons/home-icon.svg';
import textToSpeechIcon from '@/assets/icons/test-to-speech-icon.svg';
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ModuleNames from "../../constants/Modules";
import useStore from "../../context/store";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../../lib/helper/supabaseClient";

interface FooterProps {
    module: string
}

const Footer: React.FC<FooterProps> = ({module}) => {

  //var isSummery: boolean = isSummery;
  const {summaryType, paragraphSummary, summary, updateSummary, clearSummary, clearUser, currentUser, userSettings} = useStore();
  const [mode, setMode] = useState(userSettings?.theme || '');

  useEffect(() => {
    setMode(userSettings?.theme || '');
  }, [userSettings.theme])

  const handleRegenerateClick = ()=>{
    if(summaryType == "paragraph"){
      if(!(paragraphSummary.length > 1)){
        toast.warn('Please select a paragraph and generate summary', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false })
        return
      }
      
    } else {
      if(!(summary.length > 1)){
        toast.warn('Please reload', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false })
        return
      }
      console.log("Regenerating!")
      
    }
  }
  
  const handleLogOut = async () => {
    clearUser();
    await supabase.auth.signOut();
  }

    return(
      <>
        <div className={`${mode} bg-white fixed bottom-0 w-full dark:bg-darkBg dark:text-white`}>
            <hr className="mx-4"/>
            <div className="inline-flex p-4 gap-12">
                <button className="w-7 h-7 rounded">
                <Link to={`/`}>
                    <img src={homeIcon} alt="User" />
                </Link>
                </button>
                {module == ModuleNames.SUMMARIZATION && (
                <div className="inline-flex gap-12">
                    <button className="w-7 h-7 rounded">
                        <img src={textToSpeechIcon} alt="User" />
                    </button>
                    <button onClick={handleRegenerateClick} className="p-2 h-7 inline-flex gap-3 items-center rounded-lg bg-primary text-white">
                        <span>Regenerate</span>
                        <FontAwesomeIcon icon={faRotate} />
                    </button>
                </div>) }
                {module == ModuleNames.MY_ACCOUNT && (
                  <button onClick={handleLogOut} className="inline-flex bg-transparent text-lg text-red-500 font-kanit">
                    <p>Log out</p>
                  </button>
                )}
            </div>
        </div>
      </>  
    );
};

export default Footer;