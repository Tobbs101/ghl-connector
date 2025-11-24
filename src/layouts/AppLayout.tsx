import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

interface AppLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const AppLayout = ({ children, onLogout }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleCollapse = () => setCollapsed((prev) => !prev);
  const handleCloseMobile = () => setMobileOpen(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapseToggle={handleToggleCollapse}
        onCloseMobile={handleCloseMobile}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          onMenuClick={() => setMobileOpen((prev) => !prev)}
          onLogout={onLogout}
          collapsed={collapsed}
          onCollapseToggle={handleToggleCollapse}
        />
        <main className="flex-1 min-w-0 overflow-y-auto px-4 py-6 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
