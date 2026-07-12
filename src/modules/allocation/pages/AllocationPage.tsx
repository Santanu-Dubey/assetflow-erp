import { ArrowRightLeft, RotateCcw } from "lucide-react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

export function AllocationPage() {
  return (
    <>
      <PageHeader
        title="Asset Allocation & Transfer"
        description="Allocate available assets, block double allocation, request transfers, track expected return dates, and process condition check-in."
        actions={
          <>
            <Button icon={<ArrowRightLeft className="h-4 w-4" />}>Allocate Asset</Button>
            <Button variant="outline" icon={<RotateCcw className="h-4 w-4" />}>
              Return Asset
            </Button>
          </>
        }
      />
      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Active Allocations</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border bg-muted/60 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Asset</th>
                  <th className="px-5 py-3">Holder</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Expected Return</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["AF-0114", "Priya Nair", "Operations", "2026-07-20", "Active"],
                  ["AF-0042", "Raj Malhotra", "Facilities", "2026-07-08", "Overdue"],
                  ["AF-0199", "Anika Rao", "HR", "2026-07-30", "Transfer Requested"],
                ].map(([asset, holder, department, expectedReturn, status]) => (
                  <tr key={asset}>
                    <td className="px-5 py-4 font-mono text-xs font-semibold">{asset}</td>
                    <td className="px-5 py-4">{holder}</td>
                    <td className="px-5 py-4">{department}</td>
                    <td className="px-5 py-4">{expectedReturn}</td>
                    <td className="px-5 py-4">
                      <Badge tone={status === "Overdue" ? "danger" : status === "Transfer Requested" ? "warning" : "success"}>
                        {status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conflict Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border bg-muted/40 p-4">
              <p className="text-sm font-medium">Laptop AF-0114 is currently held by Priya Nair.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                A second allocation will be blocked and routed into the transfer request workflow.
              </p>
              <Button className="mt-4 w-full" variant="secondary">
                Request Transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
