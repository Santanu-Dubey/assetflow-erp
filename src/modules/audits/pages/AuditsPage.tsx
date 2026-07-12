import { FormEvent } from "react";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { useErpStore } from "@/common/store/erpStore";

export function AuditsPage() {
  const { audits, assets, employees, createAudit, markAuditItem, closeAudit } = useErpStore();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    createAudit({ name: String(form.get("name")), scope: String(form.get("scope")), auditorIds: [String(form.get("auditorId"))] });
    event.currentTarget.reset();
  };

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
          <CardTitle>Audit Cycles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-3" onSubmit={onSubmit}>
            <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="name" placeholder="Audit cycle name" required />
            <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="scope" placeholder="Scope: department or location" required />
            <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="auditorId">{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select>
            <Button className="w-full" type="submit">Create Audit</Button>
          </form>
          {audits.map((audit) => (
            <div className="rounded-md border border-border p-3" key={audit.id}>
              <div className="flex items-center justify-between"><span className="text-sm font-medium">{audit.name}</span><Badge tone={audit.status === "CLOSED" ? "neutral" : "info"}>{audit.status}</Badge></div>
              <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
                {audit.items.slice(0, 6).map((item) => (
                  <div className="grid gap-2 rounded-md bg-muted/40 p-2 text-xs" key={item.assetId}>
                    <span>{assets.find((asset) => asset.id === item.assetId)?.tag} - {item.status}</span>
                    <div className="flex flex-wrap gap-2">
                      <Button className="h-7" onClick={() => markAuditItem(audit.id, item.assetId, "VERIFIED")}>Verified</Button>
                      <Button className="h-7" variant="outline" onClick={() => markAuditItem(audit.id, item.assetId, "MISSING", "Missing during audit")}>Missing</Button>
                      <Button className="h-7" variant="secondary" onClick={() => markAuditItem(audit.id, item.assetId, "DAMAGED", "Damaged during audit")}>Damaged</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-3 w-full" variant="outline" onClick={() => closeAudit(audit.id)}>Close Cycle</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
