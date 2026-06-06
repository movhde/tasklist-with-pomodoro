interface CircularProgressProps {
  timeLeft: number;
  totalTime: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

export function CircularProgress({
  timeLeft,
  totalTime,
  size = 280,
  strokeWidth = 8,
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  const angle = 2 * Math.PI * progress;
  const dotRadius = 12;
  const dotCx = size / 2 + radius * Math.cos(angle);
  const dotCy = size / 2 + radius * Math.sin(angle);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 absolute top-0 -left-14"
      >
        <defs>
          <linearGradient
            id="progressGradient"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FFF4F8" />
            <stop offset="100%" stopColor="#FC428E" />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#progressGradient)`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
        <circle
          cy={dotCy}
          cx={dotCx}
          r={dotRadius}
          fill={`#FD6FA8`}
          // stroke="white"
          strokeWidth="2"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
