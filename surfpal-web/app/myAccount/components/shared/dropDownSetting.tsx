import { Card, Select, Switch, Typography, Option, select } from '@material-tailwind/react'
import { Kanit } from 'next/font/google';
import React, { useState } from 'react'

interface DropDownSettingProps {
    settingTopic: string,
    settingDesc: string,
    setDropdownResponse: (newValue: string) => void,
    options: Array<string>,
    selected: string
}

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
})

const DropDownSetting: React.FC<DropDownSettingProps> = ({ 
    settingTopic, 
    settingDesc, 
    setDropdownResponse, 
    options, 
    selected
}) => {
    const handleDropdownChange = (value: any) => {
        setDropdownResponse(value);
    };
    
  return (
    <Card placeholder={undefined} className='w-full p-6 mr-8 my-7 grid grid-cols-8 justify-center'>
        <div className='col-span-6 pl-5'>
            <Typography placeholder={undefined} className={`${kanit.className} text-xl font-normal`}>{settingTopic}</Typography>
            <Typography placeholder={undefined}>{settingDesc}</Typography>
        </div>
        <div className='col-span-2 flex items-center justify-start'>
            <div className="w-32">
                <Select 
                    label="Select Version" 
                    onChange={handleDropdownChange} 
                    placeholder={undefined}
                    value={selected}
                    >
                    
                    {options.map((option, index) => {
                        return (
                            <Option key={index} value={option} className='dark:text-black'>
                                {option}
                            </Option>
                        )
                    })}
                </Select>
            </div>  
        </div>
    </Card>
  )
}

export default DropDownSetting