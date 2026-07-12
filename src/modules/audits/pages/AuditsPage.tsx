import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { Badge } from "@/common/components/ui/Badge";

export function AuditsPage() {
  return (
    <ModuleOverview
      title="Audit Management"
      description="Create audit cycles, assign auditors, verify scoped assets, generate discrepancy reports, and close locked cycles."
      metrics={[
        { label: "Active Cycles", value: "4", tone: "info" },
        { label: "Assets Verified", value: "312", tone: "success" },
        { label: "Discrepancies", value: "11", tone: "danger" },
        { label: "Pending Auditors", value: "6", tone: "warning" },
      ]}
      workflows={[
        "Audit cycle creation by department, location, and date range",
        "Auditor assignment and asset verification states",
        "Automatic discrepancy report generation for missing or damaged items",
        "Cycle closure that locks records and updates affected asset statuses",
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>Verification States</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            ["Verified", "success"],
            ["Missing", "danger"],
            ["Damaged", "warning"],
            ["Pending Review", "neutral"],
          ].map(([label, tone]) => (
            <div className="flex items-center justify-between rounded-md border border-border p-3" key={label}>
              <span className="text-sm">{label}</span>
              <Badge tone={tone as "success" | "danger" | "warning" | "neutral"}>Tracked</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
