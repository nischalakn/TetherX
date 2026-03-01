import { useState } from "react";
import { mockWorkflows } from "@/data/mockWorkflows";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, GripVertical, Trash2, GitBranch, Clock, User, Building2 } from "lucide-react";

const WorkflowPage = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(mockWorkflows[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Workflow Builder</h2>
          <p className="text-sm text-muted-foreground">Design and manage workflow templates</p>
        </div>
        <Button><Plus className="mr-1.5 h-4 w-4" />New Workflow</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Workflow List */}
        <div className="space-y-3">
          {mockWorkflows.map(wf => (
            <div
              key={wf.id}
              onClick={() => setSelectedWorkflow(wf)}
              className={`cursor-pointer rounded-lg border p-4 transition-all ${
                selectedWorkflow.id === wf.id ? "border-primary bg-primary/5 shadow-card" : "border-border bg-card hover:shadow-card"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <GitBranch className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{wf.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{wf.description}</p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground">{wf.steps.length} steps</span>
                <span className={`text-[10px] font-medium ${wf.isActive ? "text-success" : "text-muted-foreground"}`}>
                  {wf.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Detail */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Label label="Workflow Name" />
              <Input defaultValue={selectedWorkflow.name} className="max-w-sm" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Label label="Category" />
              <span className="text-sm text-muted-foreground">{selectedWorkflow.category}</span>
            </div>

            <h3 className="text-sm font-semibold text-foreground mb-4">Workflow Steps</h3>
            <div className="space-y-3">
              {selectedWorkflow.steps.map((step, i) => (
                <div key={step.id} className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
                  <GripVertical className="mt-1 h-4 w-4 shrink-0 text-muted-foreground cursor-grab" />
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{step.name}</p>
                    <div className="mt-1.5 flex flex-wrap gap-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3" />{step.department}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />{step.assignee}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />{step.estimatedTime}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-4">
              <Plus className="mr-1.5 h-4 w-4" />Add Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Label = ({ label }: { label: string }) => (
  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{label}:</span>
);

export default WorkflowPage;
