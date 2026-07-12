import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Badge } from "@/common/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

export function ActivityLogsPage() {
  return (
    <ModuleOverview
      title="Activity Logs"
      description="A filterable timeline of create, update, delete, allocate, transfer, return, maintenance, audit, and booking actions."
      metrics={[
        { label: "Events Today", value: "186", tone: "info" },
        { label: "Critical Events", value: "5", tone: "danger" },
        { label: "Actors", value: "42", tone: "success" },
        { label: "Modules Covered", value: "12", tone: "warning" },
      ]}
      workflows={[
        "Every business action creates a durable activity log",
        "Timeline filters by actor, module, action, and date range",
        "Audit-grade metadata for who did what and when",
        "Notification and dashboard integration for high-risk actions",
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>Timeline Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            ["Asset allocated", "Allocation"],
            ["Booking cancelled", "Booking"],
            ["Audit discrepancy flagged", "Audit"],
          ].map(([event, module]) => (
            <div className="flex items-center justify-between rounded-md border border-border p-3" key={event}>
              <span className="text-sm">{event}</span>
              <Badge tone="neutral">{module}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
