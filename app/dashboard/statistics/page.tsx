"use client";

import { StatisticsContent } from "@/components/statistics/statistics-content";

export default function StatisticsPage() {
  return (
    <div className="h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium">Statistics</h1>
      </div>

      {/* Main Content */}
      <div className="pt-3">
        <StatisticsContent />
      </div>
    </div>
  );
}
