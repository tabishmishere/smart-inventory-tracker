"use client";

import React from "react";
import { AlertsList } from "@/app/features/alerts/components/AlertsList";

export default function AlertsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2">
          Stock Alerts
        </h1>
        <p className="text-on-surface-variant text-sm font-medium">
          Monitor items that require replenishment or immediate attention.
        </p>
      </div>

      <AlertsList />
    </div>
  );
}
