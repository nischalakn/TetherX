export interface WorkflowStep {
  id: string;
  name: string;
  department: string;
  assignee: string;
  estimatedTime: string;
  order: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: string;
}

export const mockWorkflows: Workflow[] = [
  {
    id: "WF-001", name: "Lab Test Processing", description: "Standard workflow for processing lab test requests from any department.", category: "Lab Work", isActive: true, createdAt: "2024-01-15",
    steps: [
      { id: "S1", name: "Request Submission", department: "Requesting Dept", assignee: "Auto", estimatedTime: "5 min", order: 1 },
      { id: "S2", name: "Supervisor Approval", department: "Requesting Dept", assignee: "Supervisor", estimatedTime: "30 min", order: 2 },
      { id: "S3", name: "Lab Processing", department: "Pathology", assignee: "Lab Technician", estimatedTime: "2 hours", order: 3 },
      { id: "S4", name: "Results Review", department: "Pathology", assignee: "Pathologist", estimatedTime: "1 hour", order: 4 },
      { id: "S5", name: "Report Delivery", department: "Requesting Dept", assignee: "Auto", estimatedTime: "10 min", order: 5 },
    ]
  },
  {
    id: "WF-002", name: "Imaging Request", description: "Workflow for CT, MRI, X-ray, and ultrasound requests.", category: "Diagnostics", isActive: true, createdAt: "2024-02-01",
    steps: [
      { id: "S1", name: "Request Creation", department: "Requesting Dept", assignee: "Doctor", estimatedTime: "5 min", order: 1 },
      { id: "S2", name: "Priority Assessment", department: "Radiology", assignee: "Radiologist", estimatedTime: "15 min", order: 2 },
      { id: "S3", name: "Scheduling", department: "Radiology", assignee: "Scheduler", estimatedTime: "10 min", order: 3 },
      { id: "S4", name: "Image Acquisition", department: "Radiology", assignee: "Technician", estimatedTime: "45 min", order: 4 },
      { id: "S5", name: "Report Generation", department: "Radiology", assignee: "Radiologist", estimatedTime: "1 hour", order: 5 },
    ]
  },
  {
    id: "WF-003", name: "Discharge Process", description: "Patient discharge workflow with multi-department clearance.", category: "Discharge", isActive: true, createdAt: "2024-03-10",
    steps: [
      { id: "S1", name: "Discharge Request", department: "Treating Dept", assignee: "Doctor", estimatedTime: "10 min", order: 1 },
      { id: "S2", name: "Pharmacy Clearance", department: "Pharmacy", assignee: "Pharmacist", estimatedTime: "30 min", order: 2 },
      { id: "S3", name: "Billing Review", department: "Admin", assignee: "Billing Staff", estimatedTime: "1 hour", order: 3 },
      { id: "S4", name: "Final Approval", department: "Admin", assignee: "Supervisor", estimatedTime: "15 min", order: 4 },
    ]
  },
  {
    id: "WF-004", name: "Medication Review", description: "Drug interaction and dosage verification workflow.", category: "Pharmacy", isActive: true, createdAt: "2024-04-05",
    steps: [
      { id: "S1", name: "Review Request", department: "Requesting Dept", assignee: "Doctor", estimatedTime: "5 min", order: 1 },
      { id: "S2", name: "Pharmacist Review", department: "Pharmacy", assignee: "Pharmacist", estimatedTime: "45 min", order: 2 },
      { id: "S3", name: "Approval", department: "Pharmacy", assignee: "Senior Pharmacist", estimatedTime: "15 min", order: 3 },
    ]
  },
];
