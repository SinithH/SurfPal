import { Purpose } from '@/enum/purpose-enum';
import React from 'react';
import browser from 'webextension-polyfill';

const NavigationLink: React.FC<{ textContent: string; href: string}> = ({ textContent, href }) => {
    const onLinkClick = async (url: string) => {
        const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
        await browser.tabs.sendMessage(tab.id!, { purpose: Purpose.NAVIGATE, url });
    }
    return <li className='my-1 p-1 border text-primary rounded cursor-pointer' onClick={() => onLinkClick(href)}>{textContent}</li>
}

export default NavigationLink;