import supabaseClient from "@/utils/supabase";

// Fetch Jobs

// this file will contain all the fetched data from the supabase related to the job postings
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  
  let query = supabase
    .from("jobs")
    .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;

}

// save unsave jobs
export async function saveJob(token, { alreadySaved },saveData) {
  const supabase = await supabaseClient(token);

  if(alreadySaved){
    const { data, deleteError } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("job_id",saveData.job_id);
    if(deleteError){
      console.error("error deleting the saved job",deleteError);
      return null;
    }
    return data;


  }
  else{
    const { data, insertError } = await supabase
    .from("saved_jobs")
    .insert([saveData])
    .select();

    if(insertError){
      console.error("error inserting the saved job",insertError);
      return null;
    }
    return data;

  }
}

// show single job
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const {data ,error} = await supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching company:", error);
    return null;
  }

  return data;
}

// hiring satatus

// show single job
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  const {data ,error} = await supabase
    .from("jobs")
    .update({isOpen})
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error updating the job:", error);
    return null;
  }

  return data;
}

export async function addNewJob(token, _,jobData){
  const supabase= await supabaseClient(token);

  const{data,error} = await supabase
  .from ("jobs")
  .insert([jobData])
  .select();

  if(error || data.length ===0){
    console.log("error creating job", error);
    return null;
  }
  return data;
}

// for getting the saved jobs

export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}

// get my created jobs
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}
  
  