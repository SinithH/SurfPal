// OptionScreens/SummarizationScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import LoginForm from './LoginForm';
import { supabase } from '../../lib/helper/supabaseClient';
import UserCard from './userCard';
import useStore from '../../context/store';
import DropDownSetting from './shared/dropDownSetting';
import ToggleSetting from './shared/toggleSetting';

const MyAccount: React.FC = () => {

  const [user, setUser] = useState({
    user_metadata: {
        avatar_url: '',
    }});

  const {currentUser, userSettings, updateSettings} = useStore();
  const [mode, setMode] = useState(userSettings?.theme || '');

  const [extTheme, setTheme] = useState(userSettings?.theme || 'light');
  const [ttsSetting, setTTSSetting] = useState(userSettings?.texttospeech || false);
  const [fontSize, setFontSize] = useState(userSettings?.fontsize || 'normal');

  const initialSettingsRef = useRef(userSettings);

  useEffect(() => {
    async function getSettings() {
      try {
        if (user) {
          const { data } = await supabase
            .from('settings')
            .select()
            .eq('userid', currentUser?.id)
            .single();

          if (data) {
            setTheme(data.theme);
            setTTSSetting(data.texttospeech);
            setFontSize(data.fontsize);
            updateSettings(data);
          }
        }

      } catch (error) {
        console.error(error);
      }
    }

    getSettings();
  }, [])
  
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser, user])

  useEffect(() => {
    setMode(userSettings?.theme || '');
  }, [userSettings.theme])

  useEffect(() => {
    // Only call updateSettings if the settings have actually changed
    if (initialSettingsRef.current &&
        (ttsSetting !== initialSettingsRef.current.texttospeech ||
         extTheme !== initialSettingsRef.current.theme ||
         fontSize !== initialSettingsRef.current.fontsize)) {

          updateSettings({ theme: extTheme });
          setMode(extTheme);
          updateUserSettings();
        
    }
  }, [ttsSetting, extTheme, fontSize]);


  const updateUserSettings = async () => {
    // Check if a record with the user ID exists in the database
    const existingSettings = await supabase
        .from('settings')
        .select()
        .eq('userid', currentUser.id)
        .single();

    if (existingSettings) {
        // If a record exists, update the existing record
        const { data: updatedData, error: updateError } = await supabase
            .from('settings')
            .update({
                fontsize: fontSize,
                texttospeech: ttsSetting,
                theme: extTheme
            })
            .eq('userid', currentUser.id);

        if (updateError) {
            console.error("Error updating settings:", updateError);
            return;
        }
    } else {
        // If no record exists, insert a new record
        const { data: newData, error: insertError } = await supabase
            .from('settings')
            .insert({
                fontsize: fontSize,
                texttospeech: ttsSetting,
                theme: extTheme
            });
            
        if (insertError) {
            console.error("Error inserting settings:", insertError);
            return;
        }
    }
  }
  
  return (
    <>
      <div className={`${mode} h-full dark:bg-darkBg dark:text-white overflow-hidden`}>
        <Header heading={ModuleNames.MY_ACCOUNT}/>
      {user && currentUser && (
        <>
          <UserCard />
          <div className='grid gap-3 overflow-y-scroll px-10 h-64 pt-5'>
            <DropDownSetting settingTopic={'Set your Theme'} setDropdownResponse={setTheme} options={['light', 'dark']} selected={extTheme} />
            <ToggleSetting settingTopic={'Enable Text-to-Speech'}toggleState={ttsSetting} setToggleResponse={setTTSSetting} />
            <DropDownSetting settingTopic={'Set font size'} setDropdownResponse={setFontSize} options={['small', 'normal', 'large']} selected={fontSize} />
            <div className='h-20'></div>
          </div>
        </>
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
