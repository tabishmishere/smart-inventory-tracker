"use strict";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-1 md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2 ml-4">
            Inventory Overview
          </h1>
          <p className="text-on-surface-variant text-sm ml-4 font-medium">
            Here's what's happening with your stock today.
          </p>
        </div>
        
        {/* Glassmorphic Add Item CTA Action */}
        <Button className="mt-4 md:mt-0 rounded-[2rem] bg-primary text-on-primary hover:bg-primary-container font-bold px-6 py-5 shadow-[0_0_20px_rgba(173,198,255,0.15)] transition-all">
          + Quick Add Item
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <Card className="bg-surface-container-highest border-none rounded-[1.5rem] p-6 shadow-none flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Total Items</p>
            <div className="h-8 w-8 rounded-full bg-surface-container flex items-center justify-center">
              <Package size={14} className="text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-[3.5rem] leading-none font-bold text-white mb-1">1,248</h2>
            <p className="text-xs text-secondary font-medium">+12% from last month</p>
          </div>
        </Card>

        {/* Metric 2 */}
        <Card className="bg-surface-container-highest border-none rounded-[1.5rem] p-6 shadow-none flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Expiring Soon</p>
            <div className="h-8 w-8 rounded-full bg-surface-container flex items-center justify-center">
              <Clock size={14} className="text-secondary" />
            </div>
          </div>
          <div>
            <h2 className="text-[3.5rem] leading-none font-bold text-white mb-1">24</h2>
            <p className="text-xs text-on-surface-variant font-medium">Requires attention this week</p>
          </div>
        </Card>

        {/* Metric 3 */}
        <Card className="bg-surface-container-highest border-none rounded-[1.5rem] p-6 shadow-none flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Critical Alerts</p>
            <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle size={14} className="text-destructive" />
            </div>
          </div>
          <div>
            <h2 className="text-[3.5rem] leading-none font-bold text-white mb-1 text-destructive">3</h2>
            <p className="text-xs text-on-surface-variant font-medium">Items already expired</p>
          </div>
        </Card>

        {/* Metric 4 */}
        <Card className="bg-[linear-gradient(135deg,rgba(173,198,255,0.05)_0%,rgba(76,215,246,0.1)_100%)] border border-outline-variant/30 rounded-[1.5rem] p-6 shadow-none flex flex-col justify-center items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <CheckCircle size={20} className="text-primary" />
          </div>
          <h3 className="text-white font-bold text-lg mb-1">System Healthy</h3>
          <p className="text-xs text-on-surface-variant">Last sync: 2 mins ago</p>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Column: Expiry Heatmap & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex justify-between items-end mb-4 ml-4 pr-2">
              <h3 className="text-xl font-bold text-white">The Expiry Heatmap</h3>
              <Button variant="ghost" className="text-secondary text-sm font-medium hover:bg-transparent hover:text-white p-0 h-auto">
                View All
              </Button>
            </div>
            <Card className="bg-surface-container-highest border-none rounded-[1.5rem] overflow-hidden shadow-none p-2">
              <div className="flex flex-col gap-2">
                {[
                  { name: "Organic Milk (1L)", id: "SKU-9920", daysLeft: 2, percentage: 5, color: "bg-destructive", status: "Critical" },
                  { name: "Sourdough Bread", id: "SKU-1024", daysLeft: 4, percentage: 15, color: "bg-orange-500", status: "Warning" },
                  { name: "Avocados (Box)", id: "SKU-4402", daysLeft: 8, percentage: 35, color: "bg-secondary", status: "Attention" },
                  { name: "Canned Tomatoes", id: "SKU-8821", daysLeft: 145, percentage: 90, color: "bg-primary", status: "Safe" },
                  { name: "Dry Pasta (Fusilli)", id: "SKU-1192", daysLeft: 310, percentage: 95, color: "bg-primary", status: "Safe" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-3 p-4 rounded-xl hover:bg-surface-container transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center border border-outline-variant/20">
                          <Package size={16} className="text-on-surface-variant"/>
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-on-surface-variant font-mono mt-0.5">{item.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <Badge variant="outline" className={`rounded-full border-none px-3 font-bold text-[10px] uppercase tracking-wider ${
                          item.status === "Safe" ? "bg-primary/20 text-primary" : 
                          item.status === "Critical" ? "bg-destructive/20 text-destructive" :
                          "bg-secondary/20 text-secondary"
                        }`}>
                          {item.daysLeft} Days Left
                        </Badge>
                      </div>
                    </div>

                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-in-out`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold text-white mb-4 ml-4">Recent Activity</h3>
            <div className="bg-surface-container-high rounded-[1.5rem] p-5 border border-outline-variant/10">
              <div className="flex flex-col gap-4">
                {[
                  { title: "Stock Replenished", desc: "Added 24x Almond Milk", time: "2 hrs ago", color: "text-primary" },
                  { title: "Expiry Alert Sent", desc: "Notification sent to Slack", time: "5 hrs ago", color: "text-secondary" },
                  { title: "Item Removed", desc: "3x Expired Yogurt Dumped", time: "1 day ago", color: "text-destructive" },
                ].map((act, idx) => (
                  <div key={idx} className="flex gap-4 p-3 rounded-xl bg-surface-container-lowest">
                    <div className="mt-1">
                      <div className={`h-2 w-2 rounded-full ${act.color} animate-pulse`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{act.title}</p>
                      <p className="text-xs text-on-surface-variant mt-1 mb-2">{act.desc}</p>
                      <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/20 relative overflow-hidden backdrop-blur-md">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
              <p className="text-xs text-on-surface-variant font-medium mb-6 leading-relaxed">
                Connect with our Smart Inventory API to automate your purchase orders directly.
              </p>
              
              <Button variant="outline" className="w-full rounded-xl bg-surface-container-highest border-outline-variant/50 text-white hover:bg-surface hover:text-white transition-all font-medium">
                View Documentation
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}