import React from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';

const Navigation: React.FC = () => {
  return (
    <div>
      <Header heading={ModuleNames.NAVIGATION}/>
      {/* Add content for Navigation */}
    </div>
  );
};

export default Navigation;
