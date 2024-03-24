import { Card, Typography, Select, Option } from "@material-tailwind/react";
import useStore from "@/entrypoints/sidepanel/context/store";
import { useEffect, useState } from "react";

interface DropDownSettingProps {
    settingTopic: string,
    setDropdownResponse: (newValue: string) => void,
    options: Array<string>,
    selected: string
}

const DropDownSetting: React.FC<DropDownSettingProps> = ({ 
    settingTopic, 
    setDropdownResponse, 
    options, 
    selected
}) => {

    const { userSettings } = useStore();
    const [mode, setMode] = useState(userSettings?.theme || '');

    const handleDropdownChange = (value: any) => {
        setDropdownResponse(value);
    };

    useEffect(() => {
        setMode(userSettings?.theme || '');
    }, [userSettings.theme])

    
  return (
    <Card placeholder={undefined} className={`${mode} w-full p-6 flex flex-row justify-between items-center dark:bg-darkTileHover dark:text-white`}>
        <div className=''>
            <Typography placeholder={undefined} className={`text-sm font-normal`}>{settingTopic}</Typography>
        </div>
        <div className='flex'>
            <div>
                <Select 
                    label="Select Version" 
                    onChange={handleDropdownChange} 
                    placeholder={undefined}
                    value={selected}
                    color={'blue-gray'}
                    >
                    
                    {options.map((option, index) => {
                        return (
                            <Option key={index} value={option} className="dark:text-black">
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