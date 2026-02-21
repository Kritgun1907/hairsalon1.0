/**
 * @file DashboardOverview.tsx
 * @description Shared "Overview" sub-page used by both Manager and Owner dashboards.
 *
 * Shows: welcome header, today's KPI cards, month-to-date charts.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useAuth } from "@/context/AuthContext";
import EmployeeLeaderboard from "@/components/analytics/EmployeeLeaderboard";
import TopServices from "@/components/analytics/TopServices";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

interface SummaryData {
  totalRevenue: number;
  totalVisits: number;
}

export default function DashboardOverview() {
  const { user } = useAuth();

  const today = dayjs().format("YYYY-MM-DD");
  const monthStart = dayjs().startOf("month").format("YYYY-MM-DD");

  const [todayStats, setTodayStats] = useState<SummaryData | null>(null);
  const [monthStats, setMonthStats] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/api/analytics/summary?from=${today}&to=${today}`, { credentials: "include" })
        .then((r) => (r.ok ? r.json() : null)),
      fetch(`${API}/api/analytics/summary?from=${monthStart}&to=${today}`, { credentials: "include" })
        .then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([tData, mData]) => {
        setTodayStats(tData);
        setMonthStats(mData);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [today, monthStart]);

  const qs = `from=${monthStart}&to=${today}`;

  const cards = [
    { label: "Today's Revenue", value: todayStats ? `₹${todayStats.totalRevenue.toLocaleString("en-IN")}` : "—" },
    { label: "Today's Bookings", value: todayStats ? String(todayStats.totalVisits) : "—" },
    { label: "This Month's Revenue", value: monthStats ? `₹${monthStats.totalRevenue.toLocaleString("en-IN")}` : "—" },
  ];

  return (
    <>
      {/* Welcome header */}
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-black text-stone-900 tracking-tight"
        >
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </motion.h2>
        <p className="text-stone-500 mt-1 text-sm">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-stone-100 rounded-2xl h-32" />
            ))
          : cards.map((c, index) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  {c.label}
                </p>
                <p className="text-3xl font-black text-stone-900">{c.value}</p>
              </motion.div>
            ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-6">
        <EmployeeLeaderboard api={API} qs={qs} />
        <TopServices api={API} qs={qs} />
      </div>
    </>
  );
}
