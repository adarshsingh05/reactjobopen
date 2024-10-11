import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const LinkedInShareButton = ({ url }) => {
  // LinkedIn only allows the URL to be passed, not title, summary, or source.
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const handleShare = () => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      <FaLinkedin size={16} className="text-white"  />
      Share On Linked In
      
    </button>
  );
};

export default LinkedInShareButton;
