'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MediaPlayer() {
  const videoRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Attempt to play with sound
      const playVideo = async () => {
        try {
          // Explicitly set to play with sound
          videoElement.muted = false;
          await videoElement.play();
        } catch (error) {
          console.error('Autoplay with sound failed:', error);
          
          // Fallback strategies
          try {
            // Try muted autoplay as last resort
            videoElement.muted = true;
            await videoElement.play();
          } catch (mutedError) {
            console.error('Even muted autoplay failed:', mutedError);
          }
        }
      };

      // Navigate when video ends
      const handleEnded = () => {
        router.push('/hi');
      };

      videoElement.addEventListener('ended', handleEnded);
      
      // Attempt immediate autoplay
      playVideo();

      // Cleanup
      return () => {
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [router]);

  return (
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
        backgroundColor: 'black'
      }}
    />
  );
}