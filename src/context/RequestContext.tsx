import { createContext, useContext, useState, ReactNode } from "react";
import { RequestItem, RequestStatus, mockRequests } from "@/data/mockRequests";

const STORAGE_KEY = "sevasetu_dynamic_requests";

const loadFromStorage = (): RequestItem[] => {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
};

// Auto-compute status based on workflow progress & SLA — no manual override
export const computeAutoStatus = (req: RequestItem): RequestStatus => {
  // Preserve terminal/manually-decided statuses
  if (req.status === "rejected" || req.status === "escalated" || req.status === "approved") {
    return req.status;
  }
  if (req.slaMinutesRemaining !== undefined && req.slaMinutesRemaining <= 0) return "overdue";
  const total = req.totalSteps ?? 4;
  const step = req.workflowStep ?? 1;
  if (step >= total) return "completed";
  if (step > 1) return "in-progress";
  return "pending";
};

// Step labels for dept staff "Progress" button
export const workflowStepLabel = (step: number, total: number): string => {
  const pct = Math.round((step / total) * 100);
  if (pct >= 100) return "Completed";
  if (pct >= 75) return "Final Review";
  if (pct >= 50) return "Processing";
  if (pct >= 25) return "In Progress";
  return "Received";
};

interface RequestContextType {
  allRequests: RequestItem[];
  addRequest: (req: RequestItem) => void;
  progressRequest: (id: string) => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [dynamic, setDynamic] = useState<RequestItem[]>(loadFromStorage);

  const addRequest = (req: RequestItem) => {
    setDynamic((prev) => {
      const updated = [req, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const progressRequest = (id: string) => {
    setDynamic((prev) => {
      const updated = prev.map((req) => {
        if (req.id !== id) return req;
        const total = req.totalSteps ?? 4;
        const nextStep = Math.min((req.workflowStep ?? 1) + 1, total);
        const updated = { ...req, workflowStep: nextStep };
        updated.status = computeAutoStatus(updated);
        return updated;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <RequestContext.Provider value={{ allRequests: [...dynamic, ...mockRequests], addRequest, progressRequest }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequests must be used within RequestProvider");
  return ctx;
}

export const autoRouteDepartment = (title: string, description: string): string => {
  const t = `${title} ${description}`.toLowerCase();
  if (/ct.?scan|mri|x.?ray|xray|imaging|ultrasound|radiol/.test(t)) return "Radiology";
  if (/blood|lab|biopsy|pathol|culture|specimen|sample/.test(t)) return "Pathology";
  if (/heart|cardiac|ecg|ekg|cardiolog|chest.?pain|arrhythmia/.test(t)) return "Cardiology";
  if (/cancer|chemo|tumor|oncolog|malignant/.test(t)) return "Oncology";
  if (/brain|neuro|seizure|stroke|migraine|epilepsy/.test(t)) return "Neurology";
  if (/bone|fracture|joint|orthoped|spine|knee|hip/.test(t)) return "Orthopedics";
  if (/medicine|drug|pharmac|prescription|medication|dosage/.test(t)) return "Pharmacy";
  return "Emergency";
};

export const autoCategory = (title: string, description: string): string => {
  const t = `${title} ${description}`.toLowerCase();
  if (/ct|mri|x.?ray|scan|imaging|ultrasound/.test(t)) return "Diagnostics";
  if (/blood|lab|biopsy|culture|specimen/.test(t)) return "Lab Work";
  if (/medicine|drug|pharmac|prescription|medication/.test(t)) return "Pharmacy";
  if (/discharge|leave|clearance/.test(t)) return "Discharge";
  if (/referral|transfer/.test(t)) return "Referral";
  return "Consultation";
};
