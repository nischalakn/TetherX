import { cn } from "@/lib/utils";
import type { RequestStatus, Priority } from "@/data/mockRequests";

const statusStyles: Record<RequestStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  "in-progress": "bg-primary/10 text-primary border-primary/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  completed: "bg-success/10 text-success border-success/20",
  escalated: "bg-destructive/10 text-destructive border-destructive/20",
  overdue: "bg-destructive/15 text-destructive border-destructive/30",
};

const priorityStyles: Record<Priority, string> = {
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  high: "bg-warning/10 text-warning border-warning/20",
  medium: "bg-primary/10 text-primary border-primary/20",
  low: "bg-muted text-muted-foreground border-border",
};

interface StatusChipProps {
  status: RequestStatus;
  className?: string;
}

interface PriorityChipProps {
  priority: Priority;
  className?: string;
}

export const StatusChip = ({ status, className }: StatusChipProps) => (
  <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", statusStyles[status], className)}>
    {status.replace("-", " ")}
  </span>
);

export const PriorityChip = ({ priority, className }: PriorityChipProps) => (
  <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", priorityStyles[priority], className)}>
    {priority}
  </span>
);
