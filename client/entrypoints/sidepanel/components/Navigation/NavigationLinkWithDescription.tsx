import { Purpose } from '@/enum/purpose-enum';
import React, { useState } from 'react';
import browser from 'webextension-polyfill';
import useStore from '../../context/store';

const NavigationLinkWithDescription: React.FC<{ textContent: string; href: string; description: string; index: number }> = ({ textContent, href, description, index }) => {
    const onLinkClick = async (url: string) => {
        const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
        await browser.tabs.sendMessage(tab.id!, { purpose: Purpose.NAVIGATE, url });
    }
    const { userSettings } = useStore();
    const [mode, setMode] = useState(userSettings?.theme || '');
    return (
        <li className={`${mode} dark:bg-darkTileHover dark:text-white my-1 p-1 border text-primary rounded cursor-pointer flex flex-row w-full items-center gap-3`} onClick={() => onLinkClick(href)}>
            <span className='m-1 p-2 rounded-lg bg-primary text-white' data-tooltip-target={'tooltip-' + index} >{index}</span>
            <div id={'tooltip-' + index} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Ctrl + Shift + {index}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="flex flex-col">
                <span className='title font-bold'>{textContent}</span>
                <span className="description font-light">{description}</span>
            </div>
        </li>
    )
}

export default NavigationLinkWithDescription;