import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useRequests } from "@/context/RequestContext";
import { StatusChip } from "@/components/requests/StatusChip";
import SLACountdown from "@/components/requests/SLACountdown";

const MyRequestsPage = () => {
  const { user } = useAuth();
  const { allRequests } = useRequests();
  const navigate = useNavigate();

  const myRequests = allRequests
    .filter((req) => req.patientUserId === user?.id || req.patientId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Requests</h1>
        <p className="mt-1 text-muted-foreground">Track all your submitted medical requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />All Requests
          </CardTitle>
          <CardDescription>{myRequests.length} total request{myRequests.length !== 1 ? "s" : ""}</CardDescription>
        </CardHeader>
        <CardContent>
          {myRequests.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <FileText className="mx-auto mb-3 h-12 w-12 opacity-40" />
              <p>You haven't submitted any requests yet</p>
              <Button className="mt-4" onClick={() => navigate("/patient")}>
                Submit Your First Request
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell>
                        <div className="font-medium">{req.title}</div>
                        <div className="text-xs text-muted-foreground">{req.id}</div>
                      </TableCell>
                      <TableCell>{req.toDepartment}</TableCell>
                      <TableCell><StatusChip status={req.status} /></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(req.createdAt)}</TableCell>
                      <TableCell><SLACountdown minutesRemaining={req.slaMinutesRemaining} /></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => navigate(`/requests/${req.id}`)}>
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
    </div>
  );
};

export default MyRequestsPage;
