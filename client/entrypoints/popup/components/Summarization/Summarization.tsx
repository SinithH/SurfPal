// OptionScreens/SummarizationScreen.tsx
import React, { useState } from 'react';
import Header from '../shared/Header';
import ModuleNames from '../../constants/Modules';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../shared/Footer';

const Summarization: React.FC = () => {

  const summery: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus dui quam, id auctor lacus dapibus at. Ut tincidunt lorem eget risus rutrum aliquam. Nulla egestas, lectus ac eleifend eleifend, eros nisl efficitur justo, ac fringilla diam metus sit amet neque. Maecenas suscipit lectus eget aliquam facilisis. Aliquam eget iaculis tellus, iaculis vestibulum metus. Mauris sit amet massa nec mauris congue convallis. Suspendisse varius ex et nibh ultrices molestie. Praesent quis tellus imperdiet, semper quam a, tempor libero. Vivamus quis pulvinar ex. Nullam eget auctor sapien, a mattis purus. Fusce convallis nulla sed lacinia malesuada. Sed accumsan in sem sit.';
  const [summary, setSummery] = useState<string>(summery)

  const handleCopyClick = () => {
    clipboardCopy(summary);
    toast.success('Copied to Clipboard', { position: 'top-center', autoClose: 500, hideProgressBar: true, pauseOnHover: false });
  }

  return (
    <div>
      <Header heading={ModuleNames.SUMMERIZATION} handleCopyClick={handleCopyClick} isSummery={true}/>
      {/* Add content for Summarization */}
      {/* font size should be user customizable */}
      <div className='h-80 mt-5 px-5 text-base overflow-y-scroll'>  
        <p className='font-kanit w-full'>
          { summery }
        </p>
      </div> 
      <Footer/>
    </div>
  );
};

export default Summarization;
