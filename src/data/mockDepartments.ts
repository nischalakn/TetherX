export interface Department {
  id: string;
  name: string;
  head: string;
  staffCount: number;
  activeRequests: number;
  avgResponseTime: string;
  color: string;
}

export const mockDepartments: Department[] = [
  { id: "DEP-001", name: "Radiology", head: "Dr. Sarah Chen", staffCount: 24, activeRequests: 18, avgResponseTime: "2.4h", color: "hsl(210, 79%, 46%)" },
  { id: "DEP-002", name: "Pathology", head: "Dr. James Wilson", staffCount: 16, activeRequests: 12, avgResponseTime: "1.8h", color: "hsl(123, 46%, 34%)" },
  { id: "DEP-003", name: "Cardiology", head: "Dr. Emily Rodriguez", staffCount: 32, activeRequests: 25, avgResponseTime: "3.1h", color: "hsl(27, 96%, 47%)" },
  { id: "DEP-004", name: "Emergency", head: "Dr. Michael Park", staffCount: 48, activeRequests: 42, avgResponseTime: "0.8h", color: "hsl(0, 63%, 51%)" },
  { id: "DEP-005", name: "Oncology", head: "Dr. Lisa Thompson", staffCount: 20, activeRequests: 15, avgResponseTime: "4.2h", color: "hsl(262, 52%, 47%)" },
  { id: "DEP-006", name: "Neurology", head: "Dr. David Kim", staffCount: 18, activeRequests: 9, avgResponseTime: "2.9h", color: "hsl(180, 60%, 40%)" },
  { id: "DEP-007", name: "Orthopedics", head: "Dr. Anna Martinez", staffCount: 22, activeRequests: 14, avgResponseTime: "2.1h", color: "hsl(45, 80%, 45%)" },
  { id: "DEP-008", name: "Pharmacy", head: "Dr. Robert Lee", staffCount: 14, activeRequests: 31, avgResponseTime: "1.2h", color: "hsl(300, 40%, 45%)" },
];
