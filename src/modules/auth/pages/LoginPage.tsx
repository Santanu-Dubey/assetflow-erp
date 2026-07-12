import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Boxes, Lock, Mail } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useAuthStore } from "@/common/store/authStore";

type LocationState = {
  from?: string;
};

export function LoginPage() {
  const [message, setMessage] = useState("");
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? "/dashboard";

  if (isAuthenticated) {
    return <Navigate replace to={from} />;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = login({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    setMessage(result.message);

    if (result.ok) {
      navigate(from, { replace: true });
    }
  };

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1fr_32rem]">
      <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/15">
            <Boxes className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold">AssetFlow</p>
            <p className="text-sm text-primary-foreground/75">Enterprise Asset ERP</p>
          </div>
        </div>
        <div>
          <h1 className="max-w-xl text-4xl font-semibold">Secure access for every asset workflow.</h1>
          <p className="mt-4 max-w-lg text-primary-foreground/75">
            Login controls ERP access while role assignment remains managed by admins inside the employee directory.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login to AssetFlow</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <label className="block text-sm font-medium">
                Email
                <div className="mt-2 flex items-center gap-2 rounded-md border border-border bg-background px-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input className="h-10 flex-1 bg-transparent outline-none" name="email" type="email" required />
                </div>
              </label>
              <label className="block text-sm font-medium">
                Password
                <div className="mt-2 flex items-center gap-2 rounded-md border border-border bg-background px-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <input className="h-10 flex-1 bg-transparent outline-none" name="password" type="password" required />
                </div>
              </label>
              {message ? <p className="rounded-md bg-muted p-3 text-sm">{message}</p> : null}
              <Button className="w-full" type="submit">Login</Button>
            </form>
            <div className="mt-5 rounded-md bg-muted p-3 text-xs text-muted-foreground">
              Demo admin: `aarav@assetflow.local` / `admin123`
            </div>
            <p className="mt-5 text-center text-sm text-muted-foreground">
              New employee? <Link className="font-medium text-primary" to="/signup">Create account</Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
