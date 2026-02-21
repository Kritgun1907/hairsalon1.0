/**
 * @file DashboardLayout.tsx
 * @description Full-page layout with fixed left sidebar + scrollable main area.
 *
 * Used by ManagerDashboard and OwnerDashboard — NOT by public pages.
 * Sidebar links and page title are passed as props so both roles share
 * the same layout shell with different navigation.
 */

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// ── Types ────────────────────────────────────────────────────────────────────
interface SidebarLink {
  to: string;
  label: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarLinks: SidebarLink[];
  pageTitle: string;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function DashboardLayout({
  children,
  sidebarLinks,
  pageTitle,
}: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <div style={{ backgroundColor: "#faf8f4" }} className="flex min-h-screen">
      {/* ── Sidebar ── */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-64 fixed left-0 top-0 h-full bg-stone-900 flex flex-col z-40"
      >
        {/* Branding */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-stone-800 shrink-0">
          <img
            src="/experts-hair-05.jpg"
            alt="The Experts"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="text-white font-bold text-base tracking-tight">
            The Experts
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-3 space-y-1">
            {sidebarLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to.split("/").length <= 3}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white bg-amber-600 font-medium text-sm"
                    : "flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 font-medium text-sm transition-all duration-150"
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sign-out */}
        <div className="shrink-0 p-3 border-t border-stone-800">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 hover:text-red-400 hover:bg-stone-800 font-medium text-sm transition-all duration-150 w-full"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top bar */}
        <header
          className="h-16 sticky top-0 z-30 flex items-center justify-between px-8"
          style={{
            background: "rgba(255,255,255,0.90)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <h1 className="text-xl font-bold text-stone-900">{pageTitle}</h1>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center uppercase">
              {user?.name?.charAt(0) ?? "?"}
            </div>
            <span className="text-sm font-medium text-stone-700">
              {user?.name}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
