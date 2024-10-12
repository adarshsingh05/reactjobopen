import { createContext, useState, useContext, useEffect } from "react";
import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

// Create the context
const JobContext = createContext();

// Create the provider component
export const JobProvider = ({ children }) => {
  const { user } = useUser();
  const [createdJobsCount, setCreatedJobsCount] = useState(0); // Define state for created jobs count

  const { data: createdJobs, fn: fnCreatedJobs } = useFetch(getMyJobs, {
    recruiter_id: user?.id, // Fetch jobs for the logged-in recruiter
  });

  // Fetch the jobs when the user is available
  useEffect(() => {
    if (user) {
      fnCreatedJobs();
    }
  }, [user]);

  // Update the counts when jobs are loaded
  useEffect(() => {
    if (createdJobs) {
      // Total created jobs count
      setCreatedJobsCount(createdJobs.length);
    }
  }, [createdJobs]);

  // Provide the createdJobsCount to the rest of the app
  return (
    <JobContext.Provider value={{ createdJobsCount }}>
      {children}
    </JobContext.Provider>
  );
};

// Custom hook to access the context
export const useJobContext = () => useContext(JobContext);
