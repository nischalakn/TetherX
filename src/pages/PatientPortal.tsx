import { useState } from "react";
import { FolderHeart, Plus, Upload, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { useRequests, autoRouteDepartment, autoCategory } from "@/context/RequestContext";
import { useToast } from "@/hooks/use-toast";
import { RequestItem } from "@/data/mockRequests";
import VoiceRecorder from "@/components/ui/VoiceRecorder";

const PatientPortal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { addRequest } = useRequests();

  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTitle) {
      toast({ title: "Missing Information", description: "Please provide a request subject", variant: "destructive" });
      return;
    }
    if (!requestDescription && !audioBlob) {
      toast({ title: "Missing Information", description: "Please add a description or record a voice note", variant: "destructive" });
      return;
    }

    const toDept = autoRouteDepartment(requestTitle, requestDescription);
    const category = autoCategory(requestTitle, requestDescription);
    const newId = `REQ-PAT-${Date.now().toString(36).toUpperCase()}`;
    const token = `MED-${btoa(user?.id || "pat").substring(0, 8).replace(/=/g, "")}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newRequest: RequestItem = {
      id: newId,
      title: requestTitle,
      description: requestDescription || "[Voice Note Attached]",
      patientName: user?.name || "Unknown",
      patientId: user?.id || "",
      patientUserId: user?.id,
      fromDepartment: "Patient Portal",
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
        ? [{ id: `DOC-${Date.now()}`, filename: selectedFile.name, uploadedBy: user?.name || "", uploadedAt: new Date().toISOString(), fileType: selectedFile.type, fileUrl: "#" }]
        : [],
      history: [{ id: `H-${Date.now()}`, action: "Request Created", performedBy: user?.name || "", timestamp: new Date().toISOString(), details: "Request submitted via Patient Portal", status: "pending" }],
      category,
    };

    addRequest(newRequest);
    setGeneratedToken(token);
    setShowTokenDialog(true);
    setRequestTitle("");
    setRequestDescription("");
    setSelectedFile(null);
    setAudioBlob(null);
    toast({ title: "Request Submitted", description: `Routed to ${toDept} department` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
          <FolderHeart className="h-8 w-8" />Patient Portal
        </h1>
        <p className="mt-1 text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />Submit New Request
          </CardTitle>
          <CardDescription>
            Submit a medical request — we'll automatically route it to the right department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Auto-filled patient info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Patient ID</Label>
                <Input value={user?.id || ""} readOnly className="bg-muted text-muted-foreground cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={user?.name || ""} readOnly className="bg-muted text-muted-foreground cursor-not-allowed" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Request Subject <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                placeholder="e.g. Need CT Scan for recurring headaches"
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">
                Description <span className="ml-1 text-xs text-muted-foreground">(or use voice note below)</span>
              </Label>
              <Textarea
                id="desc"
                placeholder="Describe your medical concern in detail..."
                rows={5}
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
              />
            </div>

            {/* Voice recording */}
            <div className="space-y-2">
              <Label>Voice Note <span className="ml-1 text-xs text-muted-foreground">(optional)</span></Label>
              <VoiceRecorder
                hasRecording={!!audioBlob}
                onRecordingComplete={(blob) => setAudioBlob(blob)}
                onRecordingClear={() => setAudioBlob(null)}
              />
            </div>

            {/* File upload */}
            <div className="space-y-2">
              <Label>
                Attach File <span className="ml-1 text-xs text-muted-foreground">(optional — prescription, scan, report)</span>
              </Label>
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50">
                  <Upload className="h-4 w-4" />
                  {selectedFile ? selectedFile.name : "Choose file..."}
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                </label>
                {selectedFile && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>Remove</Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Supported: PDF, JPG, PNG, DOC (Max 10 MB)</p>
            </div>

            <Button type="submit" className="mt-2">Submit Request</Button>
          </form>
        </CardContent>
      </Card>

      {/* Token Dialog */}
      <Dialog open={showTokenDialog} onOpenChange={setShowTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />Request Submitted Successfully
            </DialogTitle>
            <DialogDescription>
              Your request has been automatically routed to the appropriate department.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-4">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Your Tracking Token</p>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">{generatedToken}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Save this token. You can also view all your requests under "My Requests" in the sidebar.
            </p>
            <Button className="w-full" onClick={() => setShowTokenDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientPortal;
