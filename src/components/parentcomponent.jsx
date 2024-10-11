// ParentComponent.js
import { useEffect, useState } from "react";
import CreatedApplications from "./CreatedApplications"; // Adjust the import path as necessary
import { getApplications } from "@/api/apiApplication"; // Adjust the import path as necessary
import useFetch from "@/hooks/use-fetch"; // Adjust the import path as necessary

const ParentComponent = () => {
  const [appliedCount, setAppliedCount] = useState(0);
  const { user } = useUser(); // If you're using user context, make sure to import useUser

  const { loading: loadingApplications, data: applications, fn: fnApplications } = useFetch(getApplications, { user_id: user.id });

  useEffect(() => {
    fnApplications();
  }, []);

  useEffect(() => {
    if (applications) {
      const count = applications.filter(app => app.status === "applied").length; // Calculate the count of applied jobs
      setAppliedCount(count); // Update the count state
    }
  }, [applications]);

  return (
    <div>
      <h1>Jobs Applied: {appliedCount}</h1>
      <CreatedApplications applications={applications} appliedCount={appliedCount} />
    </div>
  );
};

export default ParentComponent;
