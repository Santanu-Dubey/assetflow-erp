import { Filter, Plus } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent } from "@/common/components/ui/Card";
import { useErpStore } from "@/common/store/erpStore";

export function AssetsPage() {
  const [query, setQuery] = useState("");
  const { assets, categories, addAsset } = useErpStore();
  const visibleAssets = useMemo(
    () => assets.filter((asset) => `${asset.tag} ${asset.name} ${asset.serialNumber} ${asset.location}`.toLowerCase().includes(query.toLowerCase())),
    [assets, query],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addAsset({
      name: String(form.get("name")),
      categoryId: String(form.get("categoryId")),
      serialNumber: String(form.get("serialNumber")),
      acquisitionDate: String(form.get("acquisitionDate")),
      acquisitionCost: Number(form.get("acquisitionCost") || 0),
      condition: String(form.get("condition")),
      location: String(form.get("location")),
      bookable: form.get("bookable") === "on",
    });
    event.currentTarget.reset();
  };

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
      <Card className="mb-6">
        <CardContent>
          <form className="grid gap-3 md:grid-cols-4" onSubmit={onSubmit}>
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="name" placeholder="Asset name" required />
            <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="categoryId" required>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="serialNumber" placeholder="Serial number" />
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="location" placeholder="Location" required />
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="condition" placeholder="Condition" required />
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="acquisitionDate" type="date" />
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="acquisitionCost" placeholder="Cost" type="number" />
            <label className="flex items-center gap-2 text-sm"><input name="bookable" type="checkbox" /> Bookable</label>
            <Button type="submit">Register Asset</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mb-4 flex gap-3">
        <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="Search tag, serial, QR, category, status, location" value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
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
              {visibleAssets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-5 py-4 font-mono text-xs font-semibold">{asset.tag}</td>
                  <td className="px-5 py-4 font-medium">{asset.name}</td>
                  <td className="px-5 py-4">{categories.find((category) => category.id === asset.categoryId)?.name}</td>
                  <td className="px-5 py-4">
                    <Badge tone={asset.status === "AVAILABLE" ? "success" : asset.status === "UNDER_MAINTENANCE" ? "warning" : "info"}>
                      {asset.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">{asset.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
