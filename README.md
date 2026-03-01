# SevaSetu — Intelligent Inter-Department Workflow Orchestrator

> Bridging the gap between hospital departments, one request at a time.

---

## Executive Summary

SevaSetu is a centralized hospital workflow automation platform designed to streamline inter-department communication, automate request routing, monitor SLA compliance, and provide real-time operational visibility to every stakeholder — from administrators to patients.

Hospitals today lose countless hours to manual forwarding, phone tag between departments, paper-based request slips, and a complete lack of centralized tracking. SevaSetu replaces this chaos with an intelligent workflow system that routes requests automatically, tracks them in real time, flags SLA violations before they happen, and keeps everyone accountable through a full audit trail.

The result: faster care, less paperwork, and a hospital that actually runs the way it should.

---

## The Problem

Walk into any large hospital and you'll find the same set of frustrations repeating across every floor:

- A patient in Emergency needs an urgent MRI — someone has to physically call the Radiology desk and hope they pick up
- A surgeon waiting on a pathology report has no way to know if the sample has even been received
- Department managers have no visibility into their team's workload until things have already gone wrong
- SLA violations go unnoticed until a patient complains or a senior doctor gets involved
- When something does go wrong, there's no record of who dropped the ball

These aren't small inconveniences. They directly affect patient outcomes, staff morale, and hospital reputation.

---

## Our Solution

SevaSetu is a smart inter-department workflow engine that:

- **Automatically routes requests** to the right department based on the nature of the request
- **Tracks every request in real time** from submission to resolution
- **Monitors SLA compliance** and flags at-risk requests before they breach deadlines
- **Provides role-based dashboards** so each user sees exactly what they need to see
- **Maintains a complete, tamper-proof audit trail** for every status change and action
- **Lets patients track their own requests** using a simple token — no login needed

It transforms fragmented hospital operations into a unified, transparent workflow ecosystem.

---

## Who Is This For?

### Patients
People visiting the hospital who need to raise a query, request a document, or follow up on a referral. They don't need to know which department handles what — SevaSetu figures that out automatically. They get a tracking token and can check status from anywhere, including the public homepage, without creating an account.

### Department Staff
Nurses, technicians, and department coordinators who need to manage incoming requests and raise requests to other departments. They see only what's relevant to their department — nothing from other departments clutters their view. They can track outgoing requests and update statuses in real time.

### Hospital Administrators
Senior managers and system administrators who need full visibility across all departments. They get a comprehensive dashboard with KPIs, request volumes, SLA compliance rates, workload analytics, and the ability to configure workflows, manage departments, and generate reports.

---

## Key Features

### Smart Auto-Routing
When a patient or staff member submits a request, SevaSetu reads the title and description and automatically assigns it to the right department — no manual sorting required. The routing rules cover all major departments and fall back to Emergency for anything ambiguous.

### SLA Monitoring
Every request gets an SLA deadline (default: 8 hours). A live countdown is visible on every request card. As the deadline approaches, the countdown turns amber, then red. Overdue requests are flagged prominently on all relevant dashboards.

### Real-Time Dashboards
- **Admin**: KPI overview, request volumes, SLA breach count, department workload charts
- **Department Staff**: Incoming requests for their department, outgoing requests they've raised, track-outgoing page
- **Patient**: Submitted requests with status, full history by department

### Role-Based Access Control (RBAC)
Three distinct roles — `admin`, `department_staff`, `patient` — each with their own routes, views, and capabilities. Department staff can only see their department's data. Patients can only see their own requests.

### Complete Audit Logging
Every status change, comment, and document upload is recorded with a timestamp and the user who performed it. Nothing gets quietly edited or deleted without a trace.

### Voice Note Support
Patients who prefer speaking over typing can record a voice note instead of (or in addition to) a written description. The waveform visualization during recording mirrors the experience of familiar voice apps.

### Document Attachments
Prescriptions, scan reports, insurance documents, and lab results can be attached directly to a request. Staff can upload supporting documents from the request detail view.

### Functional Notifications
A live notification bell in the header shows unread alerts — SLA warnings, status updates, escalations. Clicking any notification marks it read. All notifications can be cleared at once.

---

