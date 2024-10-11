import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // Shadcn UI Button component
import { Input } from '@/components/ui/input';   // Shadcn UI Input component

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '8800fb0f333f4c34a006a05857f936ce';

  const handleVerifyEmail = async () => {
    if (!email) {
      setVerificationResult('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setVerificationResult(''); // Clear previous results

    try {
      const response = await axios.get(`https://api.zerobounce.net/v2/validate`, {
        params: {
          api_key: apiKey,
          email: email
        }
      });

      const { status, sub_status } = response.data;
      setVerificationResult(`Email Status: ${status}, Sub-Status: ${sub_status}`);
    } catch (error) {
      setVerificationResult('Failed to verify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Email Verification</h1>

      <Input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-80 p-2 border border-gray-300 rounded-md mb-4 dark:bg-gray-800 dark:text-white"
      />

      <Button
        onClick={handleVerifyEmail}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-400"
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </Button>

      {verificationResult && (
        <p className="mt-4 text-lg text-gray-900 dark:text-white">{verificationResult}</p>
      )}
    </div>
  );
};

export default EmailVerification;
