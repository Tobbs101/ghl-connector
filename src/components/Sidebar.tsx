import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import {
  ActivitySquare,
  Gauge,
  GitCompare,
  Home,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Traffic", icon: Gauge, path: "/traffic" },
  { label: "Mapping", icon: GitCompare, path: "/mapping" },
  { label: "Reports", icon: ActivitySquare, path: "/reports" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapseToggle: () => void;
  onCloseMobile: () => void;
}

const Sidebar = ({
  collapsed,
  mobileOpen,
  onCollapseToggle,
  onCloseMobile,
}: SidebarProps) => {
  const location = useLocation();

  const content = (
    <aside
      className={clsx(
        "relative z-50 flex h-full flex-col border-r border-slate-100 bg-white/95 backdrop-blur-xl transition-[width] duration-200",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between gap-2 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lumeo text-lg font-semibold text-white">
            L
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-slate-900">Lumeo</p>
              <p className="text-xs text-slate-500">Control Center</p>
            </div>
          )}
        </div>
        <button
          onClick={onCollapseToggle}
          className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:text-lumeo"
          aria-label="Toggle sidebar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m10 8-4 4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m14 16 4-4-4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <nav className="mt-4 flex flex-1 flex-col gap-2 px-3">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={onCloseMobile}
              className={clsx(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-lumeo text-white shadow-lg shadow-lumeo/30"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className={clsx("h-4 w-4", collapsed && "mx-auto")} />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="mt-auto px-4 pb-6">
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-4 text-xs text-slate-500">
            <p className="font-semibold text-slate-900">Staging queue</p>
            <p className="mt-1 text-2xl font-bold text-lumeo">128</p>
            <p>payloads waiting to sync</p>
          </div>
        </div>
      )}
    </aside>
  );

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onCloseMobile}
      />
      <div
        className={clsx(
          "fixed inset-y-0 z-50 flex lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "transition-transform duration-200 ease-in-out"
        )}
      >
        {content}
      </div>
    </>
  );
};

export default Sidebar;
