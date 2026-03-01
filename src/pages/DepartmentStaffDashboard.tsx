import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle2, AlertTriangle, FileText, Plus, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { RequestItem, RequestStatus } from "@/data/mockRequests";
import { useRequests } from "@/context/RequestContext";
import { StatusChip } from "@/components/requests/StatusChip";
import SLACountdown from "@/components/requests/SLACountdown";
import PatientHistoryModal from "@/components/requests/PatientHistoryModal";
import { useToast } from "@/hooks/use-toast";

const DepartmentStaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { allRequests } = useRequests();
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; userId?: string } | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Requests INCOMING to this department (to be handled)
  const departmentRequests = allRequests.filter(
    (req) => req.toDepartment === user?.department
  );

  // Requests sent FROM this department to other departments
  const outgoingRequests = allRequests.filter(
    (req) => req.fromDepartment === user?.department && req.toDepartment !== user?.department
  );

  // Calculate metrics
  const assignedRequests = departmentRequests.length;
  const pendingActions = departmentRequests.filter(
    (req) => req.status === "pending" || req.status === "in-progress"
  ).length;
  const completedToday = departmentRequests.filter(
    (req) => req.status === "completed" && 
    new Date(req.updatedAt).toDateString() === new Date().toDateString()
  ).length;
  const overdueTasks = departmentRequests.filter(
    (req) => req.status === "overdue" || req.slaMinutesRemaining < 0
  ).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const handleStatusChange = (requestId: string, newStatus: RequestStatus) => {
    // In a real app, this would call an API to update the backend
    setUpdatingStatus(requestId);
    
    // Simulate API call
    setTimeout(() => {
      // Here you would update the actual data
      // For now, we just show a success message
      toast({
        title: "Status Updated",
        description: `Request ${requestId} status changed to ${newStatus}`,
      });
      setUpdatingStatus(null);
    }, 500);
  };

  const handlePatientClick = (patientId: string, patientUserId?: string) => {
    setSelectedPatient({ id: patientId, userId: patientUserId });
  };

  return (
    <div className="space-y-6">
      {/* Department Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Department Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            {user?.department} Department • {user?.name}
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {user?.role === "department_staff" ? "Department Staff" : user?.role}
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedRequests}</div>
            <p className="text-xs text-muted-foreground">
              Total requests for your department
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingActions}</div>
            <p className="text-xs text-muted-foreground">
              Require your attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
            <p className="text-xs text-muted-foreground">
              Tasks finished today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Past SLA deadline
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Patient Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Requests</CardTitle>
          <CardDescription>
            Manage and update patient requests for your department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Request</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>From/To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No requests found for your department
                    </TableCell>
                  </TableRow>
                ) : (
                  departmentRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <button
                          onClick={() => handlePatientClick(request.patientId, request.patientUserId)}
                          className="font-medium text-primary hover:underline"
                        >
                          {request.patientName}
                        </button>
                        <div className="text-xs text-muted-foreground">
                          {request.patientId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {request.id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(request.priority) as any}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={request.status}
                          onValueChange={(value) => handleStatusChange(request.id, value as RequestStatus)}
                          disabled={updatingStatus === request.id}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue>
                              <StatusChip status={request.status} />
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="escalated">Escalated</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <SLACountdown minutesRemaining={request.slaMinutesRemaining} />
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>From: {request.fromDepartment}</div>
                          <div>To: {request.toDepartment}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/requests/${request.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Patient History Modal */}
      <PatientHistoryModal
        patientId={selectedPatient?.id || null}
        patientUserId={selectedPatient?.userId}
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />

      {/* Outgoing Requests Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-primary" />
            Requests to Other Departments
          </CardTitle>
          <CardDescription>
            Requests originated from {user?.department} sent to other departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {outgoingRequests.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              No outgoing requests from your department
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outgoingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="font-medium">{request.title}</div>
                        <div className="text-xs text-muted-foreground">{request.id}</div>
                      </TableCell>
                      <TableCell>{request.patientName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.toDepartment}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusChip status={request.status} />
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/requests/${request.id}`)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floating Add Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg hover:shadow-xl z-50"
        onClick={() => navigate("/create-request")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default DepartmentStaffDashboard;
