'use client'

import { Typography } from '@material-tailwind/react'
import { Kanit } from 'next/font/google'
import React, { useState } from 'react'
import ToggleSetting from './shared/toggleSetting'
import DropDownSetting from './shared/dropDownSetting'

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})

const SettingsSection = () => {

    const [imageRecognition, setImageRecognition] = useState(false);
    const [ttsSetting, setTTSSetting] = useState(false);
    const [theme, setTheme] = useState('light');
    const [fontSize, setFontSize] = useState('normal');
    const [ttsSpeed, setTTSSpeed] = useState('normal');
    
  return (
    <>
        <div className='w-full lg:w-2/3 flex flex-col items-center float-right pt-7'>
            <Typography placeholder={undefined} className={`${kanit.className} text-2xl lg:text-4xl font-normal`}>Customize your Extension</Typography>
            <div className='pt-8 w-full px-8'>
                <ToggleSetting 
                    settingTopic={'Enable Image Recognition'} 
                    settingDesc={'Enabling this feature will allow you to generate text descriptions for the images in a web page.'} 
                    setToggleResponse={setImageRecognition}                    
                />
                <ToggleSetting 
                    settingTopic={'Enable Text-To-Speech'} 
                    settingDesc={'Power up the immersive text-to-speech engine of SurfPal'} 
                    setToggleResponse={setTTSSetting}                    
                />
                <DropDownSetting 
                    settingTopic={'Select the preferred theme'} 
                    settingDesc={'This will change the theme of the extension. You can change it any time.'} 
                    setDropdownResponse={setTheme}
                    options={['light', 'dark']}
                    selected={theme}
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