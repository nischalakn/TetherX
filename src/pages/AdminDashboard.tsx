import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KPICard from "@/components/dashboard/KPICard";
import { mockKPIs, mockChartData, mockActivities } from "@/data/mockDashboard";
import { StatusChip } from "@/components/requests/StatusChip";
import { mockRequests } from "@/data/mockRequests";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { FileText, CheckCircle, AlertTriangle, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ["hsl(123, 46%, 34%)", "hsl(210, 79%, 46%)", "hsl(27, 96%, 47%)", "hsl(0, 63%, 51%)", "hsl(0, 63%, 41%)"];

const activityIcons: Record<string, React.ElementType> = {
  create: FileText,
  approve: CheckCircle,
  complete: CheckCircle,
  escalate: AlertTriangle,
  comment: Clock,
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockKPIs.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bar Chart */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-card lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Requests by Department</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockChartData.requestsByDepartment} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} />
              <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(210, 79%, 46%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-card lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Request Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockChartData.requestsTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="hsl(210, 79%, 46%)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="completed" stroke="hsl(123, 46%, 34%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-card lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={mockChartData.statusDistribution}
                cx="50%" cy="50%"
                innerRadius={50} outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {mockChartData.statusDistribution.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {mockChartData.statusDistribution.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[10px] text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Activity Feed + Recent Requests */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Activity Feed */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Real-Time Activity Feed</h3>
          <div className="space-y-3">
            {mockActivities.map((activity) => {
              const Icon = activityIcons[activity.type] || FileText;
              return (
                <div key={activity.id} className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Recent Requests</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-left text-xs font-medium text-muted-foreground">ID</th>
                  <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Title</th>
                  <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Priority</th>
                </tr>
              </thead>
              <tbody>
                {mockRequests.slice(0, 6).map((req) => (
                  <tr key={req.id} className="border-b border-border last:border-0">
                    <td className="py-2.5 text-xs font-mono text-muted-foreground">{req.id}</td>
                    <td className="py-2.5 text-xs font-medium text-foreground">{req.title}</td>
                    <td className="py-2.5"><StatusChip status={req.status} /></td>
                    <td className="py-2.5">
                      <span className={`text-xs font-medium capitalize ${
                        req.priority === "critical" ? "text-destructive" :
                        req.priority === "high" ? "text-warning" : "text-muted-foreground"
                      }`}>{req.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg hover:shadow-xl z-50"
        onClick={() => navigate("/create-request")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AdminDashboard;
