import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDepartments } from "@/data/mockDepartments";
import { toast } from "sonner";

const CreateRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "", description: "", patientName: "", patientId: "",
    fromDepartment: "", toDepartment: "", priority: "", category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request created successfully!", { description: "REQ-2024-011 has been submitted for processing." });
    navigate("/requests");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Create New Request</h2>
        <p className="text-sm text-muted-foreground">Submit an inter-department workflow request</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 shadow-card space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>Request Title *</Label>
            <Input placeholder="e.g., CT Scan Approval" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Patient Name *</Label>
            <Input placeholder="Full name" value={formData.patientName} onChange={e => setFormData({ ...formData, patientName: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Patient ID *</Label>
            <Input placeholder="PAT-XXXX" value={formData.patientId} onChange={e => setFormData({ ...formData, patientId: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>From Department *</Label>
            <Select value={formData.fromDepartment} onValueChange={v => setFormData({ ...formData, fromDepartment: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {mockDepartments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>To Department *</Label>
            <Select value={formData.toDepartment} onValueChange={v => setFormData({ ...formData, toDepartment: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {mockDepartments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Priority *</Label>
            <Select value={formData.priority} onValueChange={v => setFormData({ ...formData, priority: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Diagnostics">Diagnostics</SelectItem>
                <SelectItem value="Lab Work">Lab Work</SelectItem>
                <SelectItem value="Discharge">Discharge</SelectItem>
                <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe the request..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="min-h-[100px]" />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button type="button" variant="outline" onClick={() => navigate("/requests")}>Cancel</Button>
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequestPage;
