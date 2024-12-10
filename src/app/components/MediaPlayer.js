'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function MediaPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [videoSource, setVideoSource] = useState('');

  useEffect(() => {
    // Determine video source based on device type
    const isMobileDevice = window.innerWidth <= 768; // Typical mobile/tablet breakpoint
    const source = isMobileDevice ? '/video1.mp4' : '/video.mp4';
    setVideoSource(source);
  }, []);

  useEffect(() => {
    
    const videoElement = videoRef.current;
    
    if (videoElement) {

      const handleEnded = () => {
        window.location.href = 'https://www.hackerzcit.in/';
      };

      const handleTimeUpdate = () => {
        if (videoElement.currentTime >= videoElement.duration - 0.5) {
          videoElement.pause();
          window.location.href = 'https://www.hackerzcit.in/';
        }
      };

      videoElement.addEventListener('ended', handleEnded);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoElement.removeEventListener('ended', handleEnded);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    } else {
      console.log('No video element found');
    }
  }, [videoSource]); // Add videoSource as a dependency

  const handlePlayVideo = async () => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      try {
        videoElement.muted = false;
        await videoElement.play();
        videoElement.volume = 1.0;
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay with sound failed:', error);
        
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

  return (
    <div
    style={{
      position: 'absolute',
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      overflow: 'hidden'
    }}
  > 
    {videoSource && (
      <video
        ref={videoRef}
        src={videoSource}
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%',
          objectFit: 'cover',
          display: isPlaying ? 'block' : 'none'
        }}
      />
    )}
  
      {!isPlaying && (
        <div 
          style={{ 
            position: 'relative', 
            perspective: '1000px',
            width: 'fit-content',
            height: 'fit-content'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            style={{
              position: 'relative',
              perspective: '500px',
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%'
            }}
          >
            <button 
              onClick={handlePlayVideo}
              style={{
                position: 'relative',
                padding: '15px 40px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                background: 'rgba(0,0,0,0.8)',
                border: '2px solid #00ffff',
                borderRadius: '5px', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 10,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                outline: 'none',
                overflow: 'hidden',
                boxShadow: isHovered 
                  ? '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff'
                  : 'none',
                transform: isHovered 
                  ? 'perspective(500px) rotateX(10deg) rotateY(15deg) scale(1.05)' 
                  : 'perspective(500px) rotateX(0) rotateY(0) scale(1)',
              }}
            >
              {/* Multiple Glitch Layers */}
              {[...Array(3)].map((_, index) => (
                <span 
                  key={index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `rgba(${index * 50}, 212, 255, 0.${3 - index})`,
                    transform: isHovered 
                      ? `translate(${(index - 1) * 3}px, ${(index - 1) * 3}px) skew(${(index - 1) * 2}deg)`
                      : 'translate(0, 0) skew(0deg)',
                    transition: 'transform 0.1s',
                    zIndex: -index - 1
                  }}
                />
              ))}
              
              {/* Digital Noise Effect */}
              {isHovered && (
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
                    mixBlendMode: 'overlay',
                    opacity: 0.3,
                    pointerEvents: 'none'
                  }}
                />
              )}

              {/* Cyber Scan Lines */}
              {isHovered && (
                <>
                  <span 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(to right, transparent, #00ffff, transparent)',
                      animation: 'scanLine 2s linear infinite',
                      zIndex: 2
                    }}
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: '-100%',
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(to left, transparent, #ff00ff, transparent)',
                      animation: 'scanLineReverse 2s linear infinite',
                      zIndex: 2
                    }}
                  />
                </>
              )}
              
              Launch
            </button>
          </div>
          
          {/* Global styles for animations */}
          <style jsx global>{`
            @keyframes scanLine {
              0% { left: -100%; }
              100% { left: 100%; }
            }
            @keyframes scanLineReverse {
              0% { right: -100%; }
              100% { right: 100%; }
            }
            @keyframes glitchAnimation {
              0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
              5% { clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 90%); }
              10% { clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%); }
              15% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}