import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./application-card";
import { useEffect, useState } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user } = useUser();
  const [applicationCount, setApplicationCount] = useState(0);

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (applications) {
      setApplicationCount(applications.length); // Update the count of applications
    }
  }, [applications]);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-center">
        Job Summary: You have applied for {applicationCount} {applicationCount === 1 ? 'job' : 'jobs'}
      </h2>
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications;
