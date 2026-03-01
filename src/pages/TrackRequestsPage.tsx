import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Clock, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useRequests } from "@/context/RequestContext";
import { StatusChip, PriorityChip } from "@/components/requests/StatusChip";
import SLACountdown from "@/components/requests/SLACountdown";

const TrackRequestsPage = () => {
  const { user } = useAuth();
  const { allRequests } = useRequests();
  const navigate = useNavigate();

  const outgoing = allRequests.filter(
    (req) => req.fromDepartment === user?.department && req.toDepartment !== user?.department
  );

  const pending = outgoing.filter((r) => r.status === "pending").length;
  const inProgress = outgoing.filter((r) => r.status === "in-progress").length;
  const completed = outgoing.filter((r) => r.status === "completed").length;
  const overdue = outgoing.filter((r) => r.status === "overdue" || r.slaMinutesRemaining < 0).length;

  const metrics = [
    { label: "Pending", value: pending, icon: Clock, color: "text-warning" },
    { label: "In Progress", value: inProgress, icon: TrendingUp, color: "text-primary" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-success" },
    { label: "Overdue", value: overdue, icon: AlertTriangle, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Track Outgoing Requests</h1>
        <p className="mt-1 text-muted-foreground">
          Requests submitted by <span className="font-medium text-foreground">{user?.department}</span> to other departments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <m.icon className={`h-5 w-5 ${m.color}`} />
                <div>
                  <div className="text-2xl font-bold">{m.value}</div>
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5" />Outgoing Requests
          </CardTitle>
          <CardDescription>All requests sent from {user?.department} to other departments</CardDescription>
        </CardHeader>
        <CardContent>
          {outgoing.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <ArrowUpRight className="mx-auto mb-3 h-12 w-12 opacity-40" />
              <p>No outgoing requests from your department yet</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outgoing.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell>
                        <div className="font-medium">{req.title}</div>
                        <div className="text-xs text-muted-foreground">{req.id}</div>
                      </TableCell>
                      <TableCell>{req.patientName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{req.toDepartment}</Badge>
                      </TableCell>
                      <TableCell><PriorityChip priority={req.priority} /></TableCell>
                      <TableCell><StatusChip status={req.status} /></TableCell>
                      <TableCell><SLACountdown minutesRemaining={req.slaMinutesRemaining} /></TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/requests/${req.id}`)}>
                          View
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
    </div>
  );
};

export default TrackRequestsPage;
