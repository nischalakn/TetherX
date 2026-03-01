export type RequestStatus = "pending" | "in-progress" | "approved" | "rejected" | "completed" | "escalated" | "overdue";
export type Priority = "critical" | "high" | "medium" | "low";

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export interface DocumentItem {
  id: string;
  filename: string;
  uploadedBy: string;
  uploadedAt: string;
  fileType: string;
  fileUrl: string;
}

export interface HistoryItem {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
  status?: RequestStatus;
}

export interface RequestItem {
  id: string;
  title: string;
  description: string;
  patientName: string;
  patientId: string; // Now links to user ID
  patientUserId?: string; // Added for direct user reference
  fromDepartment: string;
  toDepartment: string;
  status: RequestStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  slaDeadline: string;
  slaMinutesRemaining: number;
  workflowStep: number;
  totalSteps: number;
  comments: Comment[];
  attachments: string[]; // Legacy field
  documents: DocumentItem[]; // New structured documents
  history: HistoryItem[]; // Status change history
  category: string;
}

export const mockRequests: RequestItem[] = [
  {
    id: "REQ-2024-001", title: "CT Scan Approval", description: "Urgent CT scan required for head trauma assessment.", 
    patientName: "John Doe", patientId: "PAT-1001", patientUserId: "patient-001",
    fromDepartment: "Emergency", toDepartment: "Radiology", status: "in-progress", priority: "critical", 
    createdAt: "2024-12-15T08:30:00Z", updatedAt: "2024-12-15T09:15:00Z",
    assignedTo: "Dr. Sarah Chen", slaDeadline: "2024-12-15T12:30:00Z", slaMinutesRemaining: 45, workflowStep: 2, totalSteps: 4,
    comments: [
      { id: "C1", user: "Dr. Michael Park", text: "Patient shows signs of subdural hematoma. Urgent scan needed.", timestamp: "2024-12-15T08:35:00Z" },
      { id: "C2", user: "Dr. Sarah Chen", text: "Scheduling for priority slot. ETA 30 minutes.", timestamp: "2024-12-15T09:00:00Z" },
    ],
    attachments: ["patient_report.pdf"],
    documents: [
      { id: "DOC-001", filename: "patient_report.pdf", uploadedBy: "Dr. Michael Park", uploadedAt: "2024-12-15T08:32:00Z", fileType: "application/pdf", fileUrl: "/uploads/patient_report.pdf" },
      { id: "DOC-002", filename: "trauma_images.jpg", uploadedBy: "Nurse Emily", uploadedAt: "2024-12-15T08:45:00Z", fileType: "image/jpeg", fileUrl: "/uploads/trauma_images.jpg" }
    ],
    history: [
      { id: "H-001", action: "Request Created", performedBy: "Dr. Michael Park", timestamp: "2024-12-15T08:30:00Z", details: "Initial request submitted from Emergency", status: "pending" },
      { id: "H-002", action: "Status Changed", performedBy: "Dr. Sarah Chen", timestamp: "2024-12-15T09:00:00Z", details: "Moved to in-progress, scheduling CT scan", status: "in-progress" }
    ],
    category: "Diagnostics"
  },
  {
    id: "REQ-2024-002", title: "Blood Work Analysis", description: "Complete blood panel required for pre-operative assessment.", 
    patientName: "Jane Smith", patientId: "PAT-1002", patientUserId: "patient-002",
    fromDepartment: "Cardiology", toDepartment: "Pathology", status: "pending", priority: "high", 
    createdAt: "2024-12-15T07:00:00Z", updatedAt: "2024-12-15T07:00:00Z",
    assignedTo: "Dr. James Wilson", slaDeadline: "2024-12-15T15:00:00Z", slaMinutesRemaining: 180, workflowStep: 1, totalSteps: 3,
    comments: [{ id: "C3", user: "Dr. Emily Rodriguez", text: "Pre-op labs needed before tomorrow's procedure.", timestamp: "2024-12-15T07:05:00Z" }],
    attachments: [],
    documents: [],
    history: [
      { id: "H-003", action: "Request Created", performedBy: "Dr. Emily Rodriguez", timestamp: "2024-12-15T07:00:00Z", details: "Blood work requested for pre-operative assessment", status: "pending" }
    ],
    category: "Lab Work"
  },
  {
    id: "REQ-2024-003", title: "MRI Brain Scan", description: "Follow-up MRI for post-surgical evaluation.", 
    patientName: "Robert Johnson", patientId: "PAT-1003", patientUserId: "patient-003",
    fromDepartment: "Neurology", toDepartment: "Radiology", status: "approved", priority: "medium", 
    createdAt: "2024-12-14T14:00:00Z", updatedAt: "2024-12-15T08:00:00Z",
    assignedTo: "Dr. Sarah Chen", slaDeadline: "2024-12-16T14:00:00Z", slaMinutesRemaining: 720, workflowStep: 3, totalSteps: 4,
    comments: [], 
    attachments: ["surgical_notes.pdf", "previous_mri.dcm"],
    documents: [
      { id: "DOC-003", filename: "surgical_notes.pdf", uploadedBy: "Dr. Lisa Thompson", uploadedAt: "2024-12-14T14:15:00Z", fileType: "application/pdf", fileUrl: "/uploads/surgical_notes.pdf" },
      { id: "DOC-004", filename: "previous_mri.dcm", uploadedBy: "Radiology Tech", uploadedAt: "2024-12-14T14:20:00Z", fileType: "application/dicom", fileUrl: "/uploads/previous_mri.dcm" }
    ],
    history: [
      { id: "H-004", action: "Request Created", performedBy: "Dr. Lisa Thompson", timestamp: "2024-12-14T14:00:00Z", details: "Follow-up MRI requested", status: "pending" },
      { id: "H-005", action: "Status Changed", performedBy: "Dr. Sarah Chen", timestamp: "2024-12-15T08:00:00Z", details: "Request approved, scheduling MRI", status: "approved" }
    ],
    category: "Diagnostics"
  },
  {
    id: "REQ-2024-004", title: "Discharge Approval", description: "Patient ready for discharge, pending final approval.", 
    patientName: "Maria Garcia", patientId: "PAT-1004", patientUserId: "patient-005",
    fromDepartment: "Orthopedics", toDepartment: "Emergency", status: "completed", priority: "low", 
    createdAt: "2024-12-13T10:00:00Z", updatedAt: "2024-12-14T16:00:00Z",
    assignedTo: "Michael Park", slaDeadline: "2024-12-14T18:00:00Z", slaMinutesRemaining: 0, workflowStep: 4, totalSteps: 4,
    comments: [], attachments: ["discharge_summary.pdf"],
    documents: [
      { id: "DOC-006", filename: "discharge_summary.pdf", uploadedBy: "Dr. Anna Martinez", uploadedAt: "2024-12-14T15:30:00Z", fileType: "application/pdf", fileUrl: "/uploads/discharge_summary.pdf" }
    ],
    history: [
      { id: "H-008", action: "Request Created", performedBy: "Dr. Anna Martinez", timestamp: "2024-12-13T10:00:00Z", details: "Discharge approval requested", status: "pending" },
      { id: "H-009", action: "Status Changed", performedBy: "Michael Park", timestamp: "2024-12-14T16:00:00Z", details: "Discharge approved, patient cleared to leave", status: "completed" }
    ],
    category: "Discharge"
  },
  {
    id: "REQ-2024-005", title: "Medication Review", description: "Urgent review of drug interactions for chemotherapy protocol.", 
    patientName: "David Williams", patientId: "PAT-1005", patientUserId: "patient-004",
    fromDepartment: "Oncology", toDepartment: "Pharmacy", status: "escalated", priority: "critical", 
    createdAt: "2024-12-15T06:00:00Z", updatedAt: "2024-12-15T08:30:00Z",
    assignedTo: "Robert Lee", slaDeadline: "2024-12-15T10:00:00Z", slaMinutesRemaining: 15, workflowStep: 2, totalSteps: 3,
    comments: [
      { id: "C4", user: "Lisa Thompson", text: "Potential interaction with current medications. Needs immediate review.", timestamp: "2024-12-15T06:15:00Z" },
    ],
    attachments: ["medication_list.pdf"],
    documents: [
      { id: "DOC-005", filename: "medication_list.pdf", uploadedBy: "Lisa Thompson", uploadedAt: "2024-12-15T06:10:00Z", fileType: "application/pdf", fileUrl: "/uploads/medication_list.pdf" }
    ],
    history: [
      { id: "H-006", action: "Request Created", performedBy: "Lisa Thompson", timestamp: "2024-12-15T06:00:00Z", details: "Medication review requested due to drug interaction concerns", status: "pending" },
      { id: "H-007", action: "Status Changed", performedBy: "Robert Lee", timestamp: "2024-12-15T08:30:00Z", details: "Escalated due to critical nature and time sensitivity", status: "escalated" }
    ],
    category: "Pharmacy"
  },
  {
    id: "REQ-2024-006", title: "X-Ray Chest", description: "Routine chest X-ray for pneumonia follow-up.", 
    patientName: "Sarah Brown", patientId: "PAT-1006", patientUserId: "patient-006",
    fromDepartment: "Emergency", toDepartment: "Radiology", status: "in-progress", priority: "medium", 
    createdAt: "2024-12-15T09:00:00Z", updatedAt: "2024-12-15T09:30:00Z",
    assignedTo: "Dr. Sarah Chen", slaDeadline: "2024-12-15T17:00:00Z", slaMinutesRemaining: 360, workflowStep: 2, totalSteps: 3,
    comments: [], attachments: [],
    documents: [],
    history: [
      { id: "H-010", action: "Request Created", performedBy: "Dr. Michael Park", timestamp: "2024-12-15T09:00:00Z", details: "Chest X-ray requested for pneumonia follow-up", status: "pending" },
      { id: "H-011", action: "Status Changed", performedBy: "Dr. Sarah Chen", timestamp: "2024-12-15T09:30:00Z", details: "Patient being prepped for X-ray", status: "in-progress" }
    ],
    category: "Diagnostics"
  },
  {
    id: "REQ-2024-007", title: "Biopsy Analysis", description: "Tissue sample analysis for suspected malignancy.", 
    patientName: "Thomas Anderson", patientId: "PAT-1007", patientUserId: "patient-007",
    fromDepartment: "Oncology", toDepartment: "Pathology", status: "overdue", priority: "high", 
    createdAt: "2024-12-13T08:00:00Z", updatedAt: "2024-12-14T08:00:00Z",
    assignedTo: "Dr. James Wilson", slaDeadline: "2024-12-14T16:00:00Z", slaMinutesRemaining: -120, workflowStep: 2, totalSteps: 5,
    comments: [], attachments: ["biopsy_sample.pdf"],
    documents: [
      { id: "DOC-007", filename: "biopsy_sample.pdf", uploadedBy: "Lisa Thompson", uploadedAt: "2024-12-13T08:15:00Z", fileType: "application/pdf", fileUrl: "/uploads/biopsy_sample.pdf" }
    ],
    history: [
      { id: "H-012", action: "Request Created", performedBy: "Lisa Thompson", timestamp: "2024-12-13T08:00:00Z", details: "Biopsy analysis requested", status: "pending" },
      { id: "H-013", action: "Status Changed", performedBy: "System", timestamp: "2024-12-14T16:00:00Z", details: "Request overdue, SLA breach", status: "overdue" }
    ],
    category: "Lab Work"
  },
  {
    id: "REQ-2024-008", title: "ECG Report Review", description: "12-lead ECG interpretation needed for arrhythmia evaluation.", 
    patientName: "Patricia Lee", patientId: "PAT-1008", patientUserId: "patient-008",
    fromDepartment: "Emergency", toDepartment: "Cardiology", status: "pending", priority: "high", 
    createdAt: "2024-12-15T10:00:00Z", updatedAt: "2024-12-15T10:00:00Z",
    assignedTo: "Dr. Emily Rodriguez", slaDeadline: "2024-12-15T14:00:00Z", slaMinutesRemaining: 120, workflowStep: 1, totalSteps: 3,
    comments: [], attachments: ["ecg_strip.pdf"],
    documents: [
      { id: "DOC-008", filename: "ecg_strip.pdf", uploadedBy: "Nurse Emily", uploadedAt: "2024-12-15T10:05:00Z", fileType: "application/pdf", fileUrl: "/uploads/ecg_strip.pdf" }
    ],
    history: [
      { id: "H-014", action: "Request Created", performedBy: "Dr. Michael Park", timestamp: "2024-12-15T10:00:00Z", details: "ECG review requested for arrhythmia evaluation", status: "pending" }
    ],
    category: "Diagnostics"
  },
  {
    id: "REQ-2024-009", title: "Physical Therapy Referral", description: "Post-surgery PT evaluation and treatment plan.", 
    patientName: "Kevin White", patientId: "PAT-1009", patientUserId: "patient-001",
    fromDepartment: "Orthopedics", toDepartment: "Orthopedics", status: "approved", priority: "low", 
    createdAt: "2024-12-14T11:00:00Z", updatedAt: "2024-12-15T07:00:00Z",
    assignedTo: "Anna Martinez", slaDeadline: "2024-12-17T11:00:00Z", slaMinutesRemaining: 1440, workflowStep: 3, totalSteps: 4,
    comments: [], attachments: [],
    documents: [],
    history: [
      { id: "H-015", action: "Request Created", performedBy: "Dr. Anna Martinez", timestamp: "2024-12-14T11:00:00Z", details: "PT referral for post-surgical care", status: "pending" },
      { id: "H-016", action: "Status Changed", performedBy: "Dr. Anna Martinez", timestamp: "2024-12-15T07:00:00Z", details: "Referral approved, scheduling PT sessions", status: "approved" }
    ],
    category: "Referral"
  },
  {
    id: "REQ-2024-010", title: "Pharmacy Consult", description: "Antibiotic dosage adjustment for renal impairment.", 
    patientName: "Linda Davis", patientId: "PAT-1010", patientUserId: "patient-002",
    fromDepartment: "Neurology", toDepartment: "Pharmacy", status: "in-progress", priority: "medium", 
    createdAt: "2024-12-15T07:30:00Z", updatedAt: "2024-12-15T08:45:00Z",
    assignedTo: "Robert Lee", slaDeadline: "2024-12-15T15:30:00Z", slaMinutesRemaining: 240, workflowStep: 2, totalSteps: 3,
    comments: [], attachments: [],
    documents: [],
    history: [
      { id: "H-017", action: "Request Created", performedBy: "Dr. Lisa Thompson", timestamp: "2024-12-15T07:30:00Z", details: "Pharmacy consult for dosage adjustment", status: "pending" },
      { id: "H-018", action: "Status Changed", performedBy: "Robert Lee", timestamp: "2024-12-15T08:45:00Z", details: "Reviewing patient renal function and current medications", status: "in-progress" }
    ],
    category: "Pharmacy"
  },
];
