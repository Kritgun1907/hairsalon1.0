/**
 * @file ManagerDashboard.tsx
 * @description Manager's dashboard with sidebar nav and sub-routes.
 *
 * Routes:
 *   /dashboard/manager           → Overview (stats + charts)
 *   /dashboard/manager/analytics → Full analytics view
 *   /dashboard/manager/services  → Service catalogue (read-only)
 */

import { Routes, Route } from "react-router-dom";
import { LayoutDashboard, BarChart3, Scissors, CalendarPlus } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardOverview from "@/pages/dashboard/shared/DashboardOverview";
import DashboardAnalyticsView from "@/pages/dashboard/shared/DashboardAnalyticsView";
import ServicesView from "@/pages/dashboard/shared/ServicesView";

const managerLinks = [
  { to: "/dashboard/manager", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/manager/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/manager/services", label: "Service Types", icon: Scissors },
  { to: "/booking", label: "New Booking", icon: CalendarPlus },
];

export default function ManagerDashboard() {
  return (
    <DashboardLayout sidebarLinks={managerLinks} pageTitle="Manager Dashboard">
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="analytics" element={<DashboardAnalyticsView />} />
        <Route path="services" element={<ServicesView />} />
      </Routes>
    </DashboardLayout>
  );
}
