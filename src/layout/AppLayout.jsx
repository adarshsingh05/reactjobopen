import { useState } from 'react';
import Header from "@/components/header";
import { Link, Outlet } from "react-router-dom";
import UserFeedbackModal from '@/modals/userfeedbackmodel';
import FeedbackForm from '@/components/feedback';
const AppLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="grid-background"></div>
            <main className="min-h-screen container">
                <Header/>
                <Outlet />
            </main>

            {/* Footer */}
            <div className="flex">
                <div className="bg-gray-800 height-[auto] w-[100%] m-6 border rounded-md">
                    <div className="bg-[#020817] flex flex-row h-[40%] justify-around mt-3 mb-2 ml-4 mr-4 border rounded-md">
                      <Link to='https://www.linkedin.com/in/adarshsingh05/'>
                        <div className="font-extrabold">Contact us</div>
                        </Link>
                        <Link to='https://github.com/adarshsingh05/Freelancing-portal'>
                        <div className="font-extrabold">Contribute</div>
                        </Link>
                        <div
                            className="font-extrabold cursor-pointer"
                            onClick={openModal} // Open modal on click
                        >
                            Give Feedback
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        The site is currently in Development Mode, contribute to make it even better ❤️
                    </div>
                </div>
            </div>

            {/* Modal for Feedback Form */}
            <UserFeedbackModal isOpen={isModalOpen} onClose={closeModal}>
                <FeedbackForm />
            </UserFeedbackModal>
        </div>
    );
};

export default AppLayout;
