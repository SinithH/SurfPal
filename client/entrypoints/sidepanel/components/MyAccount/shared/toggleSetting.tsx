import { Card, Typography, Switch } from "@material-tailwind/react";
import useStore from "@/entrypoints/sidepanel/context/store";
import { useEffect, useState } from "react";

interface ToggleSettingProps {
    settingTopic: string;
    toggleState: boolean;
    setToggleResponse: (newValue: boolean) => void;
}


const ToggleSetting: React.FC<ToggleSettingProps> = ({ settingTopic, toggleState, setToggleResponse }) => {
    const { userSettings } = useStore();
    const [mode, setMode] = useState(userSettings?.theme || '');
    
    const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setToggleResponse(newValue);
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
                <Switch
                    id="custom-switch-component"
                    ripple={false}
                    className="h-full w-full bg-gray-200 dark:bg-darkBg checked:bg-[#9E00E8]"
                    containerProps={{
                        className: "w-11 h-6",
                    }}
                    circleProps={{
                        className: "before:hidden left-0.5 border-none",
                    }}
                    checked={toggleState}
                    onChange={handleToggleChange} 
                    crossOrigin={undefined}            
                />
            </div>
        </Card>
    );
};

export default ToggleSetting;