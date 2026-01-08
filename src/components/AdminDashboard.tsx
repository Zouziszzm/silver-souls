"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { SystemStats } from "@/lib/api";
import { BookMarked, PenLine, Award } from "lucide-react";

interface AdminDashboardProps {
  stats: SystemStats;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export const AdminDashboard = ({ stats }: AdminDashboardProps) => {
  return (
    <div className="space-y-12">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-ash-white p-6 rounded-xl border border-muted-silver/60 text-center hover:shadow-sm transition-shadow">
          <p className="text-sm text-ink-gray/60 mb-1 font-sans uppercase tracking-widest">
            Total Slivers
          </p>
          <p className="text-4xl font-serif text-slate-blue-gray">
            {stats.totalSlivers.toLocaleString()}
          </p>
        </div>
        <div className="bg-ash-white p-6 rounded-xl border border-muted-silver/60 text-center hover:shadow-sm transition-shadow">
          <p className="text-sm text-ink-gray/60 mb-1 font-sans uppercase tracking-widest">
            Active Authors
          </p>
          <p className="text-4xl font-serif text-slate-blue-gray">
            {stats.totalAuthors.toLocaleString()}
          </p>
        </div>
        <div className="bg-ash-white p-6 rounded-xl border border-muted-silver/60 text-center hover:shadow-sm transition-shadow">
          <p className="text-sm text-ink-gray/60 mb-1 font-sans uppercase tracking-widest">
            Reports
          </p>
          <p className="text-4xl font-serif text-antique-gold">
            {stats.pendingReports}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Type Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-muted-silver/40 shadow-sm">
          <h3 className="text-xl font-serif text-slate-blue-gray mb-6">
            Archive Composition
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.typeDistribution}>
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stats.typeDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Trend */}
        <div className="bg-white p-8 rounded-2xl border border-muted-silver/40 shadow-sm">
          <h3 className="text-xl font-serif text-slate-blue-gray mb-6">
            Weekly Resonance
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.activity}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[#fffcf6] border border-muted-silver rounded-xl p-8">
        <h3 className="text-xl font-serif text-slate-blue-gray mb-4">
          System Status
        </h3>
        <p className="text-ink-gray italic mb-6">
          "The void hums with activity."
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-muted-silver/30">
            <div>
              <span className="font-bold text-slate-blue-gray">
                Like System
              </span>
              <p className="text-xs text-ink-gray/60">Operational</p>
            </div>
            <span className="text-green-600 text-sm font-semibold">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-muted-silver/30">
            <div>
              <span className="font-bold text-slate-blue-gray">
                Save System
              </span>
              <p className="text-xs text-ink-gray/60">Operational</p>
            </div>
            <span className="text-green-600 text-sm font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
