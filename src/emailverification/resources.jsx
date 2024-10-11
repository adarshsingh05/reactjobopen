import React from 'react';
import { Button } from '@/components/ui/button';  // Shadcn UI button component
import { Card, CardHeader, CardContent } from '@/components/ui/card';  // Shadcn UI card components
import { useNavigate } from 'react-router-dom';  // Assuming you're using react-router

const Resources = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center  min-h-screen ">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Get Recruiters Mail Id and Best Cold Emailing Template
      </h1>

      {/* Subheading */}
      <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300 text-center">
        How to Get Recruiter's Mail Id
      </h2>
      <div className="flex flex-col md:flex-row md:overflow-x-auto md:py-4 md:space-x-8 space-y-8 md:space-y-0">
    {/* Timeline Item */}
    <div className="relative flex md:flex-col items-center text-center px-4 border p-3 border-gray-300 rounded-md">
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
      </svg>

      </div>
      <time className="text-sm font-normal text-gray-400 dark:text-gray-500">Step 01</time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Click on below Crad</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
Click on the below card naming get the recruiter mail ID to proceed ahead      </p>
      {/* Connecting Line */}
      <div className="hidden md:block absolute top-2/4 -right-8 md:w-8 h-1 bg-blue-500"></div>
      <div >
 </div>
    </div>

    {/* Timeline Item */}
    <div className="relative flex md:flex-col items-center text-center p-3 px-4 border border-gray-300 rounded-md">
      <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>
</div>
      <time className="text-sm font-normal text-gray-400 dark:text-gray-500">Step 02</time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Details</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
Enter the recruiter's details such as first name, last name and company name      </p>
      {/* Connecting Line */}
      <div className="hidden md:block absolute top-2/4 -right-8 md:w-8 h-1 bg-blue-500"></div>
      <div className="block md:hidden w-1 h-16 bg-blue-500 mt-4"></div>
    </div>

    {/* Timeline Item */}
    <div className="relative flex md:flex-col items-center text-center p-3 px-4 border border-gray-300 rounded-md">
      <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
</svg>
</div>
      <time className="text-sm font-normal text-gray-400 dark:text-gray-500">Step 03</time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generate and verify</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
click on generate email id to get all possible emails then validate them to get the actual one      </p>
      {/* Connecting Line */}
      <div className="hidden md:block absolute top-2/4 -right-8 md:w-8 h-1 bg-blue-500"></div>
      <div className="block md:hidden w-1 h-16 bg-blue-500 mt-4"></div>
    </div>

    {/* Timeline Item */}
    <div className="relative flex md:flex-col items-center text-center p-3 px-4 border border-gray-300 rounded-md">
      <div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
</svg>
</div>
      <time className="text-sm font-normal text-gray-400 dark:text-gray-500">Step 04</time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mail and connect</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
once you get the mail Id proceed to cold mail and all set. Don't have cold mailing template? Don't worry we got your back       </p>
      {/* No Line for the Last Item */}
    </div>
  </div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-[100%] mt-10">

<div className='w-full'>
  {/* Cards Section */}
  <Card className="cursor-pointer hover:shadow-lg mt-6 w-full bg-transparent" onClick={() => navigate('/recruitersmailid')}>
    <CardHeader className="bg-blue-600 text-white p-4 rounded-t-md text-center">
      <h3 className="text-lg font-bold">Get Recruiters' Mail Id</h3>
    </CardHeader>
    <CardContent className="flex flex-col md:flex-row items-center md:items-start justify-between">
      {/* Image Section */}
      <img
        src="/recruitermail.jpeg"
        alt="Recruiter Email"
        className="h-[200px] w-[90%] sm:h-[250px] sm:w-[100%] md:h-[337px] md:w-[350px] mt-4 border rounded-md"
      />
      
      {/* Text and Button Section */}
      <div className="flex flex-col justify-center items-center text-center md:text-left  mt-4 lg:mt-[110px] md:ml-5 md:mt-0">
        <p className="text-gray-700 dark:text-gray-200">
          Find 100s of verified recruiter email IDs to start your cold outreach in just one click.
          Click to proceed with this Vjobs' exclusive feature.
        </p>
        <Button
          variant="blue"
          className="text-white hover:underline mt-4 md:mt-10 w-[120px] mx-auto md:ml-[87px] px-5"
        >
          Explore
        </Button>
      </div>
    </CardContent>
  </Card>
</div>


     


  

   

        {/* Get Cold Emailing Template Card */}
        <Card className="cursor-pointer hover:shadow-lg mt-6" onClick={() => navigate('/getcoldemailtemplate')}>
          <CardHeader className="bg-green-600 text-white p-4 rounded-t-md">
            <h3 className="text-lg font-bold">Get Cold Emailing Template</h3>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700 dark:text-gray-200">
              Access effective cold emailing templates to increase your chances of landing an interview.
            </p>
            <Button variant="link" className="mt-4 text-green-600 hover:underline">
              Explore
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
    
    </div>
  );
};

export default Resources;
