import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const typingSpeed = 100; // Adjust typing speed (ms)

    useEffect(() => {
        let index = 0;

        // Clear any existing intervals before starting a new one
        const typingInterval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(typingInterval);
    }, [text]); // Ensure effect runs when 'text' changes

    return (
        <p className="text-grey-300 sm:mt-4 text-xs sm:text-xl">
            {displayedText}
        </p>
    );
};

export default TypingEffect;
