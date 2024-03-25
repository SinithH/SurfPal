import { Purpose } from '@/enum/purpose-enum';
import React, { useState } from 'react';
import browser from 'webextension-polyfill';
import useStore from '../../context/store';

const NavigationLink: React.FC<{ textContent: string; href: string }> = ({ textContent, href }) => {
    const onLinkClick = async (url: string) => {
        const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
        await browser.tabs.sendMessage(tab.id!, { purpose: Purpose.NAVIGATE, url });
    }
    const { userSettings } = useStore()
    const [mode, setMode] = useState(userSettings?.theme || '');
    return <li className={`my-1 p-1 border text-primary rounded cursor-pointer ${mode} dark:bg-darkTileHover dark:text-white`} onClick={() => onLinkClick(href)}>{textContent}</li>
}

export default NavigationLink;