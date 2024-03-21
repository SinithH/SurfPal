// OptionScreens/SummarizationScreen.tsx
import React from 'react';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';

const MyAccount: React.FC = () => {
  return (
    <>
      <div>
      <Header heading={ModuleNames.MY_ACCOUNT}/>
        {/* Add content for My Account */}
      </div>
      <Footer module={ModuleNames.MY_ACCOUNT}/>
    </>
  );
};

export default MyAccount;
