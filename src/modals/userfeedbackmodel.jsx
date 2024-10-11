// components/ui/Modal.jsx
const UserFeedbackModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            
            <div className="bg-[#020817] rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white-600 hover:text-red-900"
                    size={60}
                    
                >
                    &times;
                    close
                </button>
                {children}
            </div>
        </div>
    );
};

export default UserFeedbackModal;
