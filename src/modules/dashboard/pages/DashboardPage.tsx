import { ArrowRight, CalendarClock, ClipboardCheck, PackageCheck, PackageX, Wrench } from "lucide-react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useNavigate } from "react-router-dom";
import { useErpStore } from "@/common/store/erpStore";

export function DashboardPage() {
  const navigate = useNavigate();
  const { assets, allocations, bookings, maintenance, transfers, activityLogs } = useErpStore();
  const activeAllocations = allocations.filter((item) => !item.returnedAt);
  const overdue = activeAllocations.filter((item) => item.expectedReturnDate && item.expectedReturnDate < new Date().toISOString().slice(0, 10));
  const kpis = [
    { label: "Assets Available", value: assets.filter((item) => item.status === "AVAILABLE").length, icon: PackageCheck },
    { label: "Assets Allocated", value: assets.filter((item) => item.status === "ALLOCATED").length, icon: ClipboardCheck },
    { label: "Maintenance Open", value: maintenance.filter((item) => item.status !== "RESOLVED" && item.status !== "REJECTED").length, icon: Wrench },
    { label: "Active Bookings", value: bookings.filter((item) => item.status === "UPCOMING" || item.status === "ONGOING").length, icon: CalendarClock },
    { label: "Pending Transfers", value: transfers.filter((item) => item.status === "REQUESTED").length, icon: ArrowRight },
    { label: "Overdue Returns", value: overdue.length, icon: PackageX },
  ];

  return (
    <>
      <PageHeader
        title="Operational Dashboard"
        description="Monitor asset availability, allocation risk, upcoming returns, maintenance activity, and active bookings across the organization."
        actions={
          <>
            <Button>Register Asset</Button>
            <Button variant="outline" onClick={() => navigate("/booking")}>Book Resource</Button>
            <Button variant="secondary" onClick={() => navigate("/maintenance")}>Raise Maintenance</Button>
          </>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <Card key={kpi.label}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{kpi.value}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-muted">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityLogs.slice(0, 6).map((activity) => (
              <div className="flex items-center justify-between rounded-md border border-border p-3" key={activity.id}>
                <span className="text-sm">{activity.message}</span>
                <Badge tone="neutral">Today</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overdue Returns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdue.length === 0 ? <p className="text-sm text-muted-foreground">No overdue returns right now.</p> : overdue.map((allocation) => {
              const asset = assets.find((item) => item.id === allocation.assetId);
              return (
              <div className="rounded-md bg-destructive/10 p-3" key={allocation.id}>
                <p className="text-sm font-medium text-destructive">{asset?.tag} {asset?.name}</p>
                <p className="text-xs text-muted-foreground">Expected return date has passed</p>
              </div>
            )})}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
