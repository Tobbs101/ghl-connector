import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Traffic from "./pages/Traffic";
import Mapping from "./pages/Mapping";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./components/Login";
import Admin from "./pages/Admin";

type Credentials = {
  username: string;
  password: string;
};

const App = () => {
  const rememberedAuth = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.sessionStorage.getItem("lumeo-authenticated") === "true";
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(rememberedAuth);

  const handleAuthenticate = ({ username, password }: Credentials) => {
    const normalizedUser = username.trim().toLowerCase();
    const isValid = normalizedUser === "admin" && password === "admin";

    if (isValid) {
      setIsAuthenticated(true);
      window.sessionStorage.setItem("lumeo-authenticated", "true");
      return true;
    }

    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.sessionStorage.removeItem("lumeo-authenticated");
  };

  if (!isAuthenticated) {
    return <Login onAuthenticate={handleAuthenticate} />;
  }

  return (
    <BrowserRouter>
      <AppLayout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/users" element={<Admin />} />
          <Route path="/mapping" element={<Mapping />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
