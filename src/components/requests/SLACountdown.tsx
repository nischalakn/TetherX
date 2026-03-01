import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface SLACountdownProps {
  minutesRemaining: number;
}

const SLACountdown = ({ minutesRemaining }: SLACountdownProps) => {
  const isOverdue = minutesRemaining < 0;
  const isCritical = minutesRemaining > 0 && minutesRemaining <= 30;
  const isWarning = minutesRemaining > 30 && minutesRemaining <= 120;

  const formatTime = (mins: number) => {
    const abs = Math.abs(mins);
    if (abs >= 1440) return `${Math.floor(abs / 1440)}d ${Math.floor((abs % 1440) / 60)}h`;
    if (abs >= 60) return `${Math.floor(abs / 60)}h ${abs % 60}m`;
    return `${abs}m`;
  };

  return (
    <div className={cn(
      "flex items-center gap-1.5 text-xs font-medium",
      isOverdue && "text-destructive",
      isCritical && "text-destructive animate-pulse-soft",
      isWarning && "text-warning",
      !isOverdue && !isCritical && !isWarning && "text-success"
    )}>
      <Timer className="h-3.5 w-3.5" />
      <span>{isOverdue ? `-${formatTime(minutesRemaining)}` : formatTime(minutesRemaining)}</span>
    </div>
  );
};

export default SLACountdown;
