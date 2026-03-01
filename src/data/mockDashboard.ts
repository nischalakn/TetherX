export interface KPIData {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
  type: "create" | "approve" | "complete" | "escalate" | "comment";
}

export const mockKPIs: KPIData[] = [
  { title: "Total Requests", value: 1284, change: 12.5, changeLabel: "vs last month", icon: "FileText" },
  { title: "Pending Approvals", value: 47, change: -8.2, changeLabel: "vs last week", icon: "Clock" },
  { title: "Avg Response Time", value: "2.4h", change: -15.3, changeLabel: "improvement", icon: "Timer" },
  { title: "SLA Compliance", value: "94.2%", change: 3.1, changeLabel: "vs last month", icon: "CheckCircle" },
];

export const mockChartData = {
  requestsByDepartment: [
    { name: "Radiology", value: 245 },
    { name: "Pathology", value: 189 },
    { name: "Cardiology", value: 167 },
    { name: "Emergency", value: 312 },
    { name: "Oncology", value: 134 },
    { name: "Neurology", value: 98 },
    { name: "Orthopedics", value: 76 },
    { name: "Pharmacy", value: 163 },
  ],
  requestsTrend: [
    { month: "Jul", requests: 890, completed: 845, sla: 92 },
    { month: "Aug", requests: 920, completed: 878, sla: 91 },
    { month: "Sep", requests: 1050, completed: 998, sla: 93 },
    { month: "Oct", requests: 1100, completed: 1056, sla: 94 },
    { month: "Nov", requests: 1180, completed: 1121, sla: 95 },
    { month: "Dec", requests: 1284, completed: 1210, sla: 94 },
  ],
  statusDistribution: [
    { name: "Completed", value: 542, fill: "hsl(123, 46%, 34%)" },
    { name: "In Progress", value: 287, fill: "hsl(210, 79%, 46%)" },
    { name: "Pending", value: 198, fill: "hsl(27, 96%, 47%)" },
    { name: "Escalated", value: 45, fill: "hsl(0, 63%, 51%)" },
    { name: "Overdue", value: 32, fill: "hsl(0, 63%, 41%)" },
  ],
  departmentPerformance: [
    { department: "Radiology", score: 92, avgTime: 2.4, completed: 230, pending: 15 },
    { department: "Pathology", score: 88, avgTime: 1.8, completed: 170, pending: 19 },
    { department: "Cardiology", score: 91, avgTime: 3.1, completed: 155, pending: 12 },
    { department: "Emergency", score: 96, avgTime: 0.8, completed: 300, pending: 12 },
    { department: "Oncology", score: 85, avgTime: 4.2, completed: 120, pending: 14 },
    { department: "Neurology", score: 89, avgTime: 2.9, completed: 90, pending: 8 },
  ],
};

export const mockActivities: ActivityItem[] = [
  { id: "A1", action: "created", user: "Dr. Michael Park", target: "REQ-2024-001 CT Scan Approval", timestamp: "2 min ago", type: "create" },
  { id: "A2", action: "approved", user: "Dr. Sarah Chen", target: "REQ-2024-003 MRI Brain Scan", timestamp: "15 min ago", type: "approve" },
  { id: "A3", action: "completed", user: "Dr. James Wilson", target: "REQ-2024-004 Discharge Approval", timestamp: "1 hour ago", type: "complete" },
  { id: "A4", action: "escalated", user: "System", target: "REQ-2024-005 Medication Review", timestamp: "2 hours ago", type: "escalate" },
  { id: "A5", action: "commented on", user: "Lisa Thompson", target: "REQ-2024-005 Medication Review", timestamp: "2 hours ago", type: "comment" },
  { id: "A6", action: "created", user: "Dr. Emily Rodriguez", target: "REQ-2024-008 ECG Report Review", timestamp: "3 hours ago", type: "create" },
  { id: "A7", action: "approved", user: "Anna Martinez", target: "REQ-2024-009 Physical Therapy", timestamp: "4 hours ago", type: "approve" },
  { id: "A8", action: "created", user: "Dr. David Kim", target: "REQ-2024-010 Pharmacy Consult", timestamp: "5 hours ago", type: "create" },
];
