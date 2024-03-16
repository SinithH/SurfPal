import React from 'react';

const NavigationLink: React.FC<{textContent: string; href: string}> = ({textContent, href}) => {
    return <li className='my-1 p-1 border text-primary rounded'><a href={'https://github.com'+href} target='_blank'>{textContent}</a></li>
}

export default NavigationLink;