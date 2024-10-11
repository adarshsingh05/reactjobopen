import supabaseClient from "@/utils/supabase";


// Add feedback
export async function addFeedback(token, feedbackData) {
    const supabase = await supabaseClient(token); // Use the initialized Supabase client

    // Insert feedback into the feedback table
    const { data, error } = await supabase
        .from("feedback")
        .insert([feedbackData]);

    // Log the response for debugging
    console.log("Response from Supabase:", { data, error });

    if (error) {
        console.error("Error adding feedback:", error.message);
        return { success: false, error: error.message }; // Return an object with error details
    }

    return { success: true, data }; // Return success and data 
}

// Fetch all feedback
export async function fetchFeedback(token) {
    const supabase = await supabaseClient(token);

    // Fetch feedback from the feedback table
    const { data, error } = await supabase
        .from("feedback") // Make sure this matches your table name in Supabase
        .select("*");

    if (error) {
        console.error("Error fetching feedback:", error);
        return null;
    }

    return data;
}

// Add recruiter feedback for candidate
export async function addRecruiterFeedback(token, feedbackData) {
    const supabase = await supabaseClient(token); // Use the initialized Supabase client

    // Insert feedback into the feedback table
    const { data, error } = await supabase
        .from("recruiterreviews")
        .insert([feedbackData]);

    // Log the response for debugging
    console.log("Response from Supabase:", { data, error });

    if (error) {
        console.error("Error adding feedback:", error.message);
        return { success: false, error: error.message }; // Return an object with error details
    }

    return { success: true, data }; // Return success and data 
}

// Fetch all recruiter review feedback
export async function fetchFeedbackrec(token,user_id) {
    const supabase = await supabaseClient(token);

    // Fetch feedback from the feedback table
    const { data, error } = await supabase
        .from("recruiterreviews") // Make sure this matches your table name in Supabase
        .select("*")
        .eq('user_id', user_id); 


    if (error) {
        console.error("Error fetching feedback:", error);
        return null;
    }

    return data;
}

