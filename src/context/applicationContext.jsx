import { createContext, useState, useContext, useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

// Create the context
const ApplicationContext = createContext();

// Create the provider component
export const ApplicationProvider = ({ children }) => {
  const { user } = useUser();
  const [applicationCount, setApplicationCount] = useState(0);
  const [interviewingCount, setInterviewingCount] = useState(0); // <-- Define state for interviewing count
  const [hiredCount, sethiredCount] = useState(0); // <-- Define state for hired count
  const [rejectedCount, setrejectedCount] = useState(0); // <-- Define state for rejected count

  const { data: applications, fn: fnApplications } = useFetch(getApplications, {
    user_id: user?.id, // Fetch applications for the logged-in user
  });

  // Fetch the applications when the user is available
  useEffect(() => {
    if (user) {
      fnApplications();
    }
  }, [user]);

  // Update the counts when applications are loaded
  useEffect(() => {
    if (applications) {
      // Total applications count
      const applied = applications.filter((application) =>
        ['applied', 'interviewing', 'hired', 'rejected'].includes(application.status)
      );
      setApplicationCount(applied.length);

      // Calculate interviewing count
      const interviewingApps = applications.filter(
        (application) => application.status === 'interviewing'
      );
      setInterviewingCount(interviewingApps.length);

      // Calculate rejected count
      const rejected = applications.filter(
        (application) => application.status === 'rejected'
      );
      setrejectedCount(rejected.length);

    //   get the hired count
    const hirring =applications.filter(
        (application) => application.status === 'hired'
    );
    sethiredCount(hirring.length);
    }
  }, [applications]);

  // Provide both applicationCount and interviewingCount to the rest of the app
  return (
    <ApplicationContext.Provider value={{ applicationCount, interviewingCount, hiredCount, rejectedCount }}>
      {children}
    </ApplicationContext.Provider>
  );
};

// Custom hook to access the context
export const useApplicationContext = () => useContext(ApplicationContext);
