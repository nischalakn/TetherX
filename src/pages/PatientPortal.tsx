import { useState } from "react";
import { FolderHeart, FileText, Plus, Calendar, Download, Copy, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { mockRequests } from "@/data/mockRequests";
import { mockDepartments } from "@/data/mockDepartments";
import { StatusChip } from "@/components/requests/StatusChip";
import SLACountdown from "@/components/requests/SLACountdown";
import { useToast } from "@/hooks/use-toast";

// Token generation utility
const generateRequestToken = (userId: string, userName: string, userEmail: string, dateOfBirth?: string, phoneNumber?: string, address?: string) => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  
  // Create patient details object
  const patientDetails = {
    id: userId,
    name: userName,
    email: userEmail,
    dateOfBirth: dateOfBirth || "N/A",
    phoneNumber: phoneNumber || "N/A",
    address: address || "N/A",
    timestamp: new Date(timestamp).toISOString()
  };
  
  // Encode patient details in base64
  const detailsJson = JSON.stringify(patientDetails);
  const base64Details = btoa(detailsJson);
  
  // Create token format: PREFIX-BASE64DETAILS-RANDOM-TIMESTAMP
  const token = `MED-${base64Details.substring(0, 20)}-${randomStr.toUpperCase()}-${timestamp.toString(36).toUpperCase()}`;
  
  return { token, patientDetails };
};

const PatientPortal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Token state
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [tokenPatientDetails, setTokenPatientDetails] = useState<any>(null);
  const [tokenCopied, setTokenCopied] = useState(false);

  // Filter requests for this patient
  const myRequests = mockRequests.filter(
    req => req.patientUserId === user?.id || req.patientId === user?.id
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Group requests by department for history
  const requestsByDepartment = myRequests.reduce((acc, req) => {
    const dept = req.toDepartment;
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(req);
    return acc;
  }, {} as Record<string, typeof myRequests>);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestTitle || !requestDescription || !selectedDepartment || !selectedCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    // Generate token with patient details
    if (user) {
      const { token, patientDetails } = generateRequestToken(
        user.id,
        user.name,
        user.email,
        user.dateOfBirth,
        user.phoneNumber,
        user.address
      );
      
      setGeneratedToken(token);
      setTokenPatientDetails(patientDetails);
      setShowTokenDialog(true);
      setTokenCopied(false);
    }

    // In real app, this would submit to backend with token
    toast({
      title: "Request Submitted",
      description: "Your request has been submitted successfully. Your tracking token has been generated.",
    });

    // Reset form
    setRequestTitle("");
    setRequestDescription("");
    setSelectedDepartment("");
    setSelectedCategory("");
    setSelectedPriority("medium");
    setSelectedFile(null);
  };
  
  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken);
    setTokenCopied(true);
    toast({
      title: "Token Copied",
      description: "Token has been copied to clipboard",
    });
    setTimeout(() => setTokenCopied(false), 2000);
  };
  
  const handleDownloadToken = () => {
    const tokenData = {
      token: generatedToken,
      patientDetails: tokenPatientDetails,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(tokenData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `request-token-${tokenPatientDetails.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Token Downloaded",
      description: "Token details have been downloaded",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      critical: "destructive",
      high: "destructive",
      medium: "default",
      low: "secondary"
    };
    return <Badge variant={variants[priority] || "default"}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <FolderHeart className="h-8 w-8" />
          Patient Portal
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome, {user?.name}
        </p>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="submit">Submit Request</TabsTrigger>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
        </TabsList>

        {/* Submit Request Tab */}
        <TabsContent value="submit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Submit New Request
              </CardTitle>
              <CardDescription>
                Submit a new medical request to a department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Request Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., CT Scan Required"
                      value={requestTitle}
                      onChange={(e) => setRequestTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockDepartments.map(dept => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Request Type *</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Diagnostics">Diagnostics</SelectItem>
                        <SelectItem value="Lab Work">Lab Work</SelectItem>
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your medical request in detail..."
                    rows={5}
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Attach File (Optional)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, JPG, PNG, DOC (Max 10MB)
                  </p>
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Requests Tab */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                My Requests
              </CardTitle>
              <CardDescription>
                Track and view all your submitted requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myRequests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>You haven't submitted any requests yet</p>
                  <Button className="mt-4" onClick={() => document.querySelector('[value="submit"]')?.dispatchEvent(new Event('click'))}>
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
                      {myRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="font-medium">{request.title}</div>
                            <div className="text-xs text-muted-foreground">{request.id}</div>
                          </TableCell>
                          <TableCell>{request.toDepartment}</TableCell>
                          <TableCell>
                            <StatusChip status={request.status} />
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(request.createdAt)}
                          </TableCell>
                          <TableCell>
                            <SLACountdown minutesRemaining={request.slaMinutesRemaining} />
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.location.href = `/requests/${request.id}`}
                            >
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
        </TabsContent>

        {/* Medical History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Medical History
              </CardTitle>
              <CardDescription>
                View your past requests organized by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(requestsByDepartment).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No medical history available</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(requestsByDepartment).map(([department, requests]) => (
                    <AccordionItem key={department} value={department}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-medium">{department}</span>
                          <Badge variant="secondary">{requests.length} requests</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {requests.map((request) => (
                            <div
                              key={request.id}
                              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                              <div className="space-y-1">
                                <div className="font-medium">{request.title}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{formatDate(request.createdAt)}</span>
                                  <span>•</span>
                                  <span>{request.id}</span>
                                  <span>•</span>
                                  {getPriorityBadge(request.priority)}
                                </div>
                                {request.documents && request.documents.length > 0 && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <FileText className="h-3 w-3" />
                                    <span>{request.documents.length} document(s)</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <StatusChip status={request.status} />
                                <Button size="sm" variant="ghost">
                                  View
                                </Button>
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
        </TabsContent>
      </Tabs>

      {/* Token Dialog */}
      <Dialog open={showTokenDialog} onOpenChange={setShowTokenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Request Token Generated
            </DialogTitle>
            <DialogDescription>
              Your request has been successfully submitted. Please save this token for tracking your request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {/* Token Display */}
            <div className="space-y-2">
              <Label>Request Tracking Token</Label>
              <div className="flex gap-2">
                <Input 
                  value={generatedToken} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleCopyToken}
                >
                  {tokenCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This token contains your patient details and can be used to track your request
              </p>
            </div>

            {/* Patient Details in Token */}
            {tokenPatientDetails && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Patient Details Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-muted-foreground">Patient ID:</span>
                      <div className="font-medium">{tokenPatientDetails.id}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <div className="font-medium">{tokenPatientDetails.name}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <div className="font-medium">{tokenPatientDetails.email}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <div className="font-medium">{tokenPatientDetails.dateOfBirth}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <div className="font-medium">{tokenPatientDetails.phoneNumber}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Generated:</span>
                      <div className="font-medium">{new Date(tokenPatientDetails.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Address:</span>
                    <div className="font-medium">{tokenPatientDetails.address}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleDownloadToken}>
                <Download className="h-4 w-4 mr-2" />
                Download Token
              </Button>
              <Button onClick={() => setShowTokenDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientPortal;
