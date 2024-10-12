import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    // Global authentication for the user provided by Clerk
    const { isSignedIn, user, isLoaded } = useUser();
    const { pathname } = useLocation();

    // Show a loading state until the user data is fully loaded
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    // If the user is not signed in, redirect to the sign-in page
    if (!isSignedIn) {
        return <Navigate to="/?sign-in=true" />;
    }

    // If the user is signed in but has not completed onboarding, redirect to onboarding
    if (user && !user.unsafeMetadata?.role && pathname !== '/onboarding') {
        return <Navigate to="/onboarding" />;
    }

    // If all checks pass, render the protected child components
    return children;
};

export default ProtectedRoutes;
