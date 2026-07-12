import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent } from "@/common/components/ui/Card";
import { useErpStore } from "@/common/store/erpStore";

const tabs = ["Departments", "Asset Categories", "Employee Directory"];

export function OrganizationPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { departments, employees, categories, addDepartment, addEmployee, addCategory } = useErpStore();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (activeTab === "Departments") {
      addDepartment({ name: String(form.get("name")), headId: String(form.get("headId") || ""), parentId: String(form.get("parentId") || ""), status: "ACTIVE" });
    }
    if (activeTab === "Asset Categories") {
      addCategory({ name: String(form.get("name")), description: String(form.get("description")), dynamicFields: String(form.get("fields")).split(",").map((item) => item.trim()).filter(Boolean), status: "ACTIVE" });
    }
    if (activeTab === "Employee Directory") {
      addEmployee({ name: String(form.get("name")), email: String(form.get("email")), departmentId: String(form.get("departmentId")), role: String(form.get("role")), status: "ACTIVE" });
    }
    event.currentTarget.reset();
  };

  return (
    <>
      <PageHeader
        title="Organization Setup"
        description="Admin-only master data for departments, category metadata, and role assignment independent from authentication."
        actions={<Button icon={<Plus className="h-4 w-4" />}>Create {activeTab.slice(0, -1)}</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button key={tab} variant={activeTab === tab ? "primary" : "outline"} onClick={() => setActiveTab(tab)}>
            {tab}
          </Button>
        ))}
      </div>
      <Card className="mb-6">
        <CardContent>
          <form className="grid gap-3 md:grid-cols-4" onSubmit={onSubmit}>
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="name" placeholder={activeTab === "Employee Directory" ? "Employee name" : "Name"} required />
            {activeTab === "Departments" ? (
              <>
                <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="headId">
                  <option value="">Department head</option>
                  {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
                </select>
                <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="parentId">
                  <option value="">Parent department</option>
                  {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
                </select>
              </>
            ) : null}
            {activeTab === "Asset Categories" ? (
              <>
                <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="description" placeholder="Description" required />
                <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="fields" placeholder="Dynamic fields, comma separated" />
              </>
            ) : null}
            {activeTab === "Employee Directory" ? (
              <>
                <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="email" placeholder="Email" type="email" required />
                <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="departmentId" required>
                  {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
                </select>
                <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="role">
                  <option>EMPLOYEE</option>
                  <option>DEPARTMENT_HEAD</option>
                  <option>ASSET_MANAGER</option>
                </select>
              </>
            ) : null}
            <Button className="md:col-start-4" type="submit">Save</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Head</th>
                <th className="px-5 py-3">Parent</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Employees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {activeTab === "Departments" && departments.map((department) => (
                <tr key={department.id}>
                  <td className="px-5 py-4 font-medium">{department.name}</td>
                  <td className="px-5 py-4">{employees.find((item) => item.id === department.headId)?.name ?? "Unassigned"}</td>
                  <td className="px-5 py-4">{departments.find((item) => item.id === department.parentId)?.name ?? "-"}</td>
                  <td className="px-5 py-4">
                    <Badge tone={department.status === "ACTIVE" ? "success" : "neutral"}>{department.status}</Badge>
                  </td>
                  <td className="px-5 py-4">{employees.filter((employee) => employee.departmentId === department.id).length}</td>
                </tr>
              ))}
              {activeTab === "Asset Categories" && categories.map((category) => (
                <tr key={category.id}><td className="px-5 py-4 font-medium">{category.name}</td><td className="px-5 py-4">{category.description}</td><td className="px-5 py-4">{category.dynamicFields.join(", ") || "-"}</td><td className="px-5 py-4"><Badge tone="success">{category.status}</Badge></td><td className="px-5 py-4">Dynamic</td></tr>
              ))}
              {activeTab === "Employee Directory" && employees.map((employee) => (
                <tr key={employee.id}><td className="px-5 py-4 font-medium">{employee.name}</td><td className="px-5 py-4">{employee.email}</td><td className="px-5 py-4">{departments.find((item) => item.id === employee.departmentId)?.name}</td><td className="px-5 py-4"><Badge tone="info">{employee.role}</Badge></td><td className="px-5 py-4">{employee.status}</td></tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
