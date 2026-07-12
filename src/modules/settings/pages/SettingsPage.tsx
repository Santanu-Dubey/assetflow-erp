import { Bell, Building2, Palette, SlidersHorizontal } from "lucide-react";
import { FormEvent } from "react";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useErpStore } from "@/common/store/erpStore";

export function SettingsPage() {
  const { settings, updateSettings } = useErpStore();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateSettings({
      theme: form.get("theme") as "LIGHT" | "DARK" | "SYSTEM",
      compactMode: form.get("compactMode") === "on",
      bookingReminderMinutes: Number(form.get("bookingReminderMinutes") || 15),
    });
  };

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
          <form className="space-y-3 rounded-md border border-border p-3" onSubmit={onSubmit}>
            <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="theme" defaultValue={settings.theme}><option>LIGHT</option><option>DARK</option><option>SYSTEM</option></select>
            <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="bookingReminderMinutes" defaultValue={settings.bookingReminderMinutes} type="number" />
            <label className="flex items-center gap-2 text-sm"><input defaultChecked={settings.compactMode} name="compactMode" type="checkbox" /> Compact mode</label>
            <Button type="submit">Save Settings</Button>
          </form>
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
