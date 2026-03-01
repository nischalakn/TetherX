import { Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/context/AuthContext";
import { useRequests } from "@/context/RequestContext";
import { StatusChip } from "@/components/requests/StatusChip";

const MedicalHistoryPage = () => {
  const { user } = useAuth();
  const { allRequests } = useRequests();

  const myRequests = allRequests
    .filter((req) => req.patientUserId === user?.id || req.patientId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const byDept = myRequests.reduce<Record<string, typeof myRequests>>((acc, req) => {
    if (!acc[req.toDepartment]) acc[req.toDepartment] = [];
    acc[req.toDepartment].push(req);
    return acc;
  }, {});

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Medical History</h1>
        <p className="mt-1 text-muted-foreground">Your past requests organised by department</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />History by Department
          </CardTitle>
          <CardDescription>
            {myRequests.length} total record{myRequests.length !== 1 ? "s" : ""} across{" "}
            {Object.keys(byDept).length} department{Object.keys(byDept).length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(byDept).length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Calendar className="mx-auto mb-3 h-12 w-12 opacity-40" />
              <p>No medical history available yet</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(byDept).map(([dept, requests]) => (
                <AccordionItem key={dept} value={dept}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex w-full items-center justify-between pr-4">
                      <span className="font-medium">{dept}</span>
                      <Badge variant="secondary">{requests.length} request{requests.length !== 1 ? "s" : ""}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {requests.map((req) => (
                        <div key={req.id} className="flex items-start justify-between rounded-lg border bg-card p-3 transition-colors hover:bg-accent/40">
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{req.title}</div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span>{formatDate(req.createdAt)}</span>
                              <span>·</span>
                              <span>{req.id}</span>
                              <Badge variant={req.priority === "critical" || req.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                                {req.priority}
                              </Badge>
                            </div>
                            {req.documents && req.documents.length > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <FileText className="h-3 w-3" />
                                <span>{req.documents.length} document{req.documents.length !== 1 ? "s" : ""}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <StatusChip status={req.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalHistoryPage;
