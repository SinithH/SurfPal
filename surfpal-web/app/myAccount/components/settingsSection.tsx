'use client'

import { Typography } from '@material-tailwind/react'
import { Kanit } from 'next/font/google'
import React, { useEffect, useRef, useState } from 'react'
import ToggleSetting from './shared/toggleSetting'
import DropDownSetting from './shared/dropDownSetting'
import { updateSettings } from '@/app/server-actions/updateSettings'
import useStore from '@/lib/store'

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})

interface SettingsSectionProps {
    userSettings: {
        imagerecognition: boolean,
        texttospeech: boolean,
        theme: string,
        fontsize: string,
        ttsspeed: string
    }
}

const SettingsSection: React.FC<SettingsSectionProps> = ({userSettings}) => {
    
    const { theme } = useStore();
    const [imageRecognition, setImageRecognition] = useState(userSettings?.imagerecognition || false);
    const [ttsSetting, setTTSSetting] = useState(userSettings?.texttospeech || false);
    const [extTheme, setTheme] = useState(userSettings?.theme || 'light');
    const [fontSize, setFontSize] = useState(userSettings?.fontsize || 'normal');
    const [ttsSpeed, setTTSSpeed] = useState(userSettings?.ttsspeed || 'normal');
    
    const initialSettingsRef = useRef(userSettings);

    useEffect(() => {
        // Only call updateSettings if the settings have actually changed
        if (initialSettingsRef.current &&
            (imageRecognition !== initialSettingsRef.current.imagerecognition ||
             ttsSetting !== initialSettingsRef.current.texttospeech ||
             extTheme !== initialSettingsRef.current.theme ||
             fontSize !== initialSettingsRef.current.fontsize ||
             ttsSpeed !== initialSettingsRef.current.ttsspeed)) {
            updateSettings({
                imageRecognition,
                ttsSetting,
                theme: extTheme,
                fontSize,
                ttsSpeed
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [imageRecognition, ttsSetting, extTheme, fontSize, ttsSpeed]);
    
  return (
    <>
        <div className={`${theme} w-full lg:w-2/3 flex flex-col items-center float-right pt-7 dark:text-white`}>
            <Typography placeholder={undefined} className={`${kanit.className} text-2xl lg:text-4xl font-normal`}>Customize your Extension</Typography>
            <div className='pt-8 w-full px-8'>
                <ToggleSetting 
                    settingTopic={'Enable Image Recognition'} 
                    settingDesc={'Enabling this feature will allow you to generate text descriptions for the images in a web page.'} 
                    toggleState={imageRecognition}
                    setToggleResponse={setImageRecognition}                    
                />
                <ToggleSetting 
                    settingTopic={'Enable Text-To-Speech'} 
                    settingDesc={'Power up the immersive text-to-speech engine of SurfPal'} 
                    toggleState={ttsSetting}
                    setToggleResponse={setTTSSetting}                    
                />
                <DropDownSetting 
                    settingTopic={'Select the preferred theme'} 
                    settingDesc={'This will change the theme of the extension. You can change it any time.'} 
                    setDropdownResponse={setTheme}
                    options={['light', 'dark']}
                    selected={extTheme}
                />
                <DropDownSetting 
                    settingTopic={'Select the preferred font size'} 
                    settingDesc={'Change the font size of the extension. We always care about you!'} 
                    setDropdownResponse={setFontSize}
                    options={['small', 'normal', 'large']}
                    selected={fontSize}
                />
                <DropDownSetting 
                    settingTopic={'Text-to-speech Speed'} 
                    settingDesc={'Have your text to speech assistance at your preferred speed!'} 
                    setDropdownResponse={setTTSSpeed}
                    options={['slow', 'normal', 'fast']}
                    selected={ttsSpeed}
                />
            </div>
        </div>
    </>
  )
}

export default SettingsSection