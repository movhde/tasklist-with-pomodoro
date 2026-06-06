"use client";

import { useEffect, useRef, useState } from "react";

export type TrackId =
  | "lofi"
  | "rain"
  | "forest"
  | "coffee-shop"
  | "piano"
  | "none";

export interface Track {
  id: TrackId;
  label: string;
  icon: string;
  src: string;
}

export const TRACKS: Track[] = [
  {
    id: "lofi",
    label: "Lofi",
    icon: "/icons/music-icon.svg",
    src: "/sounds/lofi1.mp3",
  },
  {
    id: "rain",
    label: "Rain",
    icon: "/icons/music-icon.svg",
    src: "/sounds/rain.mp3",
  },
  {
    id: "coffee-shop",
    label: "Coffee Shop",
    icon: "/icons/music-icon.svg",
    src: "/sounds/jazz.mp3",
  },
  {
    id: "piano",
    label: "Deep Focus",
    icon: "/icons/music-icon.svg",
    src: "/sounds/lofi2.mp3",
  },
  { id: "none", label: "No music", icon: "/icons/sound-off.svg", src: "" },
];

interface UseSoundOptions {
  sessionType: "work" | "break";
  isRunning: boolean;
}

export function useSound({ sessionType, isRunning }: UseSoundOptions) {
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("none");
  const [volume, setVolume] = useState(0.5);

  const musicRef = useRef<HTMLAudioElement | null>(null);
  const tickRef = useRef<HTMLAudioElement | null>(null);
  const bellRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    tickRef.current = new Audio("/sounds/tick-tock.mp3");
    tickRef.current.loop = true;
    tickRef.current.volume = volume;

    bellRef.current = new Audio("/sounds/bell.mp3");
    bellRef.current.volume = volume;

    return () => {
      musicRef.current?.pause();
      tickRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (musicRef.current) musicRef.current.volume = volume;
    if (tickRef.current) tickRef.current.volume = volume;
    if (bellRef.current) bellRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!isRunning) {
      musicRef.current?.pause();
      tickRef.current?.pause();
      return;
    }

    if (sessionType === "work") {
      tickRef.current?.pause();
      if (selectedTrack !== "none" && musicRef.current) {
        musicRef.current.play().catch(() => {});
      }
    } else {
      musicRef.current?.pause();
      tickRef.current?.play().catch(() => {});
    }
  }, [isRunning, sessionType, selectedTrack]);

  function handleSelectTrack(id: TrackId) {
    setSelectedTrack(id);

    musicRef.current?.pause();
    musicRef.current = null;

    if (id === "none") return;

    const track = TRACKS.find((t) => t.id === id);
    if (!track) return;

    const audio = new Audio(track.src);
    audio.loop = true;
    audio.volume = volume;
    musicRef.current = audio;

    if (isRunning && sessionType === "work") {
      audio.play().catch(() => {});
    }
  }

  function playBell() {
    if (bellRef.current) {
      bellRef.current.currentTime = 0;
      bellRef.current.play().catch(() => {});
    }
  }

  function stopAll() {
    musicRef.current?.pause();
    tickRef.current?.pause();
  }

  return {
    selectedTrack,
    volume,
    setVolume,
    handleSelectTrack,
    playBell,
    stopAll,
  };
}
