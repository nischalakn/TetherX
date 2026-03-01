import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Download, User, Phone, Mail, MapPin } from "lucide-react";
import { mockRequests } from "@/data/mockRequests";
import { mockUsers } from "@/data/mockUsers";
import { StatusChip } from "./StatusChip";
import { Button } from "@/components/ui/button";

interface PatientHistoryModalProps {
  patientId: string | null;
  patientUserId?: string;
  isOpen: boolean;
  onClose: () => void;
}

const PatientHistoryModal = ({ patientId, patientUserId, isOpen, onClose }: PatientHistoryModalProps) => {
  if (!patientId) return null;

  // Find patient user info
  const patientUser = mockUsers.find(u => u.id === patientUserId || u.role === "patient");
  
  // Find all requests for this patient
  const patientRequests = mockRequests.filter(
    req => req.patientId === patientId || req.patientUserId === patientUserId
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Get patient info from first request if user not found
  const patientName = patientUser?.name || patientRequests[0]?.patientName || "Unknown Patient";
  const patientEmail = patientUser?.email || "N/A";
  const patientPhone = (patientUser as any)?.phoneNumber || "N/A";
  const patientDOB = (patientUser as any)?.dateOfBirth || "N/A";

  // Collect all documents from all requests
  const allDocuments = patientRequests.flatMap(req => 
    req.documents?.map(doc => ({
      ...doc,
      requestId: req.id,
      requestTitle: req.title
    })) || []
  );

  // Collect all history items
  const allHistory = patientRequests.flatMap(req =>
    req.history?.map(hist => ({
      ...hist,
      requestId: req.id,
      requestTitle: req.title
    })) || []
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Medical History
          </DialogTitle>
          <DialogDescription>
            Complete medical history and records for {patientName}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="demographics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          {/* Demographics Tab */}
          <TabsContent value="demographics">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Full Name</div>
                        <div className="text-sm text-muted-foreground">{patientName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Patient ID</div>
                        <div className="text-sm text-muted-foreground">{patientId}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Date of Birth</div>
                        <div className="text-sm text-muted-foreground">{patientDOB}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">{patientEmail}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Phone</div>
                        <div className="text-sm text-muted-foreground">{patientPhone}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medical Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Requests:</span>
                      <span className="font-medium">{patientRequests.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Documents:</span>
                      <span className="font-medium">{allDocuments.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Visit:</span>
                      <span className="font-medium">
                        {patientRequests[0] ? formatDate(patientRequests[0].createdAt) : 'N/A'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {patientRequests.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No requests found for this patient
                  </div>
                ) : (
                  patientRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">{request.title}</div>
                            <div className="text-sm text-muted-foreground">{request.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.fromDepartment} → {request.toDepartment}
                            </div>
                          </div>
                          <StatusChip status={request.status} />
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatDate(request.createdAt)}</span>
                          <Badge variant="outline">{request.priority}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {allDocuments.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No documents found for this patient
                  </div>
                ) : (
                  allDocuments.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{doc.filename}</div>
                              <div className="text-sm text-muted-foreground">
                                {doc.requestTitle}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Uploaded by {doc.uploadedBy} • {formatDate(doc.uploadedAt)}
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {allHistory.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No history found for this patient
                  </div>
                ) : (
                  <div className="relative border-l-2 border-border pl-6 space-y-6">
                    {allHistory.map((item, index) => (
                      <div key={item.id} className="relative">
                        <div className="absolute -left-[29px] mt-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                        <div className="space-y-1">
                          <div className="font-medium">{item.action}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.requestTitle} ({item.requestId})
                          </div>
                          <div className="text-sm">{item.details}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{item.performedBy}</span>
                            <span>•</span>
                            <span>{formatDate(item.timestamp)}</span>
                            {item.status && (
                              <>
                                <span>•</span>
                                <StatusChip status={item.status} />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientHistoryModal;
