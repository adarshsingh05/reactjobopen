import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import ReactTypingEffect from "react-typing-effect";
import { Link } from "react-router-dom";
import { CarouselContent } from "@/components/ui/carousel";
import { CarouselItem } from "@/components/ui/carousel";
import companies from '../data/companies.json'
import faqs from '../data/faqs.json'
import { CarouselSize } from "@/components/userReviews";
import Autoplay from "embla-carousel-autoplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useUser } from "@clerk/clerk-react";

import { Card,CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const LandingPage = () => {
  const{user}=useUser();
  return (
    <main className='flex flex-col gap-8 sm:gap-20 '>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-3xl font-extrabold sm:text-5xl lg:text-7xl 
        tracking-tighter py-4'>
          Find Opportunities, showcase your skills {' '}
         {/* making the image side by side */}
          <span className="flex items-center gap-2 sm:gap-6 ">
            and Get{" "}
             <img
              src="/logo.png" 
              alt='hired' 
              className='h-14 sm:h-24 lg:h-32'
             />
          </span>
        </h1>
        <p className="text-grey-300 sm:mt-4 text-md sm:text-xl">
        <ReactTypingEffect
          text=" Explore thousands of job listings or find the perfect candidate  "
          speed={20} // typing speed
          eraseSpeed={5}        // Erase speed (faster)
          eraseDelay={100}      // Delay before erasing starts
          typingDelay={50}  // delay before erasing
        />
             </p>
      </section>
      <div className="flex gap-6 justify-center" >
        {/* button and linking to respective place-routing */}
        <Link to='/jobs'>
        {/* adding th custom defined class into the button as variant */}
        <Button variant='blue' size="xl">Find Jobs</Button>
        </Link>

        <Link to={user?.unsafeMetadata?.role === "candidate" ? '#' : '/post-jobs'}>
          <Button 
            variant="red" 
            size="xl" 
            disabled={user?.unsafeMetadata?.role === "candidate"}>
            Post Jobs
          </Button>
        </Link>

 
      </div>
      {/* to add things into curousel we need to prepare the json data find it in src-data-companies.json */}
      {/* curousel code from shadcn ui */}
      <Carousel
      // providing the autoplay as a plugin
      plugins={[
        Autoplay({delay:1000})
      ]}
      className="w-full mpy-10">
      
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
        {/* writing own carousel */}

      {companies.map(({name,id,path})=>{
        return( 
          // defining how many carousel i want according to screen in the classname
        <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
          <img src={path}
          alt={name}
          className="h-9 sm:h-14 object-contain"/>
        </CarouselItem>
        );
      })}
      
      </CarouselContent>
    </Carousel>
    <section>
        <div className="text-center text-2xl sm:text-3xl font-bold mt-4  "> Explore V-jobs' Exclusive Features</div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* cards */}
        {/* card 01 */}
        <Card className='cursor-not-allowed'>
          <CardHeader>
          <div className="flex items-center space-x-2 ">
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-gray-500"
          
        >
          
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
          />
        </svg>
        <CardTitle className="mr-3 cursor-wait">Map View (Feature Comming Soon) </CardTitle>
      </div>
      <CardDescription>Our own code editor with multi Language-Support</CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        Use Hirred Own code editor to run and test your code for your interviews with all new AI Based plagiarism Detector
      </p>
    </CardContent>
  </Card>

        {/* card 02*/}
        <Link to="https://resumetrackerapp.streamlit.app/"> 
        <Card>
          <CardHeader>
            <CardTitle>Resume Test - Live Now</CardTitle>
            <CardDescription>Verify Your Resume with our AI based analysis</CardDescription>
          </CardHeader>
            <CardContent>
              <p>Get Your resume verified Get missing Keywords and Suggestions based on the Project Description</p>
            </CardContent> 
        </Card>
      </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
        {/* cards */}
        {/* card 01 */}
      <Link to="/interviewroom"> {/* Wrap the Card component with Link */}
      <Card >
        <CardHeader>
          <CardTitle>Interview Room  - Live Now</CardTitle>
          <CardDescription>Get Our all new personalised Interview Room</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Get features like inbuilt code editor, video call feature, Interactive live whiteboard. Getfeature to add and save your notes and manage your upcomming interviews.</p>
        </CardContent>
      </Card>
    </Link>

        {/* card 02*/}
        <Card className='cursor-not-allowed'>
          <CardHeader>
            <CardTitle>Referrals (Feature Coming Soon)</CardTitle>
            <CardDescription>Share Referrals with your known ones</CardDescription>
          </CardHeader>
            <CardContent>
              <p>Vjob's Referrals feature allows you to take Referrals from your known ones and also you can give Referralsto the potential candidates</p>
            </CardContent> 
        </Card>
      </section>
   

      {/* banner */}
      <section className="mt-12">
  <div className="text-center">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6">
       Get Started with V-jobs in 4 simple Steps
    </h2>
  </div>
  
  {/* Responsive Timeline Container */}
  <div className="flex flex-col md:flex-row md:overflow-x-auto md:py-4 md:space-x-8 space-y-8 md:space-y-0">
    {/* Timeline Item */}
    <div className="relative flex md:flex-col items-center text-center px-4 border p-3 border-gray-300 rounded-md">
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
      </svg>

      </div>
      <time className="text-sm font-normal text-gray-400 dark:text-gray-500">Step 01</time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Account</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
       Create an account on the V-jobs portal to access all the features for free!
      </p>
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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Onboarding</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
        Mark Your presence with onboarding on the portal as a candidate or as a recruiter to move ahead
      </p>
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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Apply / Post</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
        If you are a candidate apply for the jobs else if you are a recruiter get ahead with post jobs section
      </p>
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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interview and Results</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
        Interview your candidate or get interviewd by your recruiter and wait for the results to proceed
      </p>
      {/* No Line for the Last Item */}
    </div>
  </div>
</section>

{/* section for About us */}
{/* <Card className="relative transition-transform transform-gpu duration-300 hover:scale-105 hover:z-50 group">
  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-50 backdrop-blur-sm"></div>
  <CardTitle className="text-center text-white text-2xl sm:text-3xl font-bold mb-3 mt-3 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#ce623c] group-hover:to-[#3b777f] group-hover:bg-clip-text group-hover:text-white">
    About V-jobs
  </CardTitle>
  <CardContent className="text-white  transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#ce623c] group-hover:to-[#3b777f] group-hover:bg-clip-text   group-hover:text-white">
    Vjobs is a dynamic platform designed to connect freshers with exciting job opportunities at startups from India. Our mission is to empower both job seekers and recruiters by providing a seamless, user-friendly experience for discovering, showcasing, and filling job roles. Whether you’re looking to land your dream job or find the perfect candidate for your project, Vjobs is here to simplify the process and foster meaningful connections in the professional world.
  </CardContent>
</Card> */}

{/* User Review section of the platform */}


{/* accordion */}
<div className='w-[100%]' >
  <div className="text-center text-3xl font-extrabold">Our Testimonials </div>
  <div className="h-1 w-[100%] " variant="blue"></div>
<CarouselSize />
</div>
<h2 className="text-2xl sm:text-3xl font-bold text-center">
        <ReactTypingEffect
          text="Frequently Asked Questions ..."
          speed={20} // typing speed
          eraseSpeed={5}        // Erase speed (faster)
          eraseDelay={100}      // Delay before erasing starts
          typingDelay={50}  // delay before erasing
        />
      </h2>
{/* <div className="text-center">
    <h2 className="text-2xl sm:text-3xl font-bold ">
       Frequently Asked Questions
    </h2>
  </div> */}
<Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>






    </main>
  )
};

export default LandingPage