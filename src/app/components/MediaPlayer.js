'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MediaPlayer() {
  const router = useRouter();

  useEffect(() => {
    // Create video element client-side
    const videoElement = document.createElement('video');
    
    // IMPORTANT: Rename your video file to remove special characters and spaces
    videoElement.src = '/video.mp4';
    
    videoElement.style.position = 'fixed';
    videoElement.style.top = '0';
    videoElement.style.left = '0';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'cover';
    videoElement.style.backgroundColor = 'black';
    videoElement.muted = true;
    videoElement.playsInline = true;

    // Add event listeners
    const handleEnded = () => {
      router.push('/hi');
    };
    videoElement.addEventListener('ended', handleEnded);

    // Improved error handling
    videoElement.addEventListener('error', (e) => {
      console.error('Video error:', e);
      alert('Could not load video. Please check the file.');
    });

    // Try to play
    const playVideo = async () => {
      try {
        await videoElement.play();
      } catch (error) {
        console.error('Error playing video:', error);
        alert('Could not play video. Please check the file.');
      }
    };

    // Append to document body
    document.body.appendChild(videoElement);
    playVideo();

    // Cleanup
    return () => {
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.pause();
      document.body.removeChild(videoElement);
    };
  }, [router]);

  return null;
}