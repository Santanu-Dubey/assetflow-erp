import { Mail, ShieldCheck, UserCircle } from "lucide-react";
import { FormEvent } from "react";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useAuthStore } from "@/common/store/authStore";
import { useErpStore } from "@/common/store/erpStore";

export function ProfilePage() {
  const user = useAuthStore((state) => state.currentUser);
  const { settings, updateSettings } = useErpStore();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateSettings({ theme: form.get("theme") as "LIGHT" | "DARK" | "SYSTEM", compactMode: form.get("compactMode") === "on" });
  };

  if (!user) {
    return null;
  }

  return (
    <ModuleOverview
      title="Profile & Preferences"
      description="Authenticated user profile, role context, department context, and personal application preferences without owning auth."
      metrics={[
        { label: "Role", value: user.role.replace("_", " "), tone: "info" },
        { label: "Preferences", value: "Ready", tone: "success" },
        { label: "Shortcuts", value: "Ctrl+K", tone: "warning" },
        { label: "Session", value: "Active", tone: "success" },
      ]}
      workflows={[
        "Profile data consumed from pluggable authentication context",
        "Personal theme and notification preferences",
        "Role and department display without self-elevation",
        "Future profile API surface for avatar and preference persistence",
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>User Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <form className="space-y-3 rounded-md border border-border p-3" onSubmit={onSubmit}>
            <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" name="theme" defaultValue={settings.theme}><option>LIGHT</option><option>DARK</option><option>SYSTEM</option></select>
            <label className="flex items-center gap-2 text-sm"><input defaultChecked={settings.compactMode} name="compactMode" type="checkbox" /> Compact mode</label>
            <Button type="submit">Save Preferences</Button>
          </form>
          {[
            [UserCircle, user.name],
            [Mail, user.email],
            [ShieldCheck, user.role.replace("_", " ")],
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
