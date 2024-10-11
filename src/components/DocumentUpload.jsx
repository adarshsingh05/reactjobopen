import React, { useState, useEffect } from 'react';
import supabaseClient, { supabaseUrl } from '@/utils/supabase';

const DocumentUpload = ({ token }) => {
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const supabase = await supabaseClient(token);
        const random = Math.floor(Math.random() * 90000);
        const fileName = `document-${random}-${file.name}`;

        // Upload file to Supabase storage
        const { error: storageError } = await supabase.storage
            .from('user_doc')
            .upload(fileName, file);

        if (storageError) {
            console.error('Error uploading document:', storageError);
            setLoading(false);
            return;
        }

        const documentUrl = `${supabaseUrl}/storage/v1/object/public/user_doc/${fileName}`;

        // Insert document reference into your database (e.g., a table to track uploads)
        const { data, error } = await supabase
            .from('documents') // Make sure to use the correct table name
            .insert([{ user_id: jobData.candidate_id, url: documentUrl }]) // Adjust as necessary
            .select();

        if (error) {
            console.error('Error saving document reference:', error);
            setLoading(false);
            return;
        }

        console.log('Document uploaded and reference saved:', data);
        fetchUploadedFiles(); // Refresh the file list
        setLoading(false);
    };

    const fetchUploadedFiles = async () => {
        const supabase = await supabaseClient(token);

        const { data, error } = await supabase
            .from('documents') // Fetch the uploaded documents for the user
            .select('*')
            .eq('user_id', jobData.candidate_id); // Adjust this filter based on your user authentication logic

        if (error) {
            console.error('Error fetching documents:', error);
        } else {
            setUploadedFiles(data); // Set the list of uploaded files
        }
    };

    const handleDownload = async (url) => {
        // Create a link to download the document
        const a = document.createElement('a');
        a.href = url;
        a.download = url.split('/').pop(); // Get the file name from the URL
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    useEffect(() => {
        fetchUploadedFiles(); // Fetch files on component mount
    }, [token]);

    return (
        <div>
            <h1>Upload Document</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            <h2>Uploaded Documents</h2>
            <ul>
                {uploadedFiles.map((file) => (
                    <li key={file.id}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                            {file.url.split('/').pop()} {/* Show the file name */}
                        </a>{' '}
                        <button onClick={() => handleDownload(file.url)}>Download</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentUpload;
