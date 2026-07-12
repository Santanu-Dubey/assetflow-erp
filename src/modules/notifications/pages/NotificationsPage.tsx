import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useErpStore } from "@/common/store/erpStore";

export function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useErpStore();
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <ModuleOverview
      title="Notification Center"
      description="Central notification hub for allocations, maintenance, bookings, transfers, overdue returns, audits, and system events."
      metrics={[
        { label: "Unread", value: String(unread), tone: "danger" },
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
          {notifications.map((item) => (
            <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3" key={item.id}>
              <div><span className="text-sm font-medium">{item.title}</span><p className="text-xs text-muted-foreground">{item.message}</p></div>
              <button onClick={() => markNotificationRead(item.id)}><Badge tone={item.read ? "neutral" : "info"}>{item.read ? "Read" : "Unread"}</Badge></button>
            </div>
          ))}
          <Button className="w-full" variant="outline" onClick={markAllNotificationsRead}>
            Mark All Read
          </Button>
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
