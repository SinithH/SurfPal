import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import Footer from '../shared/Footer';
import browser from 'webextension-polyfill';

interface INavigationResponse {
  data: {
    navigation: {
      text: string,
      url: string
    }[],
    content: {
      text: string,
      url: string
    }[]
  }
}


const Navigation: React.FC = () => {
  let contentScript = '';
  let currentUrl = '';
  browser.runtime.onMessage.addListener((message) => {
    contentScript = message.textBody
    currentUrl = message.currentUrl
    fetchLinks();
  });
  const fetchLinks = async () => {
    if (!contentScript || !currentUrl ) {
      return;
    }
    const result = await fetch(import.meta.env.VITE_NAVIGATION_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: contentScript,
        url: currentUrl
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
        <div className="p-3">
          <h1 className='mb-2'>The Navigation Links: </h1>
          <hr />
          <ul>
            {data?.data.navigation.map((link) => {
              return <li>{link.text}: {link.url}</li>
            })}
          </ul>
          <h1 className='my-2'>The Content Links: </h1>
          <hr />
          <ul>
            {data?.data.content.map((link) => {
              return <li>{link.text}: {link.url}</li>
            })}
          </ul>
        </div>
      </div>
      <Footer module={ModuleNames.NAVIGATION} />
    </>
  );
};

export default Navigation;

