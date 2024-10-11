import React from 'react';

const StarRating = ({ rating, onChange, size = 24 }) => {
  const stars = Array(5).fill(0);

  return (
    <div className="flex space-x-1">
      {stars.map((_, index) => (
        <svg
          key={index}
          onClick={() => onChange(index + 1)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-${size} w-${size} cursor-pointer ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 .587l3.668 7.429 8.207 1.187-5.93 5.707 1.394 8.19L12 18.896l-7.339 3.86 1.394-8.19-5.93-5.707 8.207-1.187z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
