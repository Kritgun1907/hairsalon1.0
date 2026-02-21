/**
 * @file OwnerDashboard.tsx
 * @description Owner's dashboard with sidebar nav and sub-routes.
 *
 * Routes:
 *   /dashboard/owner           → Overview (stats + charts)
 *   /dashboard/owner/analytics → Full analytics view
 *   /dashboard/owner/services  → Service catalogue (read-only)
 *   /dashboard/owner/team      → Team management (CRUD users)
 */

import { Routes, Route } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Scissors,
  Users,
  CalendarPlus,
} from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardOverview from "@/pages/dashboard/shared/DashboardOverview";
import DashboardAnalyticsView from "@/pages/dashboard/shared/DashboardAnalyticsView";
import ServicesView from "@/pages/dashboard/shared/ServicesView";
import TeamManagement from "@/pages/dashboard/TeamManagement";

const ownerLinks = [
  { to: "/dashboard/owner", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/owner/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/owner/services", label: "Service Types", icon: Scissors },
  { to: "/dashboard/owner/team", label: "Team", icon: Users },
  { to: "/booking", label: "New Booking", icon: CalendarPlus },
];

export default function OwnerDashboard() {
  return (
    <DashboardLayout sidebarLinks={ownerLinks} pageTitle="Owner Dashboard">
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="analytics" element={<DashboardAnalyticsView />} />
        <Route path="services" element={<ServicesView />} />
        <Route path="team" element={<TeamManagement />} />
      </Routes>
    </DashboardLayout>
  );
}
