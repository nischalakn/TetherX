import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRequests } from "@/context/RequestContext";
import { useAuth } from "@/context/AuthContext";
import { StatusChip, PriorityChip } from "@/components/requests/StatusChip";
import SLACountdown from "@/components/requests/SLACountdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RequestsPage = () => {
  const navigate = useNavigate();
  const { allRequests } = useRequests();
  const { user } = useAuth();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Department staff only see requests assigned to their department
  const baseRequests = user?.role === "department_staff"
    ? allRequests.filter((req) => req.toDepartment === user.department)
    : allRequests;

  const filtered = baseRequests.filter(req => {
    const matchSearch = req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.patientName.toLowerCase().includes(search.toLowerCase()) ||
      req.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || req.status === statusFilter;
    const matchPriority = priorityFilter === "all" || req.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by ID, title, patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Request ID", "Title", "Patient", "From", "To", "Priority", "Status", "SLA", "Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(req => (
                <tr key={req.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => navigate(`/requests/${req.id}`)}>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{req.id}</td>
                  <td className="px-4 py-3 text-xs font-medium text-foreground">{req.title}</td>
                  <td className="px-4 py-3 text-xs text-foreground">{req.patientName}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{req.fromDepartment}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{req.toDepartment}</td>
                  <td className="px-4 py-3"><PriorityChip priority={req.priority} /></td>
                  <td className="px-4 py-3"><StatusChip status={req.status} /></td>
                  <td className="px-4 py-3"><SLACountdown minutesRemaining={req.slaMinutesRemaining} /></td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/requests/${req.id}`); }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {baseRequests.length} requests</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled><ChevronLeft className="h-4 w-4" /></Button>
            <span className="text-xs text-muted-foreground">Page 1 of 1</span>
            <Button variant="outline" size="sm" disabled><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
