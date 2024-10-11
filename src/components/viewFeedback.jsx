// ViewFeedback.jsx
import { useEffect, useState } from 'react';
import { fetchFeedback } from '@/api/feedbackApi';

const ViewFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Ensure this is correct

    useEffect(() => {
        const getFeedback = async () => {
            const data = await fetchFeedback(token);
            if (data) {
                setFeedbacks(data);
            } else {
                setError("Failed to fetch feedback.");
            }
        };

        getFeedback();
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Feedbacks</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="space-y-4">
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <li key={feedback.id} className="p-4 border rounded-md shadow">
                            <div className='flex flex-row justify-between'>
                            <h3 className="font-semibold"> {feedback.name}</h3>
                            <h3>Rating: {feedback.rating}</h3>
                            </div>
                            <p className="mt-2"> {feedback.feedback}</p>
                        </li>
                    ))
                ) : (
                    <p>No feedback available.</p>
                )}
            </ul>
        </div>
    );
};

export default ViewFeedback;
