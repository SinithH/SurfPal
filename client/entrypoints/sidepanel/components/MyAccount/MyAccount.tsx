// OptionScreens/SummarizationScreen.tsx
import React, { useEffect, useState } from 'react';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import LoginForm from './LoginForm';
import { supabase } from '../../lib/helper/supabaseClient';
import UserCard from './userCard';
import useStore from '../../context/store';

const MyAccount: React.FC = () => {

  const [user, setUser] = useState({
    user_metadata: {
        avatar_url: '',
    }});

  const {currentUser, userSettings} = useStore();
  const [mode, setMode] = useState(userSettings?.theme || '');

  
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser, user])
  
  return (
    <>
      <div className={`${mode} h-full dark:bg-darkBg dark:text-white overflow-hidden`}>
        <Header heading={ModuleNames.MY_ACCOUNT}/>
      {user && currentUser && (
        <UserCard />
      )}
      {!user && !currentUser && (
        <LoginForm />
      )}
      </div>
      <Footer module={ModuleNames.MY_ACCOUNT}/>
    </>
  );
};

export default MyAccount;
