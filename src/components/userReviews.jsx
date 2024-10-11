// CarouselSize.jsx
import * as React from "react";
import { useState, useEffect } from "react";
import { fetchFeedback } from "@/api/feedbackApi"; // Import the fetchFeedback function
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Helper function to truncate text to the first 35 words
const truncateReview = (review, wordLimit = 35) => {
  const words = review.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : review;
};

export function CarouselSize() {
  const [feedbacks, setFeedbacks] = useState([]); // State for storing feedbacks
  const [error, setError] = useState(null); // State for handling errors
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Ensure this is correct

  useEffect(() => {
    const loadFeedbacks = async () => {
      const data = await fetchFeedback(token);
      if (data) {
        setFeedbacks(data); // Update the feedback state with fetched data
      } else {
        setError("Failed to fetch feedback.");
      }
    };

    loadFeedbacks();
  }, [token]);

  if (error) {
    return <div>{error}</div>; // Render error if fetching feedback fails
  }

  return (
    <div className="w-full flex justify-center items-center py-4">
      <Carousel
        plugins={[
          Autoplay({delay:1000})
        ]}
        className="w-full max-w-5xl"
      >
        <CarouselContent className="flex">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center px-4"
              >
                <div>
                  <Card className="w-80 h-70 flex items-center justify-center">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="font-bold">{feedback.name}</h3>
                      <p className="mt-2">{truncateReview(feedback.feedback)}</p>
                      <p className="mt-2 font-semibold">Rating: {feedback.rating}⭐</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          ) : (
            <p className="text-center">No feedback available.</p>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
