// apiLogin.js
import supabaseClient from "@/utils/supabase";

// Get User Login Data
export async function getUserLoginData(token, userId) {
  const supabase = await supabaseClient(token);
  
  console.log(`Fetching login data for user ID: ${userId}`);

  try {
    const { data, error } = await supabase
      .from("login_data")
      .select("date")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching login data:", error.message);
      return null;
    }

    // Format the data for the heatmap
    const formattedData = data.map((entry) => ({
      date: entry.date,
      count: 1, // Each login gets a count of 1
    }));

    console.log("Fetched formatted login data:", formattedData);
    return formattedData;
  } catch (error) {
    console.error("Exception in fetching login data:", error);
    return null;
  }
}

// Store User Login Data (Mark presence)
export async function storeUserLogin(token, userId) {
  const supabase = await supabaseClient(token);
  const loginDate = new Date().toISOString().split("T")[0]; // Today's date

  console.log(`Checking if user ID: ${userId} has already marked presence for today (${loginDate})`);

  try {
    // Check if the user has already marked presence today
    const { data: existingEntries, error: fetchError } = await supabase
      .from("login_data")
      .select("id")
      .eq("user_id", userId)
      .eq("date", loginDate);

    if (fetchError) {
      console.error("Error checking login data:", fetchError.message);
      throw new Error("Error checking login data");
    }

    // If already marked, throw an error
    if (existingEntries.length > 0) {
      console.log("User has already marked presence for today");
      throw new Error("Presence already marked for today");
    }

    // Insert the login data for today
    console.log(`Marking presence for user ID: ${userId} on ${loginDate}`);
    const { data, error } = await supabase
      .from("login_data")
      .insert([{ user_id: userId, date: loginDate }]);

    if (error) {
      console.error("Error storing login data:", error.message);
      throw new Error(error.message);
    }

    console.log("Presence marked successfully:", data);
    return data;
  } catch (error) {
    console.error("Exception in marking presence:", error);
    throw error;
  }
}
