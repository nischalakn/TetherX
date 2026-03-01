import { mockRequests } from "@/data/mockRequests";
import { mockDepartments } from "@/data/mockDepartments";
import { StatusChip, PriorityChip } from "@/components/requests/StatusChip";
import SLACountdown from "@/components/requests/SLACountdown";
import { Button } from "@/components/ui/button";
import { Eye, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DepartmentDashboard = () => {
  const navigate = useNavigate();
  const dept = mockDepartments[0]; // Radiology
  const deptRequests = mockRequests.filter(r => r.toDepartment === dept.name || r.fromDepartment === dept.name);
  const pendingCount = deptRequests.filter(r => r.status === "pending").length;
  const overdueCount = deptRequests.filter(r => r.status === "overdue" || r.slaMinutesRemaining < 0).length;

  const metrics = [
    { label: "Assigned Requests", value: deptRequests.length, icon: Clock, color: "text-primary" },
    { label: "Pending Approvals", value: pendingCount, icon: AlertTriangle, color: "text-warning" },
    { label: "Overdue Tasks", value: overdueCount, icon: AlertTriangle, color: "text-destructive" },
    { label: "Completed Today", value: 12, icon: CheckCircle, color: "text-success" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{dept.name} Department</h2>
          <p className="text-sm text-muted-foreground">Head: {dept.head} • {dept.staffCount} staff</p>
        </div>
        <div className="flex h-8 items-center rounded-full bg-primary/10 px-3 text-xs font-medium text-primary">
          Staff Role: Admin
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <m.icon className={`h-4 w-4 ${m.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load Meter */}
      <div className="rounded-lg border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">Department Workload</h3>
          <span className="text-xs text-muted-foreground">75% capacity</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: "75%" }} />
        </div>
      </div>

      {/* Requests Table */}
      <div className="rounded-lg border border-border bg-card shadow-card">
        <div className="p-5 pb-0">
          <h3 className="text-sm font-semibold text-foreground">Department Requests</h3>
        </div>
        <div className="overflow-x-auto p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Request ID", "Patient", "Title", "Priority", "Status", "SLA", "Action"].map(h => (
                  <th key={h} className="pb-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deptRequests.map(req => (
                <tr key={req.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                  <td className="py-3 pr-4 text-xs font-mono text-muted-foreground">{req.id}</td>
                  <td className="py-3 pr-4 text-xs font-medium text-foreground">{req.patientName}</td>
                  <td className="py-3 pr-4 text-xs text-foreground">{req.title}</td>
                  <td className="py-3 pr-4"><PriorityChip priority={req.priority} /></td>
                  <td className="py-3 pr-4"><StatusChip status={req.status} /></td>
                  <td className="py-3 pr-4"><SLACountdown minutesRemaining={req.slaMinutesRemaining} /></td>
                  <td className="py-3">
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/requests/${req.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;
