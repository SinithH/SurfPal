import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/helper/supabaseClient';
import useStore from '../../context/store';
import { ToastContainer, toast } from 'react-toastify';
import { Toaster } from 'sonner';

const FeedBackPopover = ({ onClose }: { onClose: () => void }) => {
  const [rateValue, setRateValue] = useState(0);
	const [isSubmit, setIsSubmit] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { currentUser } = useStore();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    if (rateValue) {
			setIsSubmit(true);
		}
    e.preventDefault();

    if (rateValue === 0) { 
      toast.error('Please rate SurfPal from 1 to 5 stars.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return;
    }
   
    if (!feedback) {
      toast.error('Please enter your feedback.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return;
    }
    
  const feedbackData = {
      userid: currentUser?.id || null,
      rating: rateValue,
      message:feedback
    };
  try {
      const { data, error } = await supabase.from('feedbacks').insert([feedbackData]);
        if (error) {
        throw error;
        }
      setFeedback('');
      setRateValue(0);
      console.log('Feedback added successfully:', data);
    } catch (error) {
      console.error('Error adding feedback:',error);
    }
  };
  const handleCancel = (): void => {
    setFeedback('');
    setRateValue(0);
  };
return (
    <>
     <Toaster richColors position='top-center'/>
    <div className='w-50 h-100 fixed inset-0 bg-black bg-opacity-100 backdrop-blur-sm flex justify-center'>
      <div className='mt-5 flex flex-col gap-5 text-white'>
        <button onClick={onClose} className='place-self-end'><X size={30}/></button>
        <div className='bg-gray-400 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4 w-50 h-100'>
          <h1 className="text-3xl font-bold">How did we do?</h1>
          <p className="text-black max-w-md text-xl text-center">
                  Rate "SurfPal" from 1-5 Stars <br />(1-Poor, 5-Excellent)
          </p>
          <div className="grid grid-cols-5 gap-5">
                  {[1, 2, 3, 4, 5].map((value) => {
                    return (
                      <div
                        key={value}
                        className={`grid place-content-center  h-12 w-12 rounded-full cursor-pointer  transition-all ${
                          value === rateValue
                            ? "bg-purple-600  text-white"
                            : "text-gray-400 hover:bg-white hover:text-purple-600  bg-zinc-900"
                        }`}
                        onClick={() => setRateValue(value)}
                      >
                        {value}
                      </div>
                    );
                  })}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea 
              placeholder='Enter Your FeedBack' 
              className='w-full px-4 py-3 text-black border-black rounded-md'
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}/>
          </form>

          <div className='grid grid-cols-2 pt-15 gap-x-5 px-10 sm:grid-cols-1'>
                  <div className='flex justify-start sm:justify-center'>
                    <button type="button"
                      className="w-full bg-primary rounded-xl py-3 px-6 hover:bg-white hover:text-black transition-all"
                      onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                  <div className='flex justify-end sm:justify-center sm:pt-3'>
                    <button 
                      className="w-full bg-primary rounded-xl py-3 px-6 hover:bg-white hover:text-black transition-all"
                      // disabled={isSubmitDisabled}
                      onClick={handleSubmit}>
                      Submit
                    </button>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        />
                  </div>
                </div>
        </div>
      </div>
    </div>
    </>
);
}
export default FeedBackPopover;