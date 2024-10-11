import { useState } from 'react';
import { addRecruiterFeedback } from '@/api/feedbackApi';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const FeedbackFormForRecruiter = () => {
     // Close the feedback modal

    
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [user_id, setuser_id] = useState('');

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const feedbackData = {
            name,
            feedback,
            user_id,
           
            
        };
    
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Ensure this is correct
    
        const response = await addRecruiterFeedback(token, feedbackData);
        
 

        
        if (response) {
            setSuccess("Feedback submitted successfully!");
            setName('');
            setuser_id('');
            setFeedback('');
            setError(null); // Clear any previous error message
            console.log("Submitting feedback with data:", feedbackData);
        } else {
            setError("error submiting feedbackk."); // This will show only if response is null
            // console.log("Submitting feedback with data:", feedbackData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border rounded-2xl max-w-lg mx-auto bg-gray-600  p-6 shadow-lg mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Submit Your Feedback</h2>
        <div className="mb-4">
            <label className="block mb-1 font-medium">Recruiter Name</label>
            <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-1 font-medium">Candidate_id</label>
            <Input
                type="text"
                value={user_id}
                onChange={(e) => setuser_id(e.target.value)}
                required
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-1 font-medium">Your Feedback</label>
            <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>
      
        <Button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Submit Feedback
        </Button>
     
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-center">{success}</p>}
        
    </form>
    );
};

export default FeedbackFormForRecruiter;
