'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MediaPlayer() {
  const videoRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Remove muted attribute to allow sound
      videoElement.muted = false;

      const handleEnded = () => {
        router.push('/hi');
      };

      // Try to play with sound
      const playVideoWithSound = async () => {
        try {
          await videoElement.play();
        } catch (error) {
          console.error('Autoplay with sound failed:', error);
          // Fallback: try muted autoplay
          try {
            videoElement.muted = true;
            await videoElement.play();
          } catch (mutedError) {
            console.error('Even muted autoplay failed:', mutedError);
          }
        }
      };

      videoElement.addEventListener('ended', handleEnded);
      playVideoWithSound();

      // Cleanup
      return () => {
        videoElement.removeEventListener('ended', handleEnded);
        videoElement.pause();
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