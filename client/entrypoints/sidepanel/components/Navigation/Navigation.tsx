import React, { useState } from 'react';

import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import Footer from '../shared/Footer';
import NavigationLink from './NavigationLink';
import useNavigationStore from '../../context/navigation-store';
import NavigationSearch from './NavigationSearch';
import NavigationLoading from './NavigationLoading';
import NavigationLinks from './NavigationLinks';

const Navigation: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { data, contentUrl } = useNavigationStore();
  const links = data[contentUrl];

  return (
    <>
      <Header heading={ModuleNames.NAVIGATION} />
      <div className='pb-10'>
        {loading && <NavigationLoading /> }
        {!loading && <NavigationLinks links={links} />}
      </div>
      <Footer module={ModuleNames.NAVIGATION} />
    </>
  );
};

export default Navigation;

