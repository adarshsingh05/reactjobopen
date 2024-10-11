import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'

// map
import UserPage  from './pages/UserPage';
import SchedulePage from './pages/SchedulePage'
import DashboardPage from './pages/DashboardPage';
import AppLayout from './layout/AppLayout';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/onboarding';
import SavedJobs from './pages/saved-jobs';
import MyJobs from './pages/my-jobs';
import JobListing from './pages/job-listing';
import JobPage from './pages/jobs';
import PostJobs from './pages/post-jobs';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoutes from './components/protected-routes';
import InterviewRoom from './pages/InterviewRoom';
import Whiteboard from './pages/Whiteboard';
import HomePage from './components/home';
import RoomPage from './components/room';
import { ApplicationProvider } from './context/applicationContext';
import FeedbackForm from './components/feedback';
import ViewFeedback from './components/viewFeedback';
import FeedbackFormForRecruiter from './components/user-recruiter/feedbackbyrecruiterwritingpage';
import UserFeedbackPage from './api/viewuserfeedback';
import EventsList from './temp components/EventList';
import AadharUpload from './api/adharupload';
import AadharCardViewer from './api/adharview';
import EmailVerification from './emailverification/uiofmail';
import Resources from './emailverification/resources';
import EmailGenerator from './emailverification/displayemail';
import EmailVerifier from './emailverification/displayemail';
import ColdMailTemplate from './components/mailtemplate';
import ColdMailBuilder from './components/mailtemplate';
// Defining the router dom and creating the route for the multi pages app.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // All the routes will be inside the children pages
    children: [
      {
        path: '/',  
        element: <LandingPage />
      },
      {
        path: '/onboarding',  
        element: (
          <ProtectedRoutes> 
            <Onboarding />
          </ProtectedRoutes>
        )
      },
      {
        path: '/homepage',  
        element: (
          <ProtectedRoutes> 
            <HomePage />
          </ProtectedRoutes>
        )
      },
      {
        path: '/room/:roomId',  
        element: (
          <ProtectedRoutes> 
            <RoomPage />
          </ProtectedRoutes>
        )
      },
      {
        path: '/saved-jobs',  
        element: (
          <ProtectedRoutes> 
            <SavedJobs />
          </ProtectedRoutes>
        )
      },
      {
        path: '/job-listing',  
        element: (
          <ProtectedRoutes> 
            <JobListing />
          </ProtectedRoutes>
        )
      },
      {
        path: '/jobs', 
        element: (
          <ProtectedRoutes>  
            <JobListing />
          </ProtectedRoutes>
        ) 
      },
      {
        path: '/whiteboard', 
        element: (
          <ProtectedRoutes>  
            <Whiteboard />
          </ProtectedRoutes>
        ) 
      },
      {
        path: '/interviewroom', 
        element: (
          <ProtectedRoutes>  
            <InterviewRoom />
          </ProtectedRoutes>
        ) 
      },
      {
        path: '/upload', 
        element: (
          <ProtectedRoutes>  
            <AadharUpload />
          </ProtectedRoutes>
        ) 
      },
     
      {
        path: '/my-jobs',  
        element: (
          <ProtectedRoutes> 
            <MyJobs />
          </ProtectedRoutes>
        )
      },
      {
        path: '/post-jobs',  
        element: (
          <ProtectedRoutes> 
            <PostJobs />
          </ProtectedRoutes>
        )
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoutes> 
            <JobPage />
          </ProtectedRoutes>
        )
      },
      {
        path: '/dashboard',  
        element: (
          <ProtectedRoutes> 
            <DashboardPage /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/user-schedule',  
        element: (
          <ProtectedRoutes> 
            <SchedulePage /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/write-feedback',  
        element: (
          <ProtectedRoutes> 
            <FeedbackForm /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/view-feedback',  
        element: (
          <ProtectedRoutes> 
            <ViewFeedback /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/recruiters-review',  
        element: (
          <ProtectedRoutes> 
            <FeedbackFormForRecruiter /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/event-list',  
        element: (
          <ProtectedRoutes> 
            <EventsList /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/resources',  
        element: (
          <ProtectedRoutes> 
            <Resources /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/mailtemplate',  
        element: (
          <ProtectedRoutes> 
            <ColdMailTemplate /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/recruitersmailid',  
        element: (
          <ProtectedRoutes> 
            <EmailGenerator /> 
          </ProtectedRoutes>
        )
      },
      {
        path: '/verifyemail',  
        element: (
          <ProtectedRoutes> 
            <EmailVerification /> 
          </ProtectedRoutes>
        )
      },
    
    
      {
        path: '/userpage',
        element: (
          <ProtectedRoutes>
            <UserPage />
          </ProtectedRoutes>
        )
      }
    ],
  },
]);

function App() {
  return (
    <ApplicationProvider> {/* Wrapping the entire app with ApplicationProvider */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApplicationProvider>
  );
}

export default App;