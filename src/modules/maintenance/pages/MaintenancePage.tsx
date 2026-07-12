import { FormEvent } from "react";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useErpStore } from "@/common/store/erpStore";

export function MaintenancePage() {
  const { assets, maintenance, createMaintenance, updateMaintenanceStatus } = useErpStore();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    createMaintenance({
      assetId: String(form.get("assetId")),
      issue: String(form.get("issue")),
      priority: form.get("priority") as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      technician: String(form.get("technician") || ""),
    });
    event.currentTarget.reset();
  };

  return (
    <ModuleOverview
      title="Maintenance Management"
      description="Raise repair requests, approve work, assign technicians, track progress, capture comments, and retain maintenance history."
      metrics={[
        { label: "Open Requests", value: "18", tone: "warning" },
        { label: "Awaiting Approval", value: "7", tone: "danger" },
        { label: "In Progress", value: "9", tone: "info" },
        { label: "Resolved This Month", value: "42", tone: "success" },
      ]}
      workflows={[
        "Maintenance request intake with priority, issue description, and attachments",
        "Approval workflow before assets move to Under Maintenance",
        "Technician assignment, progress status, comments, and resolution notes",
        "Asset-level maintenance timeline and dashboard alerts",
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <form className="space-y-3" onSubmit={onSubmit}>
            <select className="w-full rounded-md border border-border bg-background px-3 py-2" name="assetId">{assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.tag} - {asset.name}</option>)}</select>
            <input className="w-full rounded-md border border-border bg-background px-3 py-2" name="issue" placeholder="Issue" required />
            <select className="w-full rounded-md border border-border bg-background px-3 py-2" name="priority"><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>CRITICAL</option></select>
            <input className="w-full rounded-md border border-border bg-background px-3 py-2" name="technician" placeholder="Technician optional" />
            <Button className="w-full" type="submit">Raise Request</Button>
          </form>
          {maintenance.map((request) => (
            <div className="rounded-md border border-border p-3" key={request.id}>
              <div className="flex items-center justify-between gap-2"><span>{assets.find((asset) => asset.id === request.assetId)?.tag} - {request.issue}</span><Badge tone="warning">{request.status}</Badge></div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button className="h-8" onClick={() => updateMaintenanceStatus(request.id, "APPROVED")}>Approve</Button>
                <Button className="h-8" variant="outline" onClick={() => updateMaintenanceStatus(request.id, "REJECTED")}>Reject</Button>
                <Button className="h-8" variant="secondary" onClick={() => updateMaintenanceStatus(request.id, "IN_PROGRESS")}>Start</Button>
                <Button className="h-8" variant="outline" onClick={() => updateMaintenanceStatus(request.id, "RESOLVED", { resolution: "Resolved from dashboard" })}>Resolve</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
