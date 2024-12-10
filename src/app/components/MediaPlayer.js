
// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function MediaPlayer() {
//   const videoRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const videoElement = videoRef.current;

//     if (videoElement) {
//       // Comprehensive play with sound strategy
//       const playVideoWithSound = async () => {
//         try {
//           // Unmute explicitly
//           videoElement.muted = false;
          
//           // Try to play with sound
//           await videoElement.play();
          
//           // Additional volume check
//           videoElement.volume = 1.0;
//         } catch (error) {
//           console.error('Autoplay with sound failed:', error);
          
//           // Aggressive fallback strategies
//           try {
//             // Try user gesture-based play
//             const playPromise = videoElement.play();
//             if (playPromise !== undefined) {
//               playPromise.then(() => {
//                 videoElement.muted = false;
//                 videoElement.volume = 1.0;
//               }).catch(e => {
//                 console.error('Play promise failed:', e);
//               });
//             }
//           } catch (fallbackError) {
//             console.error('All play attempts failed:', fallbackError);
//           }
//         }
//       };

//       // Navigation when video ends
//       const handleEnded = () => {
//         router.push('/hi');
//       };

//       // Add global event listeners to help with autoplay
//       const handleUserInteraction = () => {
//         playVideoWithSound();
//         // Remove listener after first interaction
//         document.removeEventListener('click', handleUserInteraction);
//         document.removeEventListener('touchstart', handleUserInteraction);
//       };

//       // Multiple event listeners for different interaction types
//       document.addEventListener('click', handleUserInteraction);
//       document.addEventListener('touchstart', handleUserInteraction);

//       videoElement.addEventListener('ended', handleEnded);
      
//       // Immediate play attempt
//       playVideoWithSound();

//       // Cleanup
//       return () => {
//         document.removeEventListener('click', handleUserInteraction);
//         document.removeEventListener('touchstart', handleUserInteraction);
//         videoElement.removeEventListener('ended', handleEnded);
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

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MediaPlayer() {
  const videoRef = useRef(null);
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = async () => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Comprehensive play with sound strategy
      const playVideoWithSound = async () => {
        try {
          // Unmute explicitly
          videoElement.muted = false;
          
          // Try to play with sound
          await videoElement.play();
          
          // Additional volume check
          videoElement.volume = 1.0;
        } catch (error) {
          console.log('Autoplay with sound failed:', error);
          
          // Fallback: try muted autoplay
          try {
            videoElement.muted = true;
            await videoElement.play();
          } catch (mutedError) {
            console.error('Muted autoplay failed:', mutedError);
          }
        }
      };

      // Navigation when video ends
      const handleEnded = () => {
        router.push('/hi');
      };

      // Add global event listeners to help with autoplay
      const handleUserInteraction = () => {
        playVideoWithSound();
        // Remove listener after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };

      // Multiple event listeners for different interaction types
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);

      videoElement.addEventListener('ended', handleEnded);
      
      // Immediate play attempt
      playVideoWithSound();

      // Cleanup
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh' 
    }}>
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
      
      {!isPlaying && (
        <button 
          onClick={handlePlayVideo}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          Play Video
        </button>
      )}
    </div>
  );
}