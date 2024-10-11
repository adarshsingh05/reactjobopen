import { useState } from "react";
import { Boxes, BriefcaseBusiness, Download, School, ClockIcon, PenIcon } from "lucide-react";
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { CircleX } from "lucide-react";
import ViewSchedule from "./ViewSchedule"; // Import the new ViewSchedule component
import { useUser } from "@clerk/clerk-react";
import FeedbackFormForRecruiter from "./user-recruiter/feedbackbyrecruiterwritingpage";
const ApplicationCard = ({ application, isCandidate = false }) => {
  const {user} = useUser();
  const [viewSchedule, setViewSchedule] = useState(false); // State to track schedule viewing
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); // State to track feedback modal visibility

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status).then(() => fnHiringStatus());
  };

  // Toggle viewing schedule
  const handleScheduleClick = () => {
    setViewSchedule(!viewSchedule);
  };

  // Toggle feedback modal
  const handleReviewClick = () => {
    setIsFeedbackModalOpen(true);
  };

  // Close the feedback modal
  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };
  

  return (
    <Card>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
      
        <CardTitle className="flex justify-between font-bold">
        
        {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : (
              <div className="flex flex-col">
                <span>{application?.name}</span>
                {/* Display candidate user_id (from Clerk or application object) next to the name */}
                <span className="text-gray-500 text-sm">User ID: {application?.candidate_id}</span>
              </div>
              
            )}
            

          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">

        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness size={15} /> {application?.experience} years of experience
          </div>
          <div className="flex gap-2 items-center">
            <School size={15} />
            {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={15} /> Skills: {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>

        {user?.unsafeMetadata?.role === "recruiter" && (
          <div className="flex flex-row items-center">
            <button onClick={handleScheduleClick}>
              <ClockIcon size={18} className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer" />
            </button>
            <div className="text-center text-md font-bold ml-4 mt-1 cursor-pointer">
              {viewSchedule ? 'Hide Schedule' : "Schedule a Meet"}
            </div>
          </div>
        )}

        {user?.unsafeMetadata?.role === "recruiter" && (
          <div className="flex flex-row items-center">
            <button onClick={handleReviewClick}>
              <PenIcon size={18} className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer" />
            </button>
            <div className="text-center text-md font-bold ml-4 mt-1 cursor-pointer">
              {viewSchedule ? 'Write Review' : "Write Review"}
            </div>
          </div>
        )}

        {isCandidate ? (
          <span className="capitalize font-bold">Status: {application.status}</span>
        ) : (
          <Select onValueChange={handleStatusChange} defaultValue={application.status}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>

      {/* Conditionally render the ViewSchedule component with candidate's first name */}
      {viewSchedule && <ViewSchedule currentDate={new Date()} candidateName={application?.name?.split(" ")[0]} />}

      {/* Conditionally render the FeedbackFormForRecruiter component as a modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" rounded-lg shadow-lg max-w-lg w-[auto]">
            {/* Close button for the modal */}
    
            <button onClick={handleCloseFeedbackModal} className="text-white hover:text-black mb-0 mt-6">
            <CircleX color="red" className="mt-14"/>
            
            </button>
         
            {/* Feedback form inside the modal */}
            <FeedbackFormForRecruiter />
          </div>
        </div>
      )}
    </Card>
  );
};

export default ApplicationCard;
