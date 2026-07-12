import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useAuthStore } from "@/common/store/authStore";
import { useErpStore } from "@/common/store/erpStore";

export function SignupPage() {
  const [message, setMessage] = useState("");
  const signup = useAuthStore((state) => state.signup);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { departments, addEmployee } = useErpStore();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    const confirmPassword = String(form.get("confirmPassword"));

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const result = signup({
      name: `${String(form.get("firstName")).trim()} ${String(form.get("lastName")).trim()}`,
      email: String(form.get("email")),
      password,
      departmentId: String(form.get("departmentId")),
    });

    setMessage(result.message);

    if (result.ok && result.user) {
      addEmployee({
        name: result.user.name,
        email: result.user.email,
        departmentId: result.user.departmentId ?? departments[0]?.id,
        role: "EMPLOYEE",
        status: "ACTIVE",
      });
      navigate("/login", { replace: true });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Create Employee Account</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Signup never assigns admin or manager roles.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="firstName" placeholder="First name" required />
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="lastName" placeholder="Last name" required />
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2" name="email" placeholder="Email" type="email" required />
            <select className="rounded-md border border-border bg-background px-3 py-2 text-sm md:col-span-2" name="departmentId" required>
              {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
            </select>
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="password" placeholder="Password" type="password" required />
            <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="confirmPassword" placeholder="Confirm password" type="password" required />
            {message ? <p className="rounded-md bg-muted p-3 text-sm md:col-span-2">{message}</p> : null}
            <Button className="md:col-span-2" type="submit">Create Employee Account</Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account? <Link className="font-medium text-primary" to="/login">Login</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
