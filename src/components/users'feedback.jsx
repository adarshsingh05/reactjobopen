      // Dummy recruiter reviews data
  const reviews = [
    { reviewer: 'John Doe', comment: 'Very strong candidate with great skills!' },
    { reviewer: 'Jane Smith', comment: 'Impressive work ethic and communication skills.' },
    { reviewer: 'Recruiter X', comment: 'Would recommend for future projects.' },
    { reviewer: 'Recruiter Y', comment: 'Excellent coding ability, needs to work on time management.' },
  ];

     {/* Recruiter Reviews Section */}
     <section className="w-full md:w-[50%] sticky top-20">
     <Card className="bg-gray-800 text-white h-[300px] overflow-y-scroll border-white rounded-md">
       <CardHeader className="text-center">
         <CardTitle className="text-2xl sticky">Recruiter Reviews</CardTitle>
         <CardDescription className="text-gray-400">What recruiters say about you</CardDescription>
       </CardHeader>
       <CardContent>
         {reviews.map((review, index) => (
           <div key={index} className="p-2 border-b border-gray-600">
             <p className="text-lg font-semibold">{review.reviewer}</p>
             <p className="text-gray-300">{review.comment}</p>
           </div>
         ))}
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