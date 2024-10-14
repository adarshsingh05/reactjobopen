import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';  // Shadcn UI button component
import { Carousel, CarouselItem, CarouselContent } from '@/components/ui/carousel'; // Assuming Carousel, CarouselItem, and CarouselContent are from Shadcn UI
import { useNavigate } from 'react-router-dom';   // For navigation
import Autoplay from 'embla-carousel-autoplay';

const GetMailId = () => {
  const [companyName, setCompanyName] = useState('');
  const [emailData, setEmailData] = useState([]); // State to store all email data
  const [filteredData, setFilteredData] = useState([]); // State to store filtered email data
  const [companies, setCompanies] = useState([]); // State to store companies for the carousel
  const navigate = useNavigate();

  // Fetching email data from JSON file
  useEffect(() => {
    const fetchEmailData = async () => {
      try {
        const response = await fetch('src/data/emaildata.json'); // Adjust the path if needed
        const data = await response.json();
        setEmailData(data);
        setFilteredData(data); // Initially set filtered data to all email data
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };

    fetchEmailData();
  }, []);

  // Fetching company data from another JSON file for carousel
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('src/data/companies.json'); // Adjust the path if needed
        const data = await response.json();
        setCompanies(data); // Set companies data from JSON
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  const handleSubmit = () => {
    if (companyName.trim() === '') {
      // If the input is empty, reset to show all data
      setFilteredData(emailData);
    } else {
      const matchedCompanies = emailData.filter(company =>
        company.name.toLowerCase().includes(companyName.toLowerCase())
      );

      if (matchedCompanies.length > 0) {
        setFilteredData(matchedCompanies);
      } else {
        setFilteredData([]); // Clear filtered data if no match found
      }
    }

    console.log(`Searching for: ${companyName}`);
  };

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      alert(`Copied: ${email}`);
    });
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  // Function to highlight matched letters
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text; // Return original text if search term is empty

    const regex = new RegExp(`(${searchTerm})`, 'gi'); // Create a case-insensitive regex
    const parts = text.split(regex); // Split the text by the search term

    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-grey-800">{part}</span> // Highlighted part
      ) : (
        part // Non-highlighted part
      )
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Get Mail Id Based on Company Names
      </h1>

      {/* Search Box and Button */}
      <div className="flex flex-col md:flex-row items-center mb-6">
        <input
          type="text"
          placeholder="Enter Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-2/3 mr-2 dark:bg-gray-700 dark:text-white"
        />
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Submit
        </Button>
      </div>

      {/* Carousel for Companies */}
      <Carousel
        plugins={[Autoplay({ delay: 1000 })]} // Autoplay feature with a delay of 1000ms
        className="w-full my-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
              <div className="flex flex-col items-center">
                <img
                  src={path}
                  alt={name}
                  className="h-14 object-contain"
                />
                <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white">{name}</h2>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Filtered Data or No Data Message */}
      {filteredData.length > 0 ? (
        filteredData.map((company, index) => (
          <div key={index} className="w-full bg-transparent p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{highlightText(company.name, companyName)}</h2>
            <ul className="list-disc pl-5 mb-4">
              {company.emails.map((email, emailIndex) => (
                <li key={emailIndex} className="text-gray-700 dark:text-gray-300 flex justify-between">
                  <span>{highlightText(email, companyName)}</span>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleCopy(email)}
                      className="bg-green-500 text-white hover:bg-green-600 m-2"
                    >
                      Copy
                    </Button>
                    <Button
                      onClick={() => handleEmail(email)}
                      className="bg-blue-500 text-white hover:bg-blue-600 m-2"
                    >
                      Email
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-xl text-red-500">No data available</p>
      )}
    </div>
  );
};

export default GetMailId;
