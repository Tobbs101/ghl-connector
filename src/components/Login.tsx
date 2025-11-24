import { FormEvent, useState } from "react";

interface LoginProps {
  onAuthenticate: (credentials: {
    username: string;
    password: string;
  }) => boolean;
}

const Login = ({ onAuthenticate }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = onAuthenticate({ username, password });

    if (!success) {
      setError("Use admin/admin to enter the Lumeo control center.");
      return;
    }

    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-xl shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex flex-col justify-between bg-lumeo px-10 py-12 text-white">
          <div>
            <div className="mb-10 inline-flex items-center gap-3 text-lg font-semibold">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 text-2xl font-bold">
                L
              </div>
              Lumeo
            </div>
            <h1 className="text-3xl font-semibold leading-tight lg:text-4xl">
              Route every payload with confidence.
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/80">
              Securely stage data from any source before syncing to Go High
              Level. Audit events, replay traffic, and control the flow without
              touching a CLI.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
              Zero-code routing presets for your teams.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              Real-time traceability on every request.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Automated failover and replays.
            </li>
          </ul>
        </div>
        <div className="bg-white px-10 py-12">
          <div className="mb-8">
            <p className="text-sm text-center font-semibold uppercase tracking-widest text-slate-500">
              Welcome back
            </p>
            <h2 className="text-2xl text-center font-semibold text-slate-900">
              Sign in to manage your flows
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Username and password are both{" "}
              <span className="font-semibold">admin</span> for now.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 placeholder:text-sm text-[16px] px-4 py-3 text-slate-900 focus:border-lumeo focus:outline-none focus:ring-2 focus:ring-lumeo/20"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 placeholder:text-sm text-[16px] py-3 text-slate-900 focus:border-lumeo focus:outline-none focus:ring-2 focus:ring-lumeo/20"
                placeholder="admin"
                required
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-rose-500" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-2xl bg-lumeo py-3 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumeo"
            >
              Sign In
            </button>
          </form>
          {/* <p className="mt-6 text-center text-xs text-slate-400">
            Lumeo © {new Date().getFullYear()} • Secure by design
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
