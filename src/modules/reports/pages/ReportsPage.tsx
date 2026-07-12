import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

const reportData = [
  { department: "Ops", assets: 180 },
  { department: "IT", assets: 126 },
  { department: "HR", assets: 42 },
  { department: "Facilities", assets: 94 },
];

export function ReportsPage() {
  return (
    <ModuleOverview
      title="Reports & Analytics"
      description="Interactive analytics for asset utilization, department allocation, bookings, maintenance frequency, and overdue risk."
      metrics={[
        { label: "Report Packs", value: "12", tone: "info" },
        { label: "Export Ready", value: "CSV/XLSX", tone: "success" },
        { label: "Idle Assets", value: "64", tone: "warning" },
        { label: "Overdue Rate", value: "3.8%", tone: "danger" },
      ]}
      workflows={[
        "Department-wise allocation summaries",
        "Maintenance frequency and asset health reporting",
        "Resource booking heatmaps and utilization trends",
        "Export pipeline ready for CSV, Excel, and PDF generation",
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>Department Allocation</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="assets" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
