// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function MediaPlayer() {
//   const videoRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const videoElement = videoRef.current;

//     if (videoElement) {
//       // Remove muted attribute to allow sound
//       videoElement.muted = false;

//       const handleEnded = () => {
//         router.push('/hi');
//       };

//       // Try to play with sound
//       const playVideoWithSound = async () => {
//         try {
//           await videoElement.play();
//         } catch (error) {
//           console.error('Autoplay with sound failed:', error);
//           // Fallback: try muted autoplay
//           try {
//             videoElement.muted = true;
//             await videoElement.play();
//           } catch (mutedError) {
//             console.error('Even muted autoplay failed:', mutedError);
//           }
//         }
//       };

//       videoElement.addEventListener('ended', handleEnded);
//       playVideoWithSound();

//       // Cleanup
//       return () => {
//         videoElement.removeEventListener('ended', handleEnded);
//         videoElement.pause();
//       };
//     }
//   }, [router]);

//   return (
//     <video
//       ref={videoRef}
//       src="/video.mp4"
//       playsInline
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%', 
//         height: '100%',
//         objectFit: 'cover',
//         backgroundColor: 'black'
//       }}
//     />
//   );
// }
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MediaPlayer() {
  const videoRef = useRef(null);
  const router = useRouter();
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Function to attempt playing with sound
      const tryPlayWithSound = async () => {
        try {
          videoElement.muted = false;  // Explicitly unmute
          await videoElement.play();
        } catch (error) {
          console.error('Autoplay with sound failed:', error);
          
          // Fallback to muted if sound play fails
          try {
            videoElement.muted = true;
            await videoElement.play();
          } catch (mutedError) {
            console.error('Muted autoplay failed:', mutedError);
          }
        }
      };

      // Event handler for video end
      const handleEnded = () => {
        router.push('/hi');
      };

      // Add event listeners
      videoElement.addEventListener('ended', handleEnded);

      // Global interaction listener to help with autoplay
      const handleUserInteraction = () => {
        if (!hasInteracted) {
          setHasInteracted(true);
          tryPlayWithSound();
          // Remove the global listener after first interaction
          document.removeEventListener('click', handleUserInteraction);
        }
      };

      // If no interaction has occurred, add global listener
      if (!hasInteracted) {
        document.addEventListener('click', handleUserInteraction);
      }

      // Initial attempt to play
      tryPlayWithSound();

      // Cleanup function
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [router, hasInteracted]);

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