## Use Cases

**Lab Test Processing**
Emergency raises a request to Pathology for an urgent blood panel. Pathology receives it instantly, processes the sample, and updates the status. Emergency sees the update in real time without making a single phone call.

**Imaging Approval**
A ward nurse submits a request for a patient CT scan. SevaSetu routes it to Radiology automatically. The Radiology team reviews, approves, and schedules — all tracked, all logged.

**Inter-Department Referral**
Cardiology needs Neurology to review a patient presenting with both cardiac and neurological symptoms. A request is raised, routed, and both departments can see the same case details.

**Patient Query**
A patient discharged last week wants to know the status of their insurance approval. They visit the SevaSetu homepage, enter their tracking token, and see the current status without needing to call the hospital.

---

## How It Helps

**Patients**
- No need to chase up requests by phone
- Transparent, real-time status for everything they've submitted
- Faster request processing because routing is instant and automatic
- Fewer situations where requests "get lost"

**Doctors and Staff**
- Clear task visibility — always know what's in your queue
- No manual forwarding — requests arrive directly and automatically
- Structured approval workflows reduce confusion about responsibility
- Less time spent on phone calls and paper slips

**Hospital Management**
- Centralized view of all inter-department activity
- SLA compliance metrics to identify bottlenecks before they escalate
- Audit-ready logging for accreditation and compliance requirements
- Data to make better staffing and process decisions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Component Library | shadcn/ui (Radix UI primitives) |
| Routing | React Router v6 |
| State / Data | React Context + localStorage |
| Charts | Recharts |
| Package Manager | npm / bun |

> **Note:** This version is a fully functional prototype. All data is either mocked (static sample data) or stored in `localStorage` for the active browser session. There is no persistent backend yet — that is planned for the next phase. The UI, routing, role separation, and workflow logic are all production-grade; only the data persistence layer is mocked.

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/           # KPI cards, stat widgets
│   ├── layout/              # Sidebar, Topbar, AppLayout wrapper
│   ├── requests/            # StatusChip, PriorityChip, SLACountdown, PatientHistoryModal
│   └── ui/                  # shadcn components + custom VoiceRecorder
├── context/
│   ├── AuthContext.tsx      # Login/logout, user role, session state
│   └── RequestContext.tsx   # Global request store, auto-routing, localStorage sync
├── data/
│   ├── mockRequests.ts      # Static sample requests + all TypeScript type definitions
│   ├── mockUsers.ts         # Demo users for all three roles
│   ├── mockDashboard.ts     # KPI and chart mock data
│   ├── mockDepartments.ts   # Department list
│   └── mockWorkflows.ts     # Workflow template data
├── hooks/                   # useToast, utility hooks
├── pages/
│   ├── HomePage.tsx             # Public landing page with token tracker
│   ├── LoginPage.tsx
│   ├── PublicRequestPage.tsx    # Submit request without login
│   ├── AdminDashboard.tsx
│   ├── DepartmentStaffDashboard.tsx
│   ├── PatientPortal.tsx        # Submit request (logged-in patient)
│   ├── MyRequestsPage.tsx       # Patient's request list
│   ├── MedicalHistoryPage.tsx   # Patient's history by department
│   ├── TrackRequestsPage.tsx    # Dept staff outgoing request tracker
│   ├── RequestsPage.tsx         # Full filtered request list (role-aware)
│   ├── RequestDetailPage.tsx
│   ├── CreateRequestPage.tsx
│   ├── WorkflowPage.tsx
│   ├── ReportsPage.tsx
│   └── SettingsPage.tsx
└── App.tsx
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- A modern browser (Chrome, Firefox, or Edge)

### Install and Run

```bash
# Clone the repository
git clone https://github.com/your-username/sevasetu.git
cd sevasetu

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:8080` (or the next available port if 8080 is in use).

### Build for Production

```bash
npm run build
```

Output goes to `dist/` and can be deployed to Vercel, Netlify, or any static host.

---

## Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| Administrator | sarah.chen@sevasetu.com | any text |
| Radiology Staff | james.wilson@sevasetu.com | any text |
| Patient | john.anderson@email.com | any text |

> Any non-empty password is accepted in this prototype. The system matches email only.

