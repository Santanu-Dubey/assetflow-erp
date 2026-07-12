import { MessageSquare, Paperclip, UserCheck, Wrench } from "lucide-react";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

export function MaintenancePage() {
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
          <CardTitle>Workflow Signals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {[
            [Wrench, "Asset status changes automatically after approval and resolution"],
            [UserCheck, "Asset Managers approve or reject requests"],
            [Paperclip, "Photo and document attachments are storage-abstraction ready"],
            [MessageSquare, "Comments and status events feed the activity log"],
          ].map(([Icon, text]) => (
            <div className="flex items-center gap-3 rounded-md border border-border p-3" key={text as string}>
              <Icon className="h-4 w-4 text-primary" />
              <span>{text as string}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
