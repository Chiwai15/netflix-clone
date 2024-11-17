import React, { useState, useEffect, useRef} from 'react';
import './TrailerBanner.css'

const TrailerBanner = ({ preview_banner, trailer }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const videoRef = useRef(null); // Ref to control video playback
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // State to track video loading

  useEffect(() => {
    // Set a 4-second timeout to show the trailer and play it
    const timer = setTimeout(() => {
      setShowTrailer(true); // Show the trailer
  
      // Ensure the video starts playing automatically when it is shown
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error('Video playback failed:', error);
        });
      }
    }, 2000);
  
    // Cleanup timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Stop and reset the video when showTrailer becomes false
    if (!showTrailer && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to the beginning
    }
  }, [showTrailer]);

  const handleVideoClick = () => {
    setShowTrailer(false); // Switch back to the banner image
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true); // Set video loaded state when the video is ready
  };


  return (
    <div className="banner">
      <img 
        src={preview_banner} 
        alt="Banner" 
        className={`banner-img ${showTrailer ? 'hidden' : ''}`} // Hide image when video is playing
        onClick={() => setShowTrailer(true)} 
      />
      <video
        ref={videoRef}
        className={`banner-video ${showTrailer ? 'visible' : ''}`} // Show video smoothly when needed
        src={trailer}
        autoPlay
        muted
        playsInline
        onCanPlay={(e) => e.target.play()}
        onClick={handleVideoClick}
        onEnded={() => setShowTrailer(false)}
      />
    </div>
  );
};

export default TrailerBanner
