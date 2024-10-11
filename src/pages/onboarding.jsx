import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {BarLoader} from 'react-spinners'

const Onboarding = () => {
  // this user will contain so many methods/object with which we can play around
  const {user, isLoaded}=useUser()
  
  // creating the navigate function
  const navigate=useNavigate()
// creating th function of role selection
  const handleRoleSelection=async(role)=>{
    await user
      .update({
        // so updating the user metadata
        unsafeMetadata:{role},
        // when done then, navigate
      }).then(()=>{
        navigate(role==='recruiter'? "/post-jobs" :'/jobs')
      }).catch((err)=>{
        Alert("Error");
        console.log(err);
      })
  };

  // now we dont want user to get back after onboarded
  useEffect(()=>{
    if(user?.unsafeMetadata.role){
      // functional chaining
      navigate(user?.unsafeMetadata?.role==='recruiter'? '/post-jobs':'/jobs'

      )
    }
  },[user])

  
  // if not loaded then show some animation on the page
  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
  }
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
     <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'> I am ....</h2>
     {/* buttons for selection */}
     <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-32'>

      <Button variant='blue'
       className="h-36 text-2xl "
      //  whenever the button is pressed we need to update the role of logged in person
       onClick={()=>{
        handleRoleSelection("candidate")
       }}
       >
        Candidate
      </Button>

      <Button variant='destructive'
       className="h-36 text-2xl "
       onClick={()=>{
        handleRoleSelection("recruiter")
       }}>
        Recruiter
      </Button>

     </div>
    </div>
  )
}

export default Onboarding
