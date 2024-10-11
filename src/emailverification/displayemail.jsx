import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input'; // Shadcn UI Input component
import { Button } from '@/components/ui/button'; // Shadcn UI Button component
import { Card, CardContent } from '@/components/ui/card'; // Shadcn UI Card component
import axios from 'axios';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2

const CircularProgress = ({ used, total }) => {
  const radius = 40; // Radius of the circle
  const strokeWidth = 10; // Width of the stroke
  const normalizedRadius = radius - strokeWidth / 2; // Adjusted radius
  const circumference = normalizedRadius * 2 * Math.PI; // Circumference of the circle

  const progress = (used / total) * circumference; // Calculate progress based on used credits

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e6e6e6" // Background circle color
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#3b82f6" // Progress circle color
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${progress} ${circumference}`} // Update the strokeDasharray to represent the progress
        style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }} // Animation effect
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const EmailGenerator = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isHR, setIsHR] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [validationResults, setValidationResults] = useState({});
  const [validationsUsed, setValidationsUsed] = useState(0);
  const [lastValidationTime, setLastValidationTime] = useState(null);
  const maxValidations = 3;

  useEffect(() => {
    const storedValidationsUsed = localStorage.getItem('validationsUsed');
    const storedLastValidationTime = localStorage.getItem('lastValidationTime');

    if (storedValidationsUsed) {
      setValidationsUsed(Number(storedValidationsUsed));
    }

    if (storedLastValidationTime) {
      const lastTime = new Date(storedLastValidationTime);
      setLastValidationTime(lastTime);
    }
  }, []);

  const canValidate = () => {
    if (validationsUsed < maxValidations) return true;
    if (!lastValidationTime) return true;

    const now = new Date();
    const elapsed = now - lastValidationTime;
    return elapsed >= 24 * 60 * 60 * 1000; // 24 hours
  };

  const handleGenerateEmails = () => {
    if (!firstName || !lastName || !companyName) {
      alert('Please fill in all fields');
      return;
    }

    const domainIn = companyName.toLowerCase() + '.in';
    const domainCom = companyName.toLowerCase() + '.com';

    const generatedEmails = [
      `${firstName.toLowerCase()}@${domainIn}`,
      `${lastName.toLowerCase()}.${firstName.toLowerCase()}@${domainCom}`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domainCom}`,
      `${lastName.charAt(0).toLowerCase()}.${firstName.toLowerCase()}@${domainCom}`,
      `${lastName.charAt(0).toLowerCase()}${firstName.toLowerCase()}@${domainCom}`,
      `${lastName.toLowerCase()}@${domainCom}`,
      `${lastName.toLowerCase()}-${firstName.toLowerCase()}@${domainCom}`,
    ];

    if (isHR) {
      generatedEmails.push(
        `${firstName.toLowerCase()}.hr@${domainIn}`,
        `${lastName.toLowerCase()}.hr@${domainIn}`,
        `${firstName.charAt(0).toLowerCase()}.hr@${domainIn}`,
        `${lastName.charAt(0).toLowerCase()}.hr@${domainIn}`,
        `${firstName.toLowerCase()}_${lastName.toLowerCase()}.hr@${domainIn}`
      );
    }

    setEmailList(generatedEmails);
    setValidationResults({});
  };

  const handleValidate = async (email) => {
    if (!canValidate()) {
      alert('Your limit exceeds. Please try tomorrow.');
      return;
    }

    const apiKey = '044b239d20864646a49f7472a26e79e9'; // Replace with actual API key
    try {
      const response = await axios.get(`https://api.zerobounce.net/v2/validate`, {
        params: {
          api_key: apiKey,
          email: email
        }
      });

      const { status } = response.data;
      setValidationResults((prevResults) => ({
        ...prevResults,
        [email]: status === 'valid'
      }));

      const newValidationsUsed = validationsUsed + 1;
      setValidationsUsed(newValidationsUsed);
      setLastValidationTime(new Date());

      localStorage.setItem('validationsUsed', newValidationsUsed);
      localStorage.setItem('lastValidationTime', new Date().toISOString());
    } catch (error) {
      alert('Failed to validate email. Please try again.');
    }
  };

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    alert('Email copied to clipboard');
  };

  const handleMail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-transparent p-6">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Get Mail ID with One Click</h1>
      
      <div className="mb-4 text-lg justify-center flex flex-row">
        <CircularProgress used={validationsUsed} total={maxValidations} />
        <div className="text-center mt-6 ml-4">
          Your today's Credit Used For Email Validation: {validationsUsed}/{maxValidations}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 mt-8">
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full md:w-48 p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full md:w-48 p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full md:w-48 p-2 border border-gray-300 rounded-md"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isHR}
            onChange={() => setIsHR(!isHR)}
            className="mr-2"
          />
          <span>Is HR</span>
        </div>
        <Button
          onClick={handleGenerateEmails}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Search
        </Button>
      </div>
      {emailList.length > 0 && (
        <div className="mb-4 mt-4 text-lg text-center">
          Below are the most probable Mail IDs for your Search Result
        </div>
      )}

      <div className="flex flex-col gap-4 w-full max-w-3xl">
  
        {emailList.map((email, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg p-4">
            <CardContent className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">{email}</p>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                {validationResults[email] === true ? (
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    <span className="text-green-600">Valid</span>
                  </div>
                ) : validationResults[email] === false ? (
                  <div className="flex items-center gap-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <span className="text-red-600">Invalid</span>
                  </div>
                ) : (
                  <Button onClick={() => handleValidate(email)} className="bg-blue-500 text-white">
                    Validate
                  </Button>
                )}
                <Button onClick={() => handleCopy(email)} className="bg-gray-400 text-white">
                  Copy
                </Button>
                <Button
                  onClick={() => handleMail(email)}
                  className="bg-blue-500 text-white"
                >
                  Mail
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmailGenerator;
