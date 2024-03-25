import { Purpose } from '@/enum/purpose-enum';
import React from 'react';
import browser from 'webextension-polyfill';

const NavigationLinkWithDescription: React.FC<{ textContent: string; href: string; description: string}> = ({ textContent, href, description }) => {
    const onLinkClick = async (url: string) => {
        const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
        await browser.tabs.sendMessage(tab.id!, { purpose: Purpose.NAVIGATE, url });
    }
    return <li className='my-1 p-1 border text-primary rounded cursor-pointer flex flex-col' onClick={() => onLinkClick(href)}>
        <span className='title font-bold'>{textContent}</span>
        <span className="description font-light">{description}</span>
        </li>
}

export default NavigationLinkWithDescription;