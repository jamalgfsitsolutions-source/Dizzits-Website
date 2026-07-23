import React, { useEffect, useRef, useState } from "react";

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sources = Array.isArray(src) ? src : [src];
  const currentSrc = sources[currentIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeOutStarted = false;

    const handleLoadedData = () => {
      fadeOutStarted = false;
      let start: number | null = null;
      const duration = 500;
      
      const fadeIn = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setOpacity(progress);
        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        }
      };
      requestAnimationFrame(fadeIn);
    };

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 0.55 && !fadeOutStarted) {
        fadeOutStarted = true;
        let start: number | null = null;
        const duration = 550;

        const fadeOut = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setOpacity(1 - progress);
          if (progress < 1) {
            requestAnimationFrame(fadeOut);
          }
        };
        requestAnimationFrame(fadeOut);
      }
    };

    const handleEnded = () => {
      if (sources.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % sources.length);
      } else {
        video.currentTime = 0;
        video.play().catch(() => {});
        handleLoadedData();
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentSrc, sources.length]);

  return (
    <video
      ref={videoRef}
      src={currentSrc}
      className={className}
      style={{ ...style, opacity }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
