// MainMenu.tsx

import React, { useEffect, useState } from 'react';
import userIcon from '@/assets/icons/user-icon.svg';
import summaryIcon from '@/assets/icons/summary-icon.png';
import navigationIcon from '@/assets/icons/navigation-icon.svg';
import imageRecIcon from '@/assets/icons/image-rec-icon.svg';
import feedbackIcon from '@/assets/icons/feedback-icon.svg';
import { Link } from 'react-router-dom';
import useStore from '../../context/store';

const MainMenu: React.FC = () => {

  const [hover, setHover] = useState('');

  const {userSettings} = useStore();
  const handlePopoverClick = () => {
    setIsPopoverOpen(!isPopoverOpen); 
  };
  const [showFeedBack, setShowFeedBack] = useState<boolean>(false);
  const [mode, setMode] = useState('');

  const onClose = () => {
    setShowFeedBack(false);
  };

  useEffect(() => {
      if(userSettings && userSettings.theme == 'dark') {
        setMode('bg-darkBg text-white');
        setHover('hover:bg-darkTileHover')
      }else{
        setHover('hover:bg-slate-200');
      }
  }, [userSettings])
  
  return (
    <div className={`${mode} dark:bg-darkBg dark:text-white grid p-4 max-w-screen-md mx-auto text-xl font-kanit h-full overflow-y-hidden`}>

      <Link to={`/navigation`}>
        <div className={` h-full  cursor-pointer hover:pl-5 transition-all duration-75 dark:hover:bg-darkTileHover hover:bg-slate-200 `}>
          <div className={` w-full inline-flex gap-4 items-center sm:pl-16 pl-8 py-10 sm:py-5 `}>
              <img src={navigationIcon} alt="Navigation" className="sm:h-20 sm:w-20 w-10 h-10 sm:mb-2" />
              <span className="text-center text-3xl sm:text-4xl">Navigation</span>
          </div>
        </div>
      </Link>
      <hr />
      <Link to={`/summarization`}>
        <div className={`h-full  cursor-pointer hover:pl-5 transition-all duration-75 dark:hover:bg-darkTileHover hover:bg-slate-200 `}>
          <div className=" inline-flex gap-4 items-center justify-start sm:pl-16 pl-8 py-10 sm:py-5 ">
            <img src={summaryIcon} alt="Summary" className="sm:h-20 sm:w-20 w-10 h-10 sm:mb-2" />
            <span className="text-center text-3xl sm:text-4xl">Summarization</span>
          </div>
        </div>
      </Link>
      <hr />
      <Link to={`/image-recognition`}>
        <div className={` h-full  cursor-pointer hover:pl-5 transition-all duration-75 dark:hover:bg-darkTileHover hover:bg-slate-200 `}>
          <div className=" inline-flex gap-4 items-center justify-start sm:pl-16 pl-8 py-10 sm:py-5 ">
              <img src={imageRecIcon} alt="Image Recognition" className="sm:h-20 sm:w-20 w-10 h-10 sm:mb-2" />
              <span className="text-center text-3xl sm:text-4xl">Images</span>
          </div>
        </div>
      </Link>
      <hr />
      <Link to={`/my-account`}>
        <div className={` h-full  cursor-pointer hover:pl-5 transition-all duration-75 dark:hover:bg-darkTileHover hover:bg-slate-200 `}>
          <div className=" inline-flex gap-4 items-center justify-start sm:pl-16 pl-8 py-10 sm:py-5 ">
              <img src={userIcon} alt="User" className="sm:h-20 sm:w-20 w-10 h-10 sm:mb-2" />
              <span className="text-center text-3xl sm:text-4xl">My Account</span>
          </div>
        </div>
      </Link>

      {/* <Link to={`/feedback`}>
      <div className={`inline-flex items-center gap-2 mt-2 px-4 py-2 cursor-pointer w-fit rounded-full justify-self-end dark:hover:bg-darkTileHover `}>
        <span className='text-sm'>Give Feedback</span>
        <img src={feedbackIcon} alt="Feedback" className='w-5 h-5' />
        <FeedBackPopover/>
      </div>
      </Link> */}
      
      <div className='inline-flex items-center gap-2 mt-2 px-4 py-2 cursor-pointer w-fit rounded-full'>
        <button onClick={() => setShowFeedBack(true)} className='bg-primary text-white px-4 py-2 rounded-lg text-lg'>
          FeedBack
        </button>
        {showFeedBack && <FeedBackPopover onClose={onClose}/>}
      </div>
    </div>
  );
};

export default MainMenu;
