// 'use client';

// import React, { useRef, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function MediaPlayer() {
//   const videoRef = useRef(null);
//   const router = useRouter();
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayVideo = async () => {
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
//           console.log('Autoplay with sound failed:', error);
          
//           // Fallback: try muted autoplay
//           try {
//             videoElement.muted = true;
//             await videoElement.play();
//           } catch (mutedError) {
//             console.error('Muted autoplay failed:', mutedError);
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
//   };

//   return (
//     <div style={{ 
//       position: 'relative', 
//       width: '100%', 
//       height: '100vh' 
//     }}>
//       <video
//         ref={videoRef}
//         src="/video.mp4"
//         playsInline
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%', 
//           height: '100%',
//           objectFit: 'cover',
//           backgroundColor: 'black'
//         }}
//       />
      
//       {!isPlaying && (
//         <button 
//           onClick={handlePlayVideo}
//           style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '10px 20px',
//             fontSize: '16px',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             zIndex: 10
//           }}
//         >
//           Play Video
//         </button>
//       )}
//     </div>
//   );
// }
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