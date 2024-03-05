// MainMenu.tsx

import React from 'react';
import userIcon from '@/assets/icons/user-icon.svg';
import summaryIcon from '@/assets/icons/summary-icon.png';
import navigationIcon from '@/assets/icons/navigation-icon.svg';
import imageRecIcon from '@/assets/icons/image-rec-icon.svg';
import feedbackIcon from '@/assets/icons/feedback-icon.svg';


interface MainMenuProps {
    onOptionClick: (option: string) => void;
  }
  
const MainMenu: React.FC<MainMenuProps> = ({ onOptionClick, ...rest }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 p-4 max-w-screen-md mx-auto text-xl font-kanit">
      <div className="aspect-w-1 aspect-h-1 text-black flex items-center justify-center">
        <div className="flex flex-col items-center border-r-2 border-b-2 justify-center cursor-pointer hover:bg-slate-200" onClick={() => onOptionClick('Navigation')}>
            <img src={navigationIcon} alt="Navigation" className="h-20 w-20 mb-2" />
            <span className="text-center">Navigation</span>
        </div>
      </div>
      <div className="aspect-w-1 aspect-h-1 text-black flex items-center justify-center cursor-pointer hover:bg-slate-200" onClick={() => onOptionClick('Summarization')}>
        <div className="flex flex-col items-center justify-center border-b-2">
          <img src={summaryIcon} alt="Summary" className="h-20 w-20 mb-2 " />
          <span className="text-center">Summarization</span>
        </div>
      </div>
      <div className="aspect-w-1 aspect-h-1 text-black flex items-center justify-center cursor-pointer hover:bg-slate-200" onClick={() => onOptionClick('ImageRecognition')}>
        <div className="flex flex-col items-center justify-center border-r-2">
            <img src={imageRecIcon} alt="Image Recognition" className="h-20 w-20 mb-2" />
            <span className="text-center">Images</span>
        </div>
      </div>
      <div className="aspect-w-1 aspect-h-1 text-black flex items-center justify-center cursor-pointer hover:bg-slate-200" onClick={() => onOptionClick('MyAccount')}>
        <div className="flex flex-col items-center justify-center">
            <img src={userIcon} alt="User" className="h-20 w-20 mb-2 " />
            <span className="text-center">My Account</span>
        </div>
      </div>
      <div className='flex flex-row gap-1 mt-2'>
        <span className='text-sm'>Give Feedback</span>
        <img src={feedbackIcon} alt="Feedback" />
      </div>
    </div>
  );
};

export default MainMenu;
