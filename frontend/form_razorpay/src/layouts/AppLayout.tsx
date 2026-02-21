/**
 * @file AppLayout.tsx
 * @description Shared layout shell for all main pages.
 *
 * Navbar: logo (left) · Home / About / Contact (center) · Sign In (right)
 * Sign In uses an animated gradient text (purple → amber → rose) matching
 */

import { Link, useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  subtitle?: string;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#faf8f4" }}>
      {/* ── Sticky navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
        style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="mx-auto max-w-7xl px-8 h-18 flex items-center justify-between">

          {/* ── Left: logo image ── */}
          <Link to="/" className="shrink-0 flex items-center gap-3 group">
            <img
              src="/experts-hair-05.jpg"
              alt="The Experts Hair Salon"
              className="h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ring-black/8 group-hover:ring-black/20 transition-all duration-200"
            />
            <span className="text-lg font-bold text-stone-800 tracking-tight hidden sm:block">
              The Experts
            </span>
          </Link>

          {/* ── Center: nav links ── */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`
                  px-4.5 py-2 rounded-md text-lg font-medium tracking-wide
                  transition-colors duration-150
                  ${pathname === to
                    ? "text-stone-900 bg-stone-100"
                    : "text-stone-600 hover:text-black hover:bg-stone-100/70"
                  }
                `}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right: Book Appointment (gradient when active) + Sign In ── */}
          <div className="shrink-0 flex items-center gap-5">
            <Link to="/booking">
              {pathname === "/booking" ? (
                <span
                  className="text-lg font-semibold tracking-wide cursor-pointer select-none transition-all duration-200"
                  style={{
                    background: "linear-gradient(90deg, #a855f7 0%, #f59e0b 50%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% auto",
                    animation: "gradientShift 3s linear infinite",
                  }}
                >
                  Book Appointment
                </span>
              ) : (
                <span
                  className="text-lg font-semibold tracking-wide cursor-pointer select-none transition-all duration-200"
                  style={{
                    background: "linear-gradient(90deg, #a855f7 0%, #f59e0b 50%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% auto",
                    animation: "gradientShift 3s linear infinite",
                  }}
                >
                  Book Appointment
                </span>
              )}
            </Link>

            <Link to="/signin" className="shrink-0">
              <span className={`text-lg font-semibold tracking-wide transition-colors duration-150 cursor-pointer select-none ${pathname === "/signin" ? "text-stone-900" : "text-stone-700 hover:text-stone-900"}`}>
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-18" />

      <main className="w-full">{children}</main>

      {/* Gradient keyframe — injected once via a style tag */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

