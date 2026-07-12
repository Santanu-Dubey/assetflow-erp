import { ReactNode } from "react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

type ModuleOverviewProps = {
  title: string;
  description: string;
  workflows: string[];
  metrics: Array<{ label: string; value: string; tone?: "neutral" | "success" | "warning" | "danger" | "info" }>;
  children?: ReactNode;
};

export function ModuleOverview({ title, description, workflows, metrics, children }: ModuleOverviewProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_24rem]">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Surface</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {workflows.map((workflow) => (
              <div className="rounded-md border border-border bg-muted/30 p-4" key={workflow}>
                <Badge tone="info">Phase Ready</Badge>
                <p className="mt-3 text-sm font-medium">{workflow}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        {children}
      </section>
    </>
  );
}
