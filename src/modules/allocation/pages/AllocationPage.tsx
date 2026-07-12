import { ArrowRightLeft, RotateCcw } from "lucide-react";
import { FormEvent, useState } from "react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useErpStore } from "@/common/store/erpStore";

export function AllocationPage() {
  const [message, setMessage] = useState("");
  const { assets, employees, departments, allocations, transfers, allocateAsset, returnAsset, requestTransfer, approveTransfer, rejectTransfer } = useErpStore();
  const activeAllocations = allocations.filter((allocation) => !allocation.returnedAt);

  const onAllocate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = allocateAsset({
      assetId: String(form.get("assetId")),
      employeeId: String(form.get("employeeId") || ""),
      departmentId: String(form.get("departmentId") || ""),
      expectedReturnDate: String(form.get("expectedReturnDate")),
    });
    setMessage(result.message);
    if (result.ok) event.currentTarget.reset();
  };

  const onTransfer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    requestTransfer({
      allocationId: String(form.get("allocationId")),
      toEmployeeId: String(form.get("toEmployeeId") || ""),
      reason: String(form.get("reason")),
    });
    setMessage("Transfer request created.");
    event.currentTarget.reset();
  };

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
      {message ? <div className="mb-4 rounded-md border border-border bg-card p-3 text-sm">{message}</div> : null}
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
                {activeAllocations.map((allocation) => {
                  const asset = assets.find((item) => item.id === allocation.assetId);
                  const status = allocation.expectedReturnDate < new Date().toISOString().slice(0, 10) ? "Overdue" : "Active";
                  return (
                  <tr key={allocation.id}>
                    <td className="px-5 py-4 font-mono text-xs font-semibold">{asset?.tag}</td>
                    <td className="px-5 py-4">{employees.find((item) => item.id === allocation.employeeId)?.name ?? "-"}</td>
                    <td className="px-5 py-4">{departments.find((item) => item.id === allocation.departmentId)?.name ?? "-"}</td>
                    <td className="px-5 py-4">{allocation.expectedReturnDate}</td>
                    <td className="px-5 py-4">
                      <Badge tone={status === "Overdue" ? "danger" : "success"}>
                        {status}
                      </Badge>
                      <Button className="ml-2 h-8" variant="outline" onClick={() => returnAsset(allocation.id, "Returned from allocation page")}>Return</Button>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Workflows</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <form className="space-y-3" onSubmit={onAllocate}>
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="assetId">{assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.tag} - {asset.name}</option>)}</select>
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="employeeId"><option value="">Employee</option>{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select>
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="departmentId"><option value="">Department</option>{departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}</select>
              <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="expectedReturnDate" type="date" required />
              <Button className="w-full" type="submit">Allocate</Button>
            </form>
            <form className="space-y-3 border-t border-border pt-4" onSubmit={onTransfer}>
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="allocationId">{activeAllocations.map((allocation) => <option key={allocation.id} value={allocation.id}>{assets.find((asset) => asset.id === allocation.assetId)?.tag}</option>)}</select>
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="toEmployeeId">{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select>
              <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="reason" placeholder="Transfer reason" required />
              <Button className="w-full" variant="secondary" type="submit">Request Transfer</Button>
            </form>
            {transfers.map((transfer) => <div className="rounded-md border border-border p-3 text-sm" key={transfer.id}>{transfer.reason}<div className="mt-2 flex gap-2"><Badge tone="warning">{transfer.status}</Badge>{transfer.status === "REQUESTED" ? <><Button className="h-8" onClick={() => approveTransfer(transfer.id)}>Approve</Button><Button className="h-8" variant="outline" onClick={() => rejectTransfer(transfer.id)}>Reject</Button></> : null}</div></div>)}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
