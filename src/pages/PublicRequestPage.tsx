import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRequests, autoRouteDepartment, autoCategory } from "@/context/RequestContext";
import { toast } from "sonner";
import { RequestItem } from "@/data/mockRequests";
import VoiceRecorder from "@/components/ui/VoiceRecorder";

const PublicRequestPage = () => {
  const navigate = useNavigate();
  const { addRequest } = useRequests();

  const [patientId, setPatientId] = useState("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestToken, setRequestToken] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !fullName || !title) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!description && !audioBlob) {
      toast.error("Please provide a description or record a voice note");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const toDept = autoRouteDepartment(title, description);
      const category = autoCategory(title, description);
      const newId = `REQ-PUB-${Date.now().toString(36).toUpperCase()}`;
      const token = `MED-${btoa(patientId).substring(0, 8).replace(/=/g, "")}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      const newRequest: RequestItem = {
        id: newId,
        title,
        description: description || "[Voice Note Attached]",
        patientName: fullName,
        patientId,
        patientUserId: patientId,
        fromDepartment: "Patient Portal (Public)",
        toDepartment: toDept,
        status: "pending",
        priority: "medium",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: "Unassigned",
        slaDeadline: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        slaMinutesRemaining: 480,
        workflowStep: 1,
        totalSteps: 3,
        comments: [],
        attachments: selectedFile ? [selectedFile.name] : [],
        documents: selectedFile
          ? [{ id: `DOC-${Date.now()}`, filename: selectedFile.name, uploadedBy: fullName, uploadedAt: new Date().toISOString(), fileType: selectedFile.type, fileUrl: "#" }]
          : [],
        history: [{ id: `H-${Date.now()}`, action: "Request Created", performedBy: fullName, timestamp: new Date().toISOString(), details: `Public request submitted by ${fullName}`, status: "pending" }],
        category,
      };

      addRequest(newRequest);
      setRequestToken(token);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-foreground">Request Submitted!</h2>
          <p className="mt-2 text-muted-foreground">Your request has been received and routed to the appropriate department.</p>
          <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">Your Tracking Token</p>
            <p className="mt-1 font-mono text-sm font-semibold text-foreground">{requestToken}</p>
            <p className="mt-2 text-xs text-muted-foreground">Save this token to track your request status</p>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
            <Button onClick={() => { setSubmitted(false); setPatientId(""); setFullName(""); setTitle(""); setDescription(""); setSelectedFile(null); setAudioBlob(null); }}>
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">SevaSetu</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-1.5 h-4 w-4" />Back
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Raise a Medical Request</h1>
          <p className="mt-1 text-muted-foreground">Your request will be automatically routed to the right department</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Patient ID <span className="text-destructive">*</span></Label>
              <Input placeholder="e.g. PAT-001" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Full Name <span className="text-destructive">*</span></Label>
              <Input placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Request Subject <span className="text-destructive">*</span></Label>
            <Input placeholder="e.g. Need CT Scan for recurring head pain" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Description <span className="text-muted-foreground text-xs">(or use voice note below)</span></Label>
            <Textarea placeholder="Describe your medical concern in detail..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>

          <div className="space-y-2">
            <Label>Voice Note <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <VoiceRecorder
              hasRecording={!!audioBlob}
              onRecordingComplete={(blob) => setAudioBlob(blob)}
              onRecordingClear={() => setAudioBlob(null)}
            />
          </div>

          <div className="space-y-2">
            <Label>Attach File <span className="text-muted-foreground text-xs">(optional — prescription, scan, report)</span></Label>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50">
                <Upload className="h-4 w-4" />
                {selectedFile ? selectedFile.name : "Choose file..."}
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
              </label>
              {selectedFile && <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>Remove</Button>}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicRequestPage;
