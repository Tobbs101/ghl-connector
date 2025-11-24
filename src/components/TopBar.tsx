import { Bell, LogOut, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

interface TopBarProps {
  onMenuClick: () => void;
  onLogout: () => void;
  collapsed: boolean;
  onCollapseToggle: () => void;
}

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/traffic": "Live Traffic",
  "/mapping": "Payload Mapping",
  "/reports": "Reports",
  "/settings": "Settings",
};

const TopBar = ({
  onMenuClick,
  onLogout,
  collapsed,
  onCollapseToggle,
}: TopBarProps) => {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/70 px-4 py-4 backdrop-blur-xl lg:px-10">
      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 p-2 text-slate-600 lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Lumeo
          </p>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* <button
          onClick={onCollapseToggle}
          className="hidden rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-lumeo lg:inline-flex"
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button> */}
        <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:text-lumeo">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </button>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-2xl bg-lumeo px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
