import React, { useEffect, useState } from "react";
import summeryIcon from '@/assets/icons/summary-icon.png';
import navigationIcon from '@/assets/icons/navigation-icon.svg';
import imageRecIcon from '@/assets/icons/image-rec-icon.svg';
import userIcon from '@/assets/icons/user-icon.svg';
import ModuleNames from "../../constants/Modules";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../context/store";

interface HeaderProps {
    heading: string,
    handleCopyClick?: () => void,
    isSummary?: boolean
}

const Header: React.FC<HeaderProps> = ({heading, handleCopyClick, isSummary}) => {
    const {userSettings} = useStore();
    const [mode, setMode] = useState(userSettings?.theme || '');

    const getHeaderIcon  = (): string => {
        switch (heading) {
            case ModuleNames.NAVIGATION:
                return navigationIcon;
            case ModuleNames.SUMMARIZATION:
                return summeryIcon;
            case ModuleNames.IMAGE_RECOGNITION:
                return imageRecIcon;
            case ModuleNames.MY_ACCOUNT:
                return userIcon;
            default:
                return '';
        }
    }

    return(
        <>
            <div className={`${mode} dark:bg-darkBg w-full p-1 fixed top-0 z-50`}>
                <div className="inline-flex items-center p-3 gap-2">
                    <img src={getHeaderIcon()} alt="" className="h-4" />
                    <h3 className="font-kanit text-primary">{ heading }</h3>
                    {isSummary && (<button onClick={handleCopyClick} className="fixed right-7" title="copy to clipboard">
                        <FontAwesomeIcon icon={faCopy} size="2x"/>
                    </button>) }
                </div>
            </div>
            <hr className="mx-4"/>
        </>
    );
};

export default Header;