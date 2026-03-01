import { useParams, useNavigate } from "react-router-dom";
import { mockRequests } from "@/data/mockRequests";
import { StatusChip, PriorityChip } from "@/components/requests/StatusChip";
import SLACountdown from "@/components/requests/SLACountdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, Paperclip, Send, CheckCircle, Clock, User, FileText, AlertTriangle,
  Upload, RefreshCw
} from "lucide-react";
import { useState } from "react";

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const request = mockRequests.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Request not found</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/requests")}>Back to Requests</Button>
      </div>
    );
  }

  const steps = [
    { label: "Request Created", completed: request.workflowStep >= 1, active: request.workflowStep === 1 },
    { label: "Under Review", completed: request.workflowStep >= 2, active: request.workflowStep === 2 },
    { label: "Processing", completed: request.workflowStep >= 3, active: request.workflowStep === 3 },
    { label: "Completed", completed: request.workflowStep >= 4, active: request.workflowStep === 4 },
  ].slice(0, request.totalSteps);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/requests")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">{request.title}</h2>
              <StatusChip status={request.status} />
              <PriorityChip priority={request.priority} />
            </div>
            <p className="text-xs text-muted-foreground font-mono">{request.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><RefreshCw className="mr-1.5 h-3.5 w-3.5" />Reassign</Button>
          <Button size="sm"><CheckCircle className="mr-1.5 h-3.5 w-3.5" />Approve</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Details + Timeline */}
        <div className="space-y-6 lg:col-span-2">
          {/* Info */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Request Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Patient", request.patientName],
                ["Patient ID", request.patientId],
                ["From", request.fromDepartment],
                ["To", request.toDepartment],
                ["Assigned To", request.assignedTo],
                ["Category", request.category],
                ["Created", new Date(request.createdAt).toLocaleString()],
                ["Updated", new Date(request.updatedAt).toLocaleString()],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Description</p>
              <p className="mt-1 text-sm text-foreground">{request.description}</p>
            </div>
          </div>

          {/* Timeline / Stepper */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Workflow Timeline</h3>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                      step.completed ? "border-success bg-success" :
                      step.active ? "border-primary bg-primary" :
                      "border-border bg-background"
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4 text-success-foreground" />
                      ) : step.active ? (
                        <Clock className="h-3.5 w-3.5 text-primary-foreground" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{i + 1}</span>
                      )}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[32px] ${step.completed ? "bg-success" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${step.completed || step.active ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                    {step.active && <p className="text-xs text-muted-foreground">Currently at this step</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Comments ({request.comments.length})</h3>
            <div className="space-y-3">
              {request.comments.map((c) => (
                <div key={c.id} className="rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                      {c.user.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="text-xs font-medium text-foreground">{c.user}</span>
                    <span className="text-[10px] text-muted-foreground">{new Date(c.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-foreground pl-8">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <Button size="icon" className="shrink-0 self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: SLA + Attachments + Audit */}
        <div className="space-y-6">
          {/* SLA */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="mb-3 text-sm font-semibold text-foreground">SLA Status</h3>
            <div className="flex items-center gap-3">
              <SLACountdown minutesRemaining={request.slaMinutesRemaining} />
              <span className="text-xs text-muted-foreground">remaining</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${
                  request.slaMinutesRemaining < 0 ? "bg-destructive" :
                  request.slaMinutesRemaining <= 30 ? "bg-destructive" :
                  request.slaMinutesRemaining <= 120 ? "bg-warning" : "bg-success"
                }`}
                style={{ width: `${Math.max(0, Math.min(100, (1 - request.slaMinutesRemaining / 480) * 100))}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Deadline: {new Date(request.slaDeadline).toLocaleString()}
            </p>
          </div>

          {/* Attachments */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Attachments ({request.attachments.length})</h3>
            {request.attachments.length > 0 ? (
              <div className="space-y-2">
                {request.attachments.map((a) => (
                  <div key={a} className="flex items-center gap-2 rounded-md border border-border p-2">
                    <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="flex-1 text-xs text-foreground">{a}</span>
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No attachments</p>
            )}
            <Button variant="outline" size="sm" className="mt-3 w-full">
              <Upload className="mr-1.5 h-3.5 w-3.5" /> Upload File
            </Button>
          </div>

          {/* Audit Log */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Audit Log</h3>
            <div className="space-y-2">
              {[
                { action: "Request created", user: "Dr. Michael Park", time: request.createdAt },
                { action: "Assigned to " + request.assignedTo, user: "System", time: request.createdAt },
                { action: "Status changed to " + request.status, user: request.assignedTo, time: request.updatedAt },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <div>
                    <p className="text-xs text-foreground">{log.action}</p>
                    <p className="text-[10px] text-muted-foreground">by {log.user} • {new Date(log.time).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Escalation */}
          {(request.status === "escalated" || request.slaMinutesRemaining < 0) && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-xs font-semibold text-destructive">Escalation Alert</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                This request has been escalated due to SLA breach. Supervisor attention required.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
