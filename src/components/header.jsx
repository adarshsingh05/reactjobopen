import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button';
import { SignedIn, SignIn } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';
import { LayoutDashboard } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
// import { SignedOut } from '@clerk/clerk-react';
import { MenubarDemo } from './menubar';
import { SignedOut } from '@clerk/clerk-react';
import { BriefcaseBusiness, PenBox } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
// import { LayoutDashboard } from 'lucide-react';
const Header = () => {
// creating a state to handle buttons and over lay
 const [showSignIn, setShowSignIn]=useState(false);
//  taking out the user object
 const{user}=useUser();

//  creating a function such that wherever user is I need to make if login if he is not already
const[search, setSearch]= useSearchParams();

useEffect(()=>{
  if(search.get('sign-in')){
    setShowSignIn(true);
  }
}, [search])
//function to handle overlay click
  const handleOverlayClick=(e)=>{
    if(e.target===e.currentTarget){
      setShowSignIn(false);
    }
  }



  return (
  <>
    <nav className='py-4 flex justify-between items-center'>
    <div>
  <Link>
    <img src='/logo.png' alt="V Jobs Logo" className="w-24 md:w-34 lg:w-40" />
  </Link>
</div>
<div className='h-full w-full lg:flex hidden ml-[135px]' >
  <MenubarDemo />
</div>
      
    {/* handling the user authentication and the styling */}

    <div className='flex gap-8'>
      <SignedOut>
      <Button variant="outline" onClick={()=>setShowSignIn(true)}>Login</Button>
      </SignedOut>
      <SignedIn>
{/* show this button only when the user is recruiter so add a condition */}
        {user?.unsafeMetadata?.role==="recruiter" &&(
        <Link to="/post-jobs">
        <Button variant="red" className='rounded-full'> 
          {/* adding a logo */}
          <PenBox size={20} className='mr-2' />
          Post Job</Button>
        </Link>
        )}

        {/* for the joob seekers */}

        {user?.unsafeMetadata?.role==="candidate" &&(
          <Link to ="/dashboard">
            <Button variant="blue" >
            <LayoutDashboard size={20} className='mr-2 ' />
            Dashboard
            </Button>
          </Link>
        )}

        <UserButton
      //  adding more options to user Button 
         appearance={{
          elements: {
            avatarBox: "w-10 h-10",
          },
         }}
         >
          <UserButton.MenuItems>
            {/* first option */}
            <UserButton.Link
            label= {user?.unsafeMetadata?.role==="recruiter" ? 'Track Your Jobs ' : 'Track Your Applications'}
            labelIcon={<BriefcaseBusiness size={15}/>}
            href='/my-jobs'
            />
            {/* second option  */}
            <UserButton.Link
             label={user?.unsafeMetadata?.role==="recruiter" ? 'My Posted Jobs ' : 'My Saved Jobs'}
            labelIcon={<BriefcaseBusiness size={15}/>}
            href={user?.unsafeMetadata?.role==="recruiter" ? 'my-jobs' : '/saved-jobs'}
            />
            </UserButton.MenuItems>
          </UserButton>
      </SignedIn>

    </div>
    </nav>

    {/* using the state whenevr user login redirect to the onboarding screen */}
    {showSignIn && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      /* adding a function so that whenver we click outside the div it should dissapear */
      onClick={handleOverlayClick}
      >
      <SignIn
      signUpForceRedirectUrl='/onboarding'
      fallbackRedirectUrl='/onboarding'
      
      />
      </div>
    )}
   </>
  )
}

export default Header;
