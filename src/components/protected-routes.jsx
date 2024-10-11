// this file is to make user login before accessing to the pages like saved jobs or post jobs
// this will be wrapped around all the pages except the landing page
import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    // global authentication for the user given by clerk
    const {isSignedIn, user, isLoaded} =  useUser();
    const {pathname} = useLocation();
    if(isLoaded && !isSignedIn && isSignedIn!==undefined){
        return <Navigate to = "/?sign-in=true"/>;
    }
// the first protected route is helping us to make user log in now this will help us to onboard them
    if(
        user!==undefined
        && !user?.unsafeMetadata?.role 
        && pathname!=='/onboarding'
        )
         return <Navigate to='/onboarding'/>;
    return children;
};

export default ProtectedRoutes;
