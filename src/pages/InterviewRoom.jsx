import React, { useState } from 'react'

import 'react-calendar/dist/Calendar.css';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Notes from '@/components/Notes';
import { useEffect } from 'react';
import EventsList from '@/temp components/EventList';
import AadharUpload from '@/api/adharupload';
import AadharCardViewer from '@/api/adharview';
import ReactTypingEffect from 'react-typing-effect';



const InterviewRoom = () => {
  const [success, setSuccess] = useState(false);

  

  

  const navigate = useNavigate();
  const { user } = useUser();
 
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true); // Declare the loading state



  // interview meet
  const[value, setValue] = useState();
  const navigater = useNavigate()
  const handlejoinRoom =useCallback(()=>{
navigate(`/room/${value}`)
  },[navigater,value])


  
  const isRecruiter = user?.unsafeMetadata?.role === 'recruiter';


  // for rendering the video
  useEffect(() => {
    // Set a timer to hide the loading screen after 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); 

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <video
          autoPlay
          muted
          style={{ width: '100%', height: 'auto' }}
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser is too Old Lad.
        </video>
      </div>
    );
  }

return ( <>
  <div>
    {/* gmeet, code editor and calendar */}
    <div className='  gradient-title text-2xl font-extrabold sm:text-4xl lg:text-5xl text-center mb-12'>
      Welcome to the Interview Room, <span className='bg-gradient-to-r from-[#c96844] to-[#3b777f] bg-clip-text'>{user?.firstName}!!</span>
      <div  className='gradient-title text-xl  sm:text-2xl lg:text-3xl text-center mb-2 mt-4'>
      Hope you are doing good {isRecruiter ? ' With your Recruitment Process' : 'With your Interviews'} !
      </div>

    </div>
    <div className='flex flex-col lg:flex-row w-full lg:justify-between items-center'>
      {/* GMeet Div */}
    <div className='rounded-md lg:w-[33%] w-full border-[3px] border-[#41767c] mb-8 lg:mb-0 mr-3' >
        <div className='bg-white dark:bg-gray-600 h-[15%] py-4'>
          <h2 className="text-xl font-extrabold mb-4 text-center">Quick Connect</h2>
        </div>
        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='w-[35%] h-[31%] mx-auto lg:mx-0'>
            <img src='/vc.png' alt='code editor' />
          </div>
          <div className='text-center text-xl font-bold mt-4 lg:mt-16 lg:mr-8'>
            One-on- One Video Call
          </div>
        </div>
        <p className='text-center'>
Excess the features of live one - on - one video call completely for free powered by V-jobs along with free and secured chat features. This also allows you to share your screen in realtime        </p>
        <div className='mt-3 ml-3 mb-3 flex flex-row justify-around'>
            <div className='mt-2'>
              <input value={value} 
              onChange={(e)=>setValue(e.target.value)}  
              type='text' 
              placeholder='Enter code given by recruiter'
              className='h-8 text-blue-700 rounded-sm border-[1px] border-[#41767c]' />
            </div>
            <div className='mt-1'>
              <Button
              variant='red'
              onClick={handlejoinRoom}>Connect
              </Button>
            </div>
        
        </div>

      </div>
      
    
      {/* Code Editor Div */}
      <div className='rounded-md bg-[#020817] lg:w-[33%] w-full border-[3px] border-[#c16947] mb-8 lg:mb-0'>
        <div className='bg-white dark:bg-gray-600 h-[15%] py-4'>
          <h2 className="text-xl font-extrabold mb-4 text-center">V-Jobs Live Code Editor</h2>
        </div>
        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='w-[40%] h-[35%] mx-auto lg:mx-0'>
            <img src='/codeeditorimage.png' alt='code editor' />
          </div>
          <div className='text-center text-xl font-bold mt-4 lg:mt-16 lg:mr-8'>
            AI Powered Code Editor
          </div>
        </div>
        <p className='text-center'>
          This is V-Jobs own code editor supporting multiple languages. An AI powered code editor that allows you to check code plagiarism in real-time.
        </p>
        
        <a href="https://code-editor-tan-psi.vercel.app/" target="_blank" rel="noopener noreferrer">
          <Button
            variant="blue"
            className="text-center ml-[32%] mt-4 mb-3"
          >
            <p className="text-l">Open Live Code Editor</p>
          </Button>
      </a>

      </div>

      {/* Separator Div */}
      <div className="hidden lg:block h-[380px] bg-blue-500 w-[2px] mx-5"></div>

     

      <div className=' lg:w-[32%] w-full  '>
          <div className='border-[3px] rounded-sm border-[#41767c] h-[384px]  mx-2'>
                <div className='bg-white dark:bg-gray-600 h-[15%] py-4'>
                  <h2 className="text-xl font-extrabold mb-8 text-center">V-Jobs Interactive Whiteboard</h2>
                </div>
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='w-[40%] h-[35%] ml-2 lg:mx-2 mt-4'>
                      <img src='/whiteboard.png' alt='whiteboard' />
                    </div>
                    <div className='text-center text-xl font-bold mt-4 lg:mt-16 lg:mr-8 mb-6'>
                      Real-Time Interactive Whiteboard
                    </div>
                </div>
                <p className='text-center mt-8 text-s sm:text-sm md:text-base lg:text-["17px"]'>
                Explore V-Jobs exclusive real-time whiteboard for communication. Explain your thoughts visually and make it more appealing.
              </p>

            
              
            <Button
              variant="blue"  onClick={() => navigate('/whiteboard')}
              className='text-center ml-[32%] mt-7 mb-3'>
              <p className='text-l'>Open Whiteboard</p>
            </Button>
          
          </div>
      </div>


    </div>

    <section>
      {/* Line */}
      <div className="hidden lg:block w-[100%] bg-blue-500 h-[2px] mt-14 mb-14"></div>

      {/* Overall div */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4  '>
      
        <div className='rounded-md   lg:w-[85%] w-full  border-[#c16947] mb-2 lg:mb-0 ml-6 mt-4'>
              <Notes/>
            </div>
            {/* <div> show: {user.id}</div> */}

          <div>
            <EventsList/>
          </div>

          </div>

      
    </section>

    {/* new section to view and upload documents */}
   
  </div>

  {/* section to display keep all your needed doc at one place */}
  <section>
  <p className="text-grey-300 sm:mt-4 text-2xl  sm:text-3xl lg:text-4xl text-center font-bold">
        <ReactTypingEffect
          text=" Keep all Your needed Documents at one safe place..  "
          speed={60} // typing speed
          eraseSpeed={50}        // Erase speed (faster)
          eraseDelay={1000}      // Delay before erasing starts
          typingDelay={40}  // delay before erasing
        />
             </p>
  </section>

  <div className='flex flex-row w-[full] mt-6'>
   {/* AadharUpload Component */}
   <div className='w-[50%]'>
     <AadharUpload />
     </div>

  
 <div className='w-[50%]'>
   {/* AadharCardViewer Component */}
     <AadharCardViewer />
   

     </div>
     

 </div>


  </>
  
  
);
}

export default InterviewRoom;