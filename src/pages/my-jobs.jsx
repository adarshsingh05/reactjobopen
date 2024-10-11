// this page will be responsible for showing the job posted by reqruter to them and job applied by the candidate to them
import CreatedApplications from '@/components/created-applications';
import CreatedJobs from '@/components/created-jobs';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';

const MyJobs = () => {
const{user, isLoaded}=useUser();

if (!isLoaded ) {
  return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
}

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8"> 
    { user?.unsafeMetadata?.role=== "candidate"
    ? "My Applications"
    : "My Posted Jobs"
    }
      </h1>
      {/* we cretae 2 components and based on the role we will render them */}
      {user?.unsafeMetadata?.role ==="candidate" ?(
        <CreatedApplications/>
      ):(
        <CreatedJobs/>
      )}
    </div>
  )
}

export default MyJobs
