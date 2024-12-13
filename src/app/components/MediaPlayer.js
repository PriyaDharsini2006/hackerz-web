
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MediaPlayer() {
  const videoRef = useRef(null);
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = async () => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      try {
        // Unmute explicitly
        videoElement.muted = false;
        
        // Try to play with sound
        await videoElement.play();
        
        // Set volume and update playing state
        videoElement.volume = 1.0;
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay with sound failed:', error);
        
        // Fallback: try muted autoplay
        try {
          videoElement.muted = true;
          await videoElement.play();
          setIsPlaying(true);
        } catch (mutedError) {
          console.error('Muted autoplay failed:', mutedError);
        }
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Navigation when video ends
      const handleEnded = () => {
        // Redirect to the specified URL
        window.location.href = 'https://www.hackerzcit.in/';
      };

      // Listen for play event to update state
      const handlePlay = () => {
        setIsPlaying(true);
      };

      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('ended', handleEnded);

      // Cleanup
      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    // <div style={{ 
    //   position: 'relative', 
    //   width: '100%', 
    //   height: '100vh' 
    // }}>
    <div
    style={{
      position: 'absolute',
      width: '100%',
      height: '100vh',
      backgroundImage: !isPlaying ? 'url(/1010066.jpg)' : 'none', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'black'
    }}> 
    <img
        src="/image.png" 
        alt="Logo"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '100px', 
          height: 'auto',
          zIndex: 15,
        }}
      />

      <video
        ref={videoRef}
        src="/video.mp4"
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%',
          objectFit: 'cover',
          // backgroundColor: 'black',
          display: isPlaying ? 'block' : 'none'
        }}
      />
    
      
      {!isPlaying && (
        <button 
          onClick={handlePlayVideo}
          style={{
            position:'absolute',
            top:'50%',
            left:"50%",
            transform:"translate(-50%,-50%)",
            padding: '15px 40px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
            border: '2px solid #00d4ff',
            borderRadius: '30px', 
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0, 212, 255, 0.6)',
            transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
            zIndex:10
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.9)'; 
            e.target.style.boxShadow = '0 0 25px rgba(0, 212, 255, 1)'; 
            e.target.style.transform = 'scale(1.1)'; 
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.6)';
            e.target.style.transform = 'scale(1)'; 
          }}
        >
          Launch
        </button>
      )}
    </div>
  );
}