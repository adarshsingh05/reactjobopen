import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import React from "react";
import jsPDF from "jspdf";
import GithubStyleHeatmap from "@/components/GithubStyleHeatmap";
import Chart from "@/components/Chart";
import ReferralsChart from "@/components/ReferralsChart";
import PieChart from "@/components/PieChart";
import LinkedInShareButton from "@/components/LinkedInShareButton";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"; // Updated import
import { Line } from "react-chartjs-2";
import { useApplicationContext } from "@/context/applicationContext";
import UserFeedbackPage from "@/api/viewuserfeedback";


// function for generating chart

const generateDummyData = () => {
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Interviews',
        data: [3, 2, 4, 5, 6, 2, 3, 1, 0, 4, 3, 5], // Dummy data for interviews per month
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };
};

const InterviewChart = () => {
  const data = generateDummyData();
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Line data={data} options={options} />;
};

const DashboardPage = () => {
  const { applicationCount, interviewingCount,hiredCount, rejectedCount } = useApplicationContext();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const skills = [
    { name: 'Graphic Design', rating: 4 },
    { name: 'Web Development', rating: 4 },
    { name: 'Copywriting', rating: 3.0 },
  ];

  const applicationStats = {
    submitted: applicationCount,
    interviews: interviewingCount,
    interviewCleared: hiredCount,
    offers: rejectedCount,
  };

  const data = [
    applicationStats.submitted,
    applicationStats.interviews,
    applicationStats.interviewCleared,
    applicationStats.offers,
  ];

// Function to generate and download PDF
const handleDownloadReport = () => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('Job Application Report', 10, 10);

  // Add user name
  doc.setFontSize(16);
  doc.text('Name: ' + user?.firstName + ' ' + user?.lastName, 10, 20);

  // Add application stats
  doc.setFontSize(12);
  doc.text('Application Stats:', 10, 30);
  doc.text('- Applications Submitted: ' + applicationStats.submitted, 10, 40);
  doc.text('- Total No of Interviews: ' + applicationStats.interviews, 10, 50);
  doc.text('- No of Interviews Cleared: ' + applicationStats.interviewCleared, 10, 60);
  doc.text('- No of Job Offers received: ' + applicationStats.offers, 10, 70);

  // Add skill ratings
  doc.text('Skill Ratings:', 10, 80);
  skills.forEach((skill, index) => {
    doc.text('- ' + skill.name + ': ' + skill.rating + '/5', 10, 90 + index * 10);
  });



  // Save the PDF
  doc.save('Job_Application_Report.pdf');
};




  return (
    
    
      <main className="flex flex-col gap-8 p-6">
        {user?.unsafeMetadata?.role === 'candidate' ? (
          <>
            {/* Header */}
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white">Welcome, {user?.firstName} !!</h1>
              <p className="text-gray-400 mt-2">Manage your job applications and portfolio</p>
            </header>
    
            {/* Summary Section */}
            <div className="texte-center text-xl flex flex-row justify-evenly">
              <div>
                <h3>Summary - {applicationCount} Applications Submitted</h3>
              </div>
            </div>
    
            {/* Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
              {/* Job Applications Card */}
              <Card className="bg-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                  <CardDescription>View and manage your job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="blue" onClick={() => handleNavigate('/my-jobs')}>My Jobs</Button>
                </CardContent>
              </Card>
    
              {/* Profile Card */}
              <Card className="bg-gray-800 text-white">
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="blue" onClick={() => navigate('/userpage')}>My Profile</Button>
                </CardContent>
              </Card>
    
              {/* Saved Jobs */}
              <Card className="bg-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                  <CardDescription>View your saved job listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="blue" onClick={() => handleNavigate('/saved-jobs')}>View Saved Jobs</Button>
                </CardContent>
              </Card>
            </section>
    
            {/* Stats and Chart Section */}
            <section className="flex flex-row gap-10 h-auto w-auto max-h-[240px]">
              {/* Applications Stats Card */}
              <section className="bg-gray-800 text-white w-[35%] flex-grow">
                <Card className="h-[100%]">
                  <CardHeader>
                    <CardTitle className="text-center">Application Stats</CardTitle>
                    <CardDescription className="text-center">Track your application progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-center">Applications Submitted: {applicationStats.submitted}</p>
                    <p className="text-lg text-center">Total No of Interviews: {applicationStats.interviews}</p>
                    <p className="text-lg text-center">No of Interviews Cleared: {applicationStats.interviewCleared}</p>
                    <p className="text-lg text-center">No of Application Rejected: {applicationStats.offers}</p>
                  </CardContent>
                </Card>
              </section>
    
              {/* Pie Chart */}
              <section className="w-[40%]">
                <PieChart className="w-[100%]" data={data} />
              </section>
            </section>
    
            {/* Rating Per Skill and Recruiter Reviews Section */}
            <section className="flex flex-col md:flex-row gap-8 w-[100%] ">
              {/* Rating Per Skill Section */}
              <section className="w-full md:w-[50%]">
                <Card className="bg-gray-800 text-white h-[300px] overflow-y-scroll border border-white rounded-md">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Rating Per Skill</CardTitle>
                    <CardDescription className="text-gray-400 p-2 border-b border-gray-600">View your skill ratings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="font-bold">Skill</div>
                      <div className="font-bold text-right">Rating</div>
                      {skills.map((skill, index) => (
                        <React.Fragment key={index}>
                          <div className="p-2">{skill.name}</div>
                          <div className="p-2 flex justify-end items-center">
                            {Array.from({ length: 5 }, (_, i) => {
                              if (i < Math.floor(skill.rating)) {
                                return <span key={i} className="text-purple-500">★</span>;
                              } else if (i === Math.floor(skill.rating) && skill.rating % 1 !== 0) {
                                return <span key={i} className="text-purple-500">★</span>;
                              } else {
                                return <span key={i} className="text-gray-400">★</span>;
                              }
                            })} ({skill.rating})
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </CardContent>
                  <div className="flex justify-between items-center p-4">
                    <LinkedInShareButton 
                      url="http://localhost:5173/dashboard"  // The URL to the dashboard page you want to share
                    />
                    <Button className="flex items-center" variant="red" onClick={handleDownloadReport}>
                      <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                      Download Report
                    </Button>
                  </div>
                </Card>
              </section>
    
              {/* Recruiter Reviews Section */}
              <section className="w-full md:w-[50%] sticky top-20">
                <UserFeedbackPage/>
              </section>
            </section>
    
            {/* Section for showing the Interview and Referrals Charts */}
            <section className="flex gap-6 h-[320px] w-full mt-5">
              {/* Interviews Held Per Month Chart */}
              <div className="w-1/2">
                <Card className="bg-#020817 text-white h-[100%]">
                  <CardHeader>
                    <CardTitle className="p-2 border-b border-gray-600">Interviews Held Per Month (Feature Comming Soon)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[95%]">
                    <InterviewChart className="h-[100%]" />
                  </CardContent>
                </Card>
              </div>
    
              {/* Referrals Given and Received Chart */}
              <div className="w-1/2">
                <Card className="bg-#020817 text-white h-[100%]">
                  <CardHeader>
                    <CardTitle className="p-2 border-b border-gray-600">Referrals Given and Received (Feature Comming Soon)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[95%]">
                    <ReferralsChart className="h-[100%]" />
                  </CardContent>
                </Card>
              </div>
            </section>
    
            {/* Login Consistency */}
            <div className='text-center text-xl font-semibold mb-4 mt-14'> Your Login Consistency</div>
            <div className='rounded-md bg-[#020817]  w-full border-[3px] border-[#70c9d9] mb-8 lg:mb-0'>  
              <GithubStyleHeatmap/>
            </div>
          </>
        ) : (
          <div className="text-center text-white text-2xl">
            Coming soon...
          </div>
        )}
      </main>
    );
}


export default DashboardPage;