import supabaseClient from "@/utils/supabase";


// Add events for candidate
export async function addUserEvents(token, eventData) {
    const supabase = await supabaseClient(token); // Use the initialized Supabase client

    // Insert feedback into the feedback table
    const { data, error } = await supabase
        .from("events")
        .insert([eventData]);

    // Log the response for debugging
    console.log("Response from Supabase:", { data, error });

    if (error) {
        console.error("Error adding feedback:", error.message);
        return { success: false, error: error.message }; // Return an object with error details
    }

    return { success: true, data }; // Return success and data 
}

// Fetch all the user events
export async function fetchevents(token,user_id) {
    const supabase = await supabaseClient(token);

    // Fetch feedback from the feedback table
    const { data, error } = await supabase
        .from("events") // Make sure this matches your table name in Supabase
        .select("*")
        .eq('user_id', user_id); 


    if (error) {
        console.error("Error fetching events:", error);
        return null;
    }

    return data;
}