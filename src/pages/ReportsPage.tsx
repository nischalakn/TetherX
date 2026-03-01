import { mockChartData } from "@/data/mockDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

const ReportsPage = () => {
  const { toast } = useToast();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground">Generate and export departmental reports</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="date" className="pl-9 w-40" defaultValue="2024-12-01" />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="date" className="pl-9 w-40" defaultValue="2024-12-15" />
          </div>
          <Button variant="outline" onClick={() => toast({ title: "Exporting CSV", description: "Your CSV report is being generated..." })}><Download className="mr-1.5 h-4 w-4" />Export CSV</Button>
          <Button onClick={() => toast({ title: "Generating PDF", description: "Your PDF report is being compiled..." })}><Download className="mr-1.5 h-4 w-4" />Export PDF</Button>
        </div>
      </div>

      {/* KPI Trend */}
      <div className="rounded-lg border border-border bg-card p-5 shadow-card">
        <h3 className="mb-4 text-sm font-semibold text-foreground">KPI Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockChartData.requestsTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} domain={[80, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="requests" stroke="hsl(210, 79%, 46%)" strokeWidth={2} name="Total Requests" yAxisId="left" />
            <Line type="monotone" dataKey="completed" stroke="hsl(123, 46%, 34%)" strokeWidth={2} name="Completed" yAxisId="left" />
            <Line type="monotone" dataKey="sla" stroke="hsl(27, 96%, 47%)" strokeWidth={2} name="SLA %" yAxisId="right" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Department Performance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Department Performance Score</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockChartData.departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="department" tick={{ fontSize: 10, fill: "hsl(215, 16%, 47%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="hsl(210, 79%, 46%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Table */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Department Scorecard</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Department", "Score", "Avg Time", "Completed", "Pending"].map(h => (
                    <th key={h} className="pb-2 text-left text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockChartData.departmentPerformance.map(d => (
                  <tr key={d.department} className="border-b border-border last:border-0">
                    <td className="py-2.5 text-xs font-medium text-foreground">{d.department}</td>
                    <td className="py-2.5">
                      <span className={`text-xs font-semibold ${d.score >= 90 ? "text-success" : d.score >= 85 ? "text-warning" : "text-destructive"}`}>
                        {d.score}%
                      </span>
                    </td>
                    <td className="py-2.5 text-xs text-muted-foreground">{d.avgTime}h</td>
                    <td className="py-2.5 text-xs text-foreground">{d.completed}</td>
                    <td className="py-2.5 text-xs text-foreground">{d.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