You can also use the homepage to raise a request as a guest — no login required.

---

## Routing Logic

When a request is submitted, `autoRouteDepartment()` scans the title and description for keywords:

| Keywords | Department |
|---|---|
| CT scan, MRI, X-ray, imaging, ultrasound | Radiology |
| blood test, biopsy, specimen, culture | Pathology |
| ECG, cardiac, heart pain, arrhythmia | Cardiology |
| fracture, joint, spine, bone | Orthopedics |
| brain, seizure, stroke, migraine | Neurology |
| cancer, chemotherapy, tumor | Oncology |
| prescription, medication, drug, dosage | Pharmacy |
| *(everything else)* | Emergency |

This is a keyword-matching prototype. Production deployment would replace this with an NLP classifier or structured triage workflow.

---

## UI Design System

SevaSetu uses a unified visual language across every page to ensure a clean, consistent experience.

### Brand Gradient

All pages share a single background gradient:

```css
background: linear-gradient(115deg, #e6f8ff, #eff0fa);
```

This goes from a soft sky-blue (`#e6f8ff`) to a gentle lavender (`#eff0fa`). The gradient is set on the `<body>` with `background-attachment: fixed` so it stays in place as the user scrolls — no jarring color jumps between pages.

The same two hex values are used for any decorative blur-orbs or ambient effects on pages like the homepage.

### Workflow Status Logic

Request statuses in the department staff view are **auto-computed** — staff cannot set them manually. The logic is:

| Condition | Status |
|---|---|
| `slaMinutesRemaining <= 0` | `overdue` |
| `workflowStep >= totalSteps` | `completed` |
| `workflowStep > 1` | `in-progress` |
| `status === "rejected" / "approved" / "escalated"` | preserved as-is |
| default | `pending` |

Staff advance a request by clicking the **"Progress"** button, which increments `workflowStep` and re-evaluates the auto-status.

### Admin Department Filter

The top-right department dropdown in the admin layout is connected to the `FilterContext`. Selecting a department instantly filters the dashboard's recent requests table to show only requests involving that department. Selecting "All Departments" restores the full view.

---

## Security and Compliance Considerations

While the current version is a prototype without a live backend, the architecture is designed with the following in mind for production:

- HTTPS enforced across all routes
- JWT-based authentication with short-lived tokens
- Role-based access control preventing cross-department data leakage
- Row-level security on all database tables (Supabase RLS)
- All environment variables encrypted and never committed to source
- Complete audit log for every action — required for hospital accreditation
- Daily automated backups

---

## Planned Backend Architecture

When moving to production, the intended stack is:

| Layer | Technology |
|---|---|
| Backend / Database | Supabase (PostgreSQL + Auth + Realtime + Storage) |
| Deployment | Vercel (frontend) + Supabase Cloud (backend) |
| Auth | Supabase Auth with JWT |
| File Storage | Supabase Storage (S3-compatible) |
| Real-time | Supabase Realtime subscriptions |

Architecture flow: `Client → Supabase Auth → PostgreSQL → Realtime push to connected clients`

---

## Roadmap

These are planned for future releases, roughly in order of priority:

- **Persistent backend** — Supabase integration replacing localStorage
- **Real authentication** — JWT login with refresh tokens
- **Push notifications** — Real-time alerts when request status changes
- **AI-powered routing** — NLP model replacing regex keyword matching
- **Predictive SLA alerts** — Flag requests likely to breach before they actually do
- **WhatsApp / SMS integration** — Notify patients via their phone without needing the app
- **Mobile application** — React Native version for staff working on the ward
- **Inter-hospital transfers** — Route requests to partner hospitals when a department is at capacity
- **Workload ML optimization** — Automatically balance request assignment based on staff availability
- **DICOM / HL7 integration** — Direct connection with imaging systems and lab equipment

---

## Contributing

Pull requests are welcome. For larger changes, open an issue first to discuss the approach. All code should be TypeScript — avoid `any` types. Component changes should follow the existing shadcn/ui + Tailwind pattern.

---

## License

MIT — free to use and modify. If you deploy this in a real hospital, please reach out — we'd love to hear how it's being used.
