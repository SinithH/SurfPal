import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import Footer from '../shared/Footer';
import browser from 'webextension-polyfill';
import NavigationLink from './NavigationLink';
import useNavigationStore, { INavigationResponse } from '../../context/navigation-store';

const Navigation: React.FC<{links: INavigationResponse; url: string}> = ({links, url}) => {
  const loading = false
  return (
    <>
      <Header heading={ModuleNames.NAVIGATION} />
      <div>
        <div className="p-3">
          {/* {loading && <h1>Generating...</h1>} */}
          {<h1 className='mb-2'>The Navigation Links: </h1>}
          <hr />
          <ul>
            {links?.data.navigation.map((link) => {
              return <NavigationLink textContent={link.text} href={link.url} currentUrl={url} key={link.text} />
            })}
          </ul>
        </div>
      </div>
      <Footer module={ModuleNames.NAVIGATION} />
    </>
  );
};

export default Navigation;

