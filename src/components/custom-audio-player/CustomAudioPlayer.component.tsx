import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

const CustomAudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    if (audio) {
      audio.currentTime = value;
      setProgress(value);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center gap-3 bg-background px-3 py-3 rounded-full w-fit shadow-sm">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <button onClick={togglePlay} className="focus:outline-none">
        {isPlaying ? (
          <StopIcon className="w-5 h-5 text-primary" />
        ) : (
          <PlayIcon className="w-5 h-5 text-primary" />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={progress}
        onChange={handleSeek}
        className="w-32 h-1 accent-primary cursor-pointer"
      />
      <span className="text-xs text-gray-600">{formatTime(progress)}</span>
    </div>
  );
};

export default CustomAudioPlayer;
