import { Plus } from "lucide-react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent } from "@/common/components/ui/Card";

const tabs = ["Departments", "Asset Categories", "Employee Directory"];

export function OrganizationPage() {
  return (
    <>
      <PageHeader
        title="Organization Setup"
        description="Admin-only master data for departments, category metadata, and role assignment independent from authentication."
        actions={<Button icon={<Plus className="h-4 w-4" />}>Create Record</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <Button key={tab} variant={index === 0 ? "primary" : "outline"}>
            {tab}
          </Button>
        ))}
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Head</th>
                <th className="px-5 py-3">Parent</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Employees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Operations", "Aarav Sharma", "Corporate", "Active", "142"],
                ["Facilities", "Meera Iyer", "Operations", "Active", "38"],
                ["Archive", "Unassigned", "Corporate", "Inactive", "0"],
              ].map(([department, head, parent, status, employees]) => (
                <tr key={department}>
                  <td className="px-5 py-4 font-medium">{department}</td>
                  <td className="px-5 py-4">{head}</td>
                  <td className="px-5 py-4">{parent}</td>
                  <td className="px-5 py-4">
                    <Badge tone={status === "Active" ? "success" : "neutral"}>{status}</Badge>
                  </td>
                  <td className="px-5 py-4">{employees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
