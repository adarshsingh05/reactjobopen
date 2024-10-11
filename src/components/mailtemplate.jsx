import React, { useState } from 'react';

const ColdEmailGenerator = () => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.gemini.com/v1/generate', { // Replace with the correct Gemini API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer AIzaSyDCwXgtub35L74i5RkAbMc-2__w_RvMb3I`, // Replace with your Gemini API key
        },
        body: JSON.stringify({
          prompt: `Create a cold email template for applying to ${position} at ${company} for someone named ${name} with skills in ${skills}.`,
          // Adjust the body structure based on Gemini API requirements
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse the error response
        const errorMessage = errorData?.error?.message || 'Unknown error occurred'; // Check if error is defined
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setEmailTemplate(data.response); // Adjust based on Gemini API response structure
    } catch (error) {
      setError(`Error generating email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Cold Email Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Your Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Your Skills (comma separated):
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Position:
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Company:
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Email'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {emailTemplate && (
        <div>
          <h2>Generated Email Template:</h2>
          <pre>{emailTemplate}</pre>
        </div>
      )}
    </div>
  );
};

export default ColdEmailGenerator;
