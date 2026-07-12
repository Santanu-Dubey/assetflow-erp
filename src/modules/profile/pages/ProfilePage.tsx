import { Mail, ShieldCheck, UserCircle } from "lucide-react";
import { ModuleOverview } from "@/common/components/ModuleOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useAuthStore } from "@/common/store/authStore";

export function ProfilePage() {
  const user = useAuthStore((state) => state.currentUser);

  return (
    <ModuleOverview
      title="Profile & Preferences"
      description="Authenticated user profile, role context, department context, and personal application preferences without owning auth."
      metrics={[
        { label: "Role", value: user.role.replace("_", " "), tone: "info" },
        { label: "Preferences", value: "Ready", tone: "success" },
        { label: "Shortcuts", value: "Ctrl+K", tone: "warning" },
        { label: "Session", value: "Mocked", tone: "neutral" },
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
