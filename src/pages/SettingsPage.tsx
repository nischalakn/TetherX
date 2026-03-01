import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/data/mockUsers";
import { Shield, Bell, Lock, User } from "lucide-react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    slaAlerts: true,
    escalations: true,
    weeklyReport: false,
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Profile */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Profile Settings</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={currentUser.name} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={currentUser.email} />
          </div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Input defaultValue={currentUser.department} disabled />
          </div>
          <div className="space-y-2">
            <Label>Employee ID</Label>
            <Input defaultValue={currentUser.id} disabled />
          </div>
        </div>
        <Button className="mt-4" size="sm">Save Changes</Button>
      </div>

      {/* Role Info */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Role & Access</h3>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <div>
            <p className="text-sm font-medium text-foreground capitalize">{currentUser.role}</p>
            <p className="text-xs text-muted-foreground">Full system access with administrative privileges</p>
          </div>
          <div className="flex h-8 items-center rounded-full bg-primary/10 px-3 text-xs font-medium text-primary capitalize">
            {currentUser.role}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Notification Preferences</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: "email" as const, label: "Email Notifications", desc: "Receive email for all request updates" },
            { key: "slaAlerts" as const, label: "SLA Alerts", desc: "Get alerted when SLA deadlines approach" },
            { key: "escalations" as const, label: "Escalation Alerts", desc: "Notify on escalated requests" },
            { key: "weeklyReport" as const, label: "Weekly Report", desc: "Receive weekly performance summary" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key]}
                onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Change Password</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button size="sm">Update Password</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
