import React, { useState, useEffect } from 'react';
import './TrailerBanner.css'

const TrailerBanner = ({ preview_banner, trailer }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    // Set a 4-second timeout to show the trailer
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 2000);

    // Cleanup timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = () => {
    setShowTrailer(false); // Switch back to the banner image
  };

  return (
    <div className="banner">
      {showTrailer ? (
        <video 
            className="banner-video" 
            src={trailer} 
            autoPlay  
            playsInline
            onCanPlay={(e) => e.target.play()}
            onClick={handleVideoClick} // Switch to banner on click
            onEnded={() => setShowTrailer(false)} // Detect when the video stops
        />
      ) : (
        <img 
            src={preview_banner} 
            alt="Banner" 
            className="banner-img" 
            onClick={() => setShowTrailer(true)} // Switch to video on click
        />      
      )}
    </div>
  );
};

export default TrailerBanner
