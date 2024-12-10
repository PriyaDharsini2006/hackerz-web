import Link from 'next/link';
import MediaPlayer from './components/MediaPlayer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Media Player</h1>
      <MediaPlayer />
    </div>
  );
}