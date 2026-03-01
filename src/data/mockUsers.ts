export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "supervisor" | "staff" | "doctor" | "department_staff" | "patient";
  department: string;
  avatar: string;
  status: "active" | "inactive";
  // Optional fields for patient profiles
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
}

export const mockUsers: User[] = [
  // Admin
  { id: "USR-001", name: "Dr. Sarah Chen", email: "sarah.chen@mediflow.com", role: "admin", department: "Administration", avatar: "SC", status: "active" },
  
  // Department Staff
  { id: "USR-002", name: "Dr. James Wilson", email: "james.wilson@mediflow.com", role: "department_staff", department: "Radiology", avatar: "JW", status: "active" },
  { id: "USR-003", name: "Dr. Emily Rodriguez", email: "emily.rodriguez@mediflow.com", role: "department_staff", department: "Cardiology", avatar: "ER", status: "active" },
  { id: "USR-004", name: "Michael Park", email: "michael.park@mediflow.com", role: "department_staff", department: "Emergency", avatar: "MP", status: "active" },
  { id: "USR-005", name: "Lisa Thompson", email: "lisa.thompson@mediflow.com", role: "department_staff", department: "Pathology", avatar: "LT", status: "active" },
  { id: "USR-006", name: "David Kim", email: "david.kim@mediflow.com", role: "department_staff", department: "Neurology", avatar: "DK", status: "active" },
  
  // Legacy roles (kept for compatibility)
  { id: "USR-007", name: "Anna Martinez", email: "anna.martinez@mediflow.com", role: "supervisor", department: "Orthopedics", avatar: "AM", status: "active" },
  { id: "USR-008", name: "Robert Lee", email: "robert.lee@mediflow.com", role: "staff", department: "Pharmacy", avatar: "RL", status: "active" },
  
  // Patients
  { id: "PAT-001", name: "John Anderson", email: "john.anderson@email.com", role: "patient", department: "N/A", avatar: "JA", status: "active", dateOfBirth: "1985-03-15", phoneNumber: "+1-555-0101", address: "123 Oak Street, Boston, MA 02108" },
  { id: "PAT-002", name: "Maria Garcia", email: "maria.garcia@email.com", role: "patient", department: "N/A", avatar: "MG", status: "active", dateOfBirth: "1978-07-22", phoneNumber: "+1-555-0102", address: "456 Maple Ave, Boston, MA 02109" },
  { id: "PAT-003", name: "William Johnson", email: "william.johnson@email.com", role: "patient", department: "N/A", avatar: "WJ", status: "active", dateOfBirth: "1992-11-08", phoneNumber: "+1-555-0103", address: "789 Pine Road, Cambridge, MA 02139" },
  { id: "PAT-004", name: "Jennifer Lee", email: "jennifer.lee@email.com", role: "patient", department: "N/A", avatar: "JL", status: "active", dateOfBirth: "1988-05-30", phoneNumber: "+1-555-0104", address: "321 Elm Street, Somerville, MA 02144" },
  { id: "PAT-005", name: "Robert Chen", email: "robert.chen@email.com", role: "patient", department: "N/A", avatar: "RC", status: "active", dateOfBirth: "1995-09-14", phoneNumber: "+1-555-0105", address: "654 Birch Lane, Brookline, MA 02445" },
  { id: "PAT-006", name: "Patricia Brown", email: "patricia.brown@email.com", role: "patient", department: "N/A", avatar: "PB", status: "active", dateOfBirth: "1970-12-03", phoneNumber: "+1-555-0106", address: "987 Cedar Court, Newton, MA 02458" },
  { id: "PAT-007", name: "Michael Davis", email: "michael.davis@email.com", role: "patient", department: "N/A", avatar: "MD", status: "active", dateOfBirth: "1983-06-18", phoneNumber: "+1-555-0107", address: "147 Spruce Drive, Quincy, MA 02169" },
  { id: "PAT-008", name: "Linda Martinez", email: "linda.martinez@email.com", role: "patient", department: "N/A", avatar: "LM", status: "active", dateOfBirth: "1991-02-25", phoneNumber: "+1-555-0108", address: "258 Willow Way, Waltham, MA 02451" },
];

export const currentUser: User = mockUsers[0];
