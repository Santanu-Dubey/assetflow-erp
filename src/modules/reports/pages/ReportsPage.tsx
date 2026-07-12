import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { Button } from "@/common/components/ui/Button";
import { useErpStore } from "@/common/store/erpStore";

export function ReportsPage() {
  const { departments, employees, allocations, assets, bookings, maintenance } = useErpStore();
  const reportData = departments.map((department) => ({
    department: department.name,
    assets: allocations.filter((allocation) => employees.find((employee) => employee.id === allocation.employeeId)?.departmentId === department.id).length,
  }));
  const exportCsv = () => {
    const csv = ["Department,Assets", ...reportData.map((row) => `${row.department},${row.assets}`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "assetflow-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ModuleOverview
      title="Reports & Analytics"
      description="Interactive analytics for asset utilization, department allocation, bookings, maintenance frequency, and overdue risk."
      metrics={[
        { label: "Assets", value: String(assets.length), tone: "info" },
        { label: "Export Ready", value: "CSV/XLSX", tone: "success" },
        { label: "Bookings", value: String(bookings.length), tone: "warning" },
        { label: "Maintenance", value: String(maintenance.length), tone: "danger" },
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
          <div className="flex items-center justify-between"><CardTitle>Department Allocation</CardTitle><Button variant="outline" onClick={exportCsv}>Export CSV</Button></div>
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
