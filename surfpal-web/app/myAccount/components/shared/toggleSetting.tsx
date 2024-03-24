import useStore from '@/lib/store';
import { Card, Switch, Typography } from '@material-tailwind/react';
import { Kanit } from 'next/font/google';
import React from 'react';

interface ToggleSettingProps {
    settingTopic: string;
    settingDesc: string;
    toggleState: boolean; // Change: Added toggleState prop
    setToggleResponse: (newValue: boolean) => void;
}

const kanit = Kanit({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const ToggleSetting: React.FC<ToggleSettingProps> = ({ settingTopic, settingDesc, toggleState, setToggleResponse }) => {
    const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setToggleResponse(newValue);
    };

    const { theme } = useStore();

    return (
        <Card placeholder={undefined} className={`${theme} w-full p-6 mr-8 my-7 grid grid-cols-6 justify-center dark:bg-carouselDarkBg dark:text-white`}>
            <div className='col-span-5 pl-5'>
                <Typography placeholder={undefined} className={`${kanit.className} text-xl font-normal`}>{settingTopic}</Typography>
                <Typography placeholder={undefined}>{settingDesc}</Typography>
            </div>
            <div className='col-span-1 flex items-center justify-center'>
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
