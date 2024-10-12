import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchFeedbackrec } from "./feedbackApi"; 
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { allFeedbackrec } from "./feedbackApi";
const Reviewsgiven = () => {
  const { user } = useUser(); // Clerk hook to get logged-in user
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Ensure this is correct

  useEffect(() => {
    const Feedbacks= async () => {

      try {
        const feedbackData = await allFeedbackrec(token); // Pass user.id to API

        if (feedbackData) {
          setFeedback(feedbackData); // Store the feedback data in state
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    Feedbacks();
  }, [user]);

  if (loading) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }


  return (<>

      {/* Recruiter Reviews Section */}
      <section>
      <Card className="bg-transparent text-white h-[300px] overflow-y-scroll border-white rounded-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sticky">See All Reviews</CardTitle>
          <CardDescription className="text-gray-400">View Reviews for every single job applicants</CardDescription>
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
  
      </Card>
    </section>
    </>
  );
};

export default Reviewsgiven;
