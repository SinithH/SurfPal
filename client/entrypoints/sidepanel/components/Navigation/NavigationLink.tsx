import React from 'react';

const NavigationLink: React.FC<{ textContent: string; href: string, currentUrl: string }> = ({ textContent, href, currentUrl }) => {
    const url = (href.startsWith('/')) ? currentUrl + href : href
    return <li className='my-1 p-1 border text-primary rounded'>
        <a href={url} target='_blank'>{textContent}</a>
    </li>
}

export default NavigationLink;