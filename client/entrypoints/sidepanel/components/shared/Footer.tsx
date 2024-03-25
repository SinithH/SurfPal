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
import { getTop10NavigationLinks } from "../../services/navigation-service/getNavigationTopList";
import useNavigationStore from "../../context/navigation-store";
import { Purpose } from "@/enum/purpose-enum";
import SignOutIcon from './assets/sign-out.svg';

interface FooterProps {
  module: string;
}

const Footer: React.FC<FooterProps> = ({ module }) => {

  //var isSummery: boolean = isSummery;
  const { summaryType, paragraphSummary, summary, updateSummary, clearSummary, clearUser, currentUser, userSettings } = useStore();
  const [mode, setMode] = useState(userSettings?.theme || '');

  useEffect(() => {
    setMode(userSettings?.theme || '');
  }, [userSettings.theme])

  const handleRegenerateClick = () => {
    if (summaryType == "paragraph") {
      if (!(paragraphSummary.length > 1)) {
        toast.warn('Please select a paragraph and generate summary', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false })
        return
      }

    } else {
      if (!(summary.length > 1)) {
        toast.warn('Please reload', { position: 'top-center', autoClose: 2000, hideProgressBar: true, pauseOnHover: false })
        return
      }
      console.log("Regenerating!")

    }
  }

  const handleLogOut = async () => {
    clearUser();
    userSettings.theme = '';
    await supabase.auth.signOut();
  }

  const { data, contentUrl, top10Data, setTop10LinksData } = useNavigationStore();
  const handleGetNavigationTop10Links = async () => {
    const response = await getTop10NavigationLinks(data[contentUrl].data.navigation, contentUrl, top10Data)
    if (response) {
      setTop10LinksData(contentUrl, response!)

      const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
      await browser.tabs.sendMessage(tab.id!, {
        purpose: Purpose.NAVIGATION_KEYBOARD_SHORTCUT,
        links: response?.map((data) => data.URL)
      });
    }
  }
  const handleGetNavigationLinks = async () => {
    const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
    await browser.tabs.sendMessage(tab.id!, { purpose: Purpose.RELOAD_TEXT });
  }

  return (
    <>
      <div className={`${mode} bg-white fixed bottom-0 w-full dark:bg-darkBg dark:text-white`}>
        <hr className="mx-4" />
        <div className="inline-flex p-4 gap-12 w-full justify-between">
          <button className="w-7 h-7 rounded">
            <Link to={`/`}>
              <img src={homeIcon} alt="User" />
            </Link>
          </button>
          {module == ModuleNames.SUMMARIZATION && (
            <div className="inline-flex gap-12">
              {userSettings.texttospeech && (
                <button className="w-7 h-7 rounded">
                    <img src={textToSpeechIcon} alt="User" />
                </button>
              )}
              <button onClick={handleRegenerateClick} className="p-2 h-7 inline-flex gap-3 items-center rounded-lg bg-primary text-white">
                <span>Regenerate</span>
                <FontAwesomeIcon icon={faRotate} />
              </button>
            </div>)}
          {module == ModuleNames.NAVIGATION && (
            <div className="inline-flex gap-3">
              <button onClick={handleGetNavigationTop10Links} className="p-2 h-7 inline-flex gap-3 items-center rounded-lg bg-primary text-white">
                <span>Generate Top 10 Links</span>
                <FontAwesomeIcon icon={faRotate} />
              </button>
              <button onClick={handleGetNavigationLinks} className="p-2 h-7 inline-flex gap-3 items-center rounded-lg bg-primary text-white">
                <span>Refresh</span>
                <FontAwesomeIcon icon={faRotate} />
              </button>
            </div>)}
            {module == ModuleNames.MY_ACCOUNT && currentUser && (
              <button onClick={handleLogOut} className="inline-flex bg-transparent self-end text-lg text-red-500 font-kanit gap-2 items-center">
                <img src={SignOutIcon} alt="sign out" className="h-5" />
                <p>Log out</p>
              </button>
            )}
        </div>
      </div>
    </>
  )
}

export default Footer;