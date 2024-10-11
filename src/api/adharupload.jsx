import React, { useState } from 'react';
import { uploadAadharCard } from './apiadhar';
import { useUser } from '@clerk/clerk-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AadharUpload = () => {

  const { user } = useUser();

  // Check if user is defined
  if (!user) {
    return <p>Please log in to upload your Aadhar card.</p>;
  }
  console.log(user.id);
  const id = user.id;
  const [aadharFile, setAadharFile] = useState(null);
  const [candidateId, setCandidateId] = useState(id);
  const [filename, setfilename] = useState('');
  const [success, setSuccess] = useState(false); // State for success message
  const [error, setError] = useState(null); // State for error message

  const handleUpload = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Assuming you store the token in local storage
      const aadharData = { aadharFile, candidate_id: candidateId, filename };
      const result = await uploadAadharCard(token, aadharData);
      console.log('Aadhar Card uploaded successfully:', result);

       // Show success pop-up
       setSuccess(true);
       setError(null); // Clear previous errors
 
       // Reset file name and file input
       setfilename('');
       setAadharFile(null);
 

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error uploading Aadhar Card:', error);
    }
  };

  return (
    <div className=" flex mt-8  h-[420] relative">
      <Card className="max-w-lg w-[500px] shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Upload Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="candidateId">
              Candidate ID (Auto-filled)
            </label>
            <input
              type="text"
              id="candidateId"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-red-500"
              placeholder="Candidate ID"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2 mt-6" htmlFor="filename">
              File Name
            </label>
            <input
              type="text"
              id="filename"
              className="w-full px-3  py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
              value={filename}
              placeholder="File Name"
              onChange={(e) => setfilename(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2 mt-6" htmlFor="aadharFile">
              Upload Your Files
            </label>
            <input
              type="file"
              id="aadharFile"
              className="w-full px-3  py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setAadharFile(e.target.files[0])}
            />
          </div>

          <div className="text-center">
            <Button
              className="w-full mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleUpload}>
              Upload Documents
            </Button>
             {/* Render the Popup component */}
    
          </div>
          {/* Notification for successful upload */}
          {success && (
            <div className="mt-4 p-2 bg-green-500 text-white rounded-md shadow-lg text-center">
              Aadhar Card uploaded successfully ✅!
            </div>
          )}
          {/* Notification for errors */}
          {error && (
            <div className="mt-4 p-2 bg-red-500 text-white rounded-md shadow-lg text-center">
              Error Uploading ❌
              {error}
            </div>
          )}
        </CardContent>
      </Card>
   
     


     
    </div>
  );
};

export default AadharUpload;
