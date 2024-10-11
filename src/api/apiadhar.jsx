
import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// - Upload Aadhar Card ( candidate )
export async function uploadAadharCard(token, aadharData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `aadhar-${random}-${aadharData.candidate_id}`;

  // Upload Aadhar Card to Supabase storage
  const { error: storageError } = await supabase.storage
    .from("aadhar_cards")
    .upload(fileName, aadharData.aadharFile,aadharData.filename);

  if (storageError) throw new Error("Error uploading Aadhar Card");

  // Construct the URL for the uploaded Aadhar Card
  const aadharUrl = `${supabaseUrl}/storage/v1/object/public/aadhar_cards/${fileName}`;

  // Insert Aadhar Card details into the database (e.g., aadhar table)
  const { data, error } = await supabase
    .from("aadhar_applications")
    .insert([
      {
        candidate_id: aadharData.candidate_id,
        aadhar_url: aadharUrl,
        name: aadharData.filename
        // Add any other necessary fields from aadharData
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Aadhar Card Application");
  }

  return data;
}
// fetch adhar
export const fetchAadharCards = async (userId, token) => {
  const supabase = await supabaseClient(token);
  
  const { data, error } = await supabase
    .from("aadhar_applications")
    .select("id, aadhar_url,name,created_at")
    .eq("candidate_id", userId);
  
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

