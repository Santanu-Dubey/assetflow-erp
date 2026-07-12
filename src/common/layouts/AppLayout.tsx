import { LogOut, Menu, Moon, Search, Sun } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CommandPalette } from "@/common/components/CommandPalette";
import { navigationItems } from "@/common/constants/navigation";
import { useAuthStore } from "@/common/store/authStore";
import { useThemeStore } from "@/common/store/themeStore";
import { Sidebar } from "@/common/layouts/Sidebar";
import { Button } from "@/common/components/ui/Button";

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const activeItem = navigationItems.find((item) => location.pathname.startsWith(item.path));

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Button className="h-9 w-9 px-0 lg:hidden" variant="ghost" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">AssetFlow / {activeItem?.label ?? "Workspace"}</p>
                <h1 className="truncate text-lg font-semibold">{activeItem?.label ?? "Workspace"}</h1>
              </div>
            </div>
            <div className="hidden w-full max-w-sm items-center rounded-md border border-border bg-card px-3 sm:flex">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                className="h-10 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Search or press Ctrl+K"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button className="h-9 w-9 px-0" variant="outline" onClick={toggleMode} aria-label="Toggle theme">
                {mode === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <div className="min-w-0 text-right">
                <p className="truncate text-sm font-medium">{currentUser?.name}</p>
                <p className="truncate text-xs text-muted-foreground">{currentUser?.role.replace("_", " ")}</p>
              </div>
              <Button
                className="h-9 w-9 px-0"
                variant="ghost"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
