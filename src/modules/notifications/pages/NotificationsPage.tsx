import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

export function NotificationsPage() {
  return (
    <ModuleOverview
      title="Notification Center"
      description="Central notification hub for allocations, maintenance, bookings, transfers, overdue returns, audits, and system events."
      metrics={[
        { label: "Unread", value: "23", tone: "danger" },
        { label: "Due Today", value: "8", tone: "warning" },
        { label: "Reminders", value: "14", tone: "info" },
        { label: "Resolved", value: "109", tone: "success" },
      ]}
      workflows={[
        "Unread count and mark-as-read actions",
        "Toast-ready notification architecture",
        "Notification history by type and recipient",
        "Reminder-ready booking and return events",
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Overdue return alert", "Maintenance approved", "Booking reminder"].map((item) => (
            <div className="flex items-center justify-between rounded-md border border-border p-3" key={item}>
              <span className="text-sm">{item}</span>
              <Badge tone="info">Unread</Badge>
            </div>
          ))}
          <Button className="w-full" variant="outline">
            Mark All Read
          </Button>
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
