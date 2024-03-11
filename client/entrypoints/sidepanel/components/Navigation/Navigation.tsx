import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import Footer from '../shared/Footer';
import browser from 'webextension-polyfill';

const Navigation: React.FC = () => {
  let contentScript = '';
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    contentScript = message.textBody
    fetchLinks();
  });
  const fetchLinks = async () => {
    if(!contentScript) { 
      return;
    }
  
    const result = await fetch(import.meta.env.VITE_NAVIGATION_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: contentScript
      })
    })
    if (!result) {
      throw new Error('failed to fetch')
    }
  
    setData(await result.json());
  }
  const [data, setData] = useState<INavigationResponse>();

  return (
    <>
      <div>
        <Header heading={ModuleNames.NAVIGATION} />
        <h1 className='m-3'>The Navigation Links: </h1>
        <ul className='mx-3 mt-3'>
          {data?.data.navigation.map((link: { [key: string]: string }) => {
            return <li>{link[Object.keys(link)[0]]}</li>
          })}
        </ul>
        <h1 className='m-3'>The Content Links: </h1>
        <ul className='mx-3 mt-3'>
          {data?.data.content.map((link: { [key: string]: string }) => {
            return <li>{link[Object.keys(link)[0]]}</li>
          })}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Navigation;

interface INavigationResponse {
  data: {
    navigation: {
      [key: string]: string
    }[],
    content: {
      [key: string]: string
    }[]
  }
}