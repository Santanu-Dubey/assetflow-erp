import { Bell, Building2, Palette, SlidersHorizontal } from "lucide-react";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

export function SettingsPage() {
  return (
    <ModuleOverview
      title="Settings"
      description="Configure application preferences, theme behavior, notification rules, and system-level ERP defaults."
      metrics={[
        { label: "Preference Groups", value: "6", tone: "info" },
        { label: "Theme Modes", value: "2", tone: "success" },
        { label: "Notification Rules", value: "18", tone: "warning" },
        { label: "Admin Controls", value: "Ready", tone: "success" },
      ]}
      workflows={[
        "General application settings and organization defaults",
        "Theme and density preferences",
        "Notification preferences by event type",
        "Future-ready system preferences for SaaS and RBAC",
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>Preference Areas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            [SlidersHorizontal, "General"],
            [Building2, "Departments and categories"],
            [Palette, "Theme and appearance"],
            [Bell, "Notifications"],
          ].map(([Icon, label]) => (
            <div className="flex items-center gap-3 rounded-md border border-border p-3" key={label as string}>
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-sm">{label as string}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModuleOverview>
  );
}
