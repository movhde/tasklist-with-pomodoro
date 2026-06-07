"use client";

import { useState, useRef, useEffect } from "react";
import { TRACKS, TrackId } from "@/hooks/useSound";
import Image from "next/image";

interface MusicButtonProps {
  selectedTrack: TrackId;
  volume: number;
  onSelectTrack: (id: TrackId) => void;
  onVolumeChange: (v: number) => void;
}

export function MusicButton({
  selectedTrack,
  volume,
  onSelectTrack,
  onVolumeChange,
}: MusicButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-[20px] border-[1.5px] border-[#59B7FF] bg-[#EEF5FF]/85 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:bg-[#EEF5FF] dark:bg-[#414462]/85 dark:border-[#FD81B0]/40 dark:hover:bg-[#414462]"
      >
        {selectedTrack === "none" ? (
          <Image
            src="/icons/sound-off.svg"
            alt="muted"
            width={18}
            height={18}
            className="text-[#FD81B0] dark:brightness-90"
          />
        ) : (
          <Image
            src="/icons/sound-on.svg"
            alt="music"
            width={18}
            height={18}
            className="text-[#59B7FF] dark:brightness-90"
          />
        )}
        <span className="font-sniglet text-sm font-medium text-[#303153] dark:text-[#F4F4F4] hidden sm:block">
          {TRACKS.find((t) => t.id === selectedTrack)?.label ?? "Music"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mb-2 right-0 w-[220px] bg-white/75 backdrop-blur-xl border-[1.5px] border-[#59B7FF]/25 rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(89,183,255,0.12)] dark:bg-[#32334B]/90 dark:border-[#FD81B0]/20 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-50">
          {/* Sounds list */}
          <div className="p-2.5">
            {TRACKS.map((track, i) => (
              <div key={track.id}>
                <button
                  onClick={() => {
                    onSelectTrack(track.id);
                    if (track.id !== "none") setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[14px] border-none text-left transition-all duration-150 ${
                    selectedTrack === track.id
                      ? "bg-[#EEF5FF]/80 dark:bg-[#414462]"
                      : "bg-transparent hover:bg-[#EEF5FF]/60 dark:hover:bg-[#3D3E58]"
                  }`}
                >
                  <Image
                    src={track.icon}
                    alt="music icon"
                    width={18}
                    height={18}
                    className="dark:brightness-90"
                  />
                  <span className="font-sniglet text-sm font-medium text-[#303153] dark:text-[#F4F4F4]">
                    {track.label}
                  </span>
                  {selectedTrack === track.id && (
                    <span className="ml-auto text-[#59B7FF] dark:text-[#FD81B0] text-sm">
                      ✓
                    </span>
                  )}
                </button>
                {i < TRACKS.length - 1 && (
                  <div className="h-px bg-[#59B7FF]/15 dark:bg-[#FD81B0]/10 mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* Volume slider */}
          <div className="px-2 py-3 border-t border-[#59B7FF]/15 dark:border-[#FD81B0]/10">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/sound-on.svg"
                alt="sound-on icon"
                width={20}
                height={20}
                className="dark:brightness-90"
              />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="flex-1 h-1.5 rounded-full accent-[#59B7FF] dark:accent-[#FD81B0] cursor-pointer"
              />
              <span className="font-sniglet text-xs text-[#6D7085] dark:text-[#B0B0C0] min-w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
