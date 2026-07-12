import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Badge } from "@/common/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useErpStore } from "@/common/store/erpStore";

export function ActivityLogsPage() {
  const logs = useErpStore((state) => state.activityLogs);

  return (
    <ModuleOverview
      title="Activity Logs"
      description="A filterable timeline of create, update, delete, allocate, transfer, return, maintenance, audit, and booking actions."
      metrics={[
        { label: "Events Today", value: String(logs.length), tone: "info" },
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
          {logs.map((log) => (
            <div className="flex items-center justify-between rounded-md border border-border p-3" key={log.id}>
              <div><span className="text-sm">{log.message}</span><p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()} by {log.actor}</p></div>
              <Badge tone="neutral">{log.entity}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
