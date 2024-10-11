import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchFeedbackrec } from "./feedbackApi"; 
import { BarLoader } from "react-spinners";
import LinkedInShareButton from "@/components/LinkedInShareButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
const UserFeedbackPage = () => {
  const { user } = useUser(); // Clerk hook to get logged-in user
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Ensure this is correct

  useEffect(() => {
    const fetchUserFeedback = async () => {
      if (!user?.id) return; // If user is not logged in, return

      try {
        const feedbackData = await fetchFeedbackrec(token, user.id); // Pass user.id to API

        if (feedbackData) {
          setFeedback(feedbackData); // Store the feedback data in state
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchUserFeedback();
  }, [user]);

  if (loading) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  // Function to generate and download PDF
const handleDownloadReport = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(20);
    doc.text('Job Application Report', 10, 10);
  
    // Add user name
    doc.setFontSize(16);
    doc.text('Name: ' + user?.firstName + ' ' + user?.lastName, 10, 20);
  

  
    // Add recruiter reviews
    doc.text('Recruiter Reviews:', 10, 120);
    feedback.forEach((feedback, index) => {
      doc.text('- ' + feedback.name + ': ' + feedback.feedback, 10, 130 + index * 10);
    });
  
    // Save the PDF
    doc.save('Job_Application_Report.pdf');
  };
  

  return (<>

      {/* Recruiter Reviews Section */}
      <section>
      <Card className="bg-gray-800 text-white h-[300px] overflow-y-scroll border-white rounded-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sticky">Recruiter Reviews</CardTitle>
          <CardDescription className="text-gray-400">What recruiters say about you</CardDescription>
        </CardHeader>
        <CardContent>
        {feedback.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="space-y-4">
          {feedback.map((item) => (
            <li key={item.id} className=" p-2 border-b border-gray-600">
                
                
                
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-300">{item.feedback}</p>
             
              <small className="text-gray-500">
                Created At: {new Date(item.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
        </CardContent>
        <div className="flex justify-between items-center p-4">
          <LinkedInShareButton 
            url="http://localhost:5173/dashboard"  // The URL to the dashboard page you want to share
          />
          <Button className="flex items-center" variant="red" onClick={handleDownloadReport}>
            <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
            Download Report
          </Button>
        </div>
      </Card>
    </section>
    </>
  );
};

export default UserFeedbackPage;
