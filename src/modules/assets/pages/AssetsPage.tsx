import { Filter, Plus } from "lucide-react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent } from "@/common/components/ui/Card";

const assets = [
  ["AF-0001", "MacBook Pro 14", "Electronics", "Available", "HQ Floor 2"],
  ["AF-0114", "Dell Latitude", "Electronics", "Allocated", "Priya Nair"],
  ["AF-0220", "Room B2", "Meeting Room", "Reserved", "Facilities"],
  ["AF-0301", "Company Vehicle", "Vehicles", "Under Maintenance", "Garage"],
];

export function AssetsPage() {
  return (
    <>
      <PageHeader
        title="Asset Registration & Directory"
        description="Register assets with generated tags, lifecycle status, bookable flags, attachments, and searchable directory filters."
        actions={
          <>
            <Button variant="outline" icon={<Filter className="h-4 w-4" />}>
              Filters
            </Button>
            <Button icon={<Plus className="h-4 w-4" />}>Register Asset</Button>
          </>
        }
      />
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Asset Tag</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Location / Holder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {assets.map(([tag, name, category, status, location]) => (
                <tr key={tag}>
                  <td className="px-5 py-4 font-mono text-xs font-semibold">{tag}</td>
                  <td className="px-5 py-4 font-medium">{name}</td>
                  <td className="px-5 py-4">{category}</td>
                  <td className="px-5 py-4">
                    <Badge tone={status === "Available" ? "success" : status === "Under Maintenance" ? "warning" : "info"}>
                      {status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">{location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
