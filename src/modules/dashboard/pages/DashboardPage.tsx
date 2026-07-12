import { ArrowRight, CalendarClock, ClipboardCheck, PackageCheck, PackageX, Wrench } from "lucide-react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

const kpis = [
  { label: "Assets Available", value: "248", icon: PackageCheck, tone: "success" },
  { label: "Assets Allocated", value: "617", icon: ClipboardCheck, tone: "info" },
  { label: "Maintenance Today", value: "12", icon: Wrench, tone: "warning" },
  { label: "Active Bookings", value: "34", icon: CalendarClock, tone: "info" },
  { label: "Pending Transfers", value: "9", icon: ArrowRight, tone: "warning" },
  { label: "Upcoming Returns", value: "21", icon: PackageX, tone: "danger" },
] as const;

const activities = [
  "Laptop AF-0114 allocated to Priya Nair",
  "Room B2 booking confirmed for Operations sync",
  "Projector AF-0042 return marked overdue",
  "Transfer request created for Tablet AF-0199",
];

export function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Operational Dashboard"
        description="Monitor asset availability, allocation risk, upcoming returns, maintenance activity, and active bookings across the organization."
        actions={
          <>
            <Button>Register Asset</Button>
            <Button variant="outline">Book Resource</Button>
            <Button variant="secondary">Raise Maintenance</Button>
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
            {activities.map((activity) => (
              <div className="flex items-center justify-between rounded-md border border-border p-3" key={activity}>
                <span className="text-sm">{activity}</span>
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
            {["Projector AF-0042", "Laptop AF-0118", "Vehicle AF-0301"].map((asset) => (
              <div className="rounded-md bg-destructive/10 p-3" key={asset}>
                <p className="text-sm font-medium text-destructive">{asset}</p>
                <p className="text-xs text-muted-foreground">Expected return date has passed</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
