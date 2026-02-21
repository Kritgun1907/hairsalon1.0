/**
 * @file ServicesView.tsx
 * @description Read-only display of service categories and the service catalogue.
 *
 * Fetches GET /api/form-data and renders two sections:
 *   1. Service categories as amber pills
 *   2. Full service catalogue as a card grid with prices
 *
 * Shared by both Manager and Owner dashboards.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

interface ServiceType {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

interface FormData {
  serviceTypes: ServiceType[];
  services: Service[];
}

export default function ServicesView() {
  const [data, setData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/form-data`, { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => setData({ serviceTypes: d.serviceTypes, services: d.services }))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-stone-100 rounded-2xl h-24" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-stone-100 rounded-xl h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <p className="text-stone-400 text-center py-16">
        Failed to load services. Check your connection.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-stone-900">Service Types</h2>
        <p className="text-sm text-stone-500 mt-0.5">
          Services offered at The Experts
        </p>
      </div>

      {/* Section 1 — Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {data.serviceTypes.map((st) => (
            <span
              key={st.id}
              className="px-4 py-2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-sm font-medium"
            >
              {st.name}
            </span>
          ))}
        </div>
      </div>

      {/* Section 2 — Catalogue */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-stone-800 mb-4">All Services</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {data.services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-sm"
            >
              <p className="font-semibold text-stone-900 text-sm">
                {service.name}
              </p>
              <p className="text-amber-600 font-bold text-lg mt-1">
                ₹{service.price.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
