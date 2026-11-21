import React from "react";

export type StatusType =
  | "live"
  | "prototype"
  | "learning"
  | "LIVE"
  | "OPEN SOURCE"
  | "CLIENT PROJECT";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; dot: string; glow: string }
> = {
  live: {
    label: "live",
    bg: "rgba(52, 211, 153, 0.12)",
    text: "#34d399",
    dot: "#34d399",
    glow: "0 0 10px rgba(52, 211, 153, 0.35)",
  },
  LIVE: {
    label: "LIVE",
    bg: "rgba(52, 211, 153, 0.12)",
    text: "#34d399",
    dot: "#34d399",
    glow: "0 0 10px rgba(52, 211, 153, 0.35)",
  },
  prototype: {
    label: "prototype",
    bg: "rgba(251, 191, 36, 0.12)",
    text: "#fbbf24",
    dot: "#fbbf24",
    glow: "0 0 10px rgba(251, 191, 36, 0.35)",
  },
  "CLIENT PROJECT": {
    label: "CLIENT PROJECT",
    bg: "rgba(251, 191, 36, 0.12)",
    text: "#fbbf24",
    dot: "#fbbf24",
    glow: "0 0 10px rgba(251, 191, 36, 0.35)",
  },
  learning: {
    label: "learning",
    bg: "rgba(194, 164, 255, 0.15)",
    text: "#c2a4ff",
    dot: "#c2a4ff",
    glow: "0 0 10px rgba(194, 164, 255, 0.35)",
  },
  "OPEN SOURCE": {
    label: "OPEN SOURCE",
    bg: "rgba(96, 165, 250, 0.12)",
    text: "#60a5fa",
    dot: "#60a5fa",
    glow: "0 0 10px rgba(96, 165, 250, 0.35)",
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const config = statusConfig[status] || statusConfig["prototype"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-white/10 ${className}`}
      style={{
        backgroundColor: config.bg,
        color: config.text,
        boxShadow: config.glow,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: config.dot }}
      />
      {config.label}
    </span>
  );
};

export default StatusBadge;
