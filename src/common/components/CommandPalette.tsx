import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigationItems } from "@/common/constants/navigation";
import { useAuthStore } from "@/common/store/authStore";
import { cn } from "@/common/utils/cn";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.currentUser.role);
  const items = navigationItems.filter(
    (item) => item.allowedRoles.includes(role) && item.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div
        className="mx-auto mt-24 max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-soft"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search modules, actions, reports"
            value={query}
          />
          <kbd className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">Esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={cn("flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm hover:bg-muted")}
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
