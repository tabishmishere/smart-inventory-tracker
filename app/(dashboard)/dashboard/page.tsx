"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { ProductForm } from "@/app/features/inventory/components/ProductForm";
import { useInventory } from "@/app/features/inventory/hooks/useInventory";

export default function DashboardPage() {
  const { items, addItem } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = items.length;
  const expiringSoon = items.filter(i => i.expiry.includes("Days Left") && parseInt(i.expiry) < 7).length;
  const criticalAlerts = items.filter(i => i.quantity === 0).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-1 md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2">
            Inventory Overview
          </h1>
          <p className="text-on-surface-variant text-sm font-medium">
            Here's what's happening with your stock today.
          </p>
        </div>
        
        {/* Glassmorphic Add Item CTA Action */}
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 rounded-[2rem] bg-primary text-on-primary hover:bg-primary-container font-semibold cursor-pointer px-6 py-6 shadow-[0_0_20px_rgba(173,198,255,0.15)] transition-all"
        >
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
            <h2 className="text-[3.5rem] leading-none font-bold text-white mb-1">{totalItems.toLocaleString()}</h2>
            <p className="text-xs text-secondary font-medium">Tracking across all categories</p>
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
            <h2 className="text-[3.5rem] leading-none font-bold text-white mb-1">{expiringSoon}</h2>
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
            <h2 className={`text-[3.5rem] leading-none font-bold text-white mb-1 ${criticalAlerts > 0 ? 'text-destructive' : ''}`}>{criticalAlerts}</h2>
            <p className="text-xs text-on-surface-variant font-medium">Items out of stock</p>
          </div>
        </Card>

        {/* Metric 4 */}
        <Card className="bg-[linear-gradient(135deg,rgba(173,198,255,0.05)_0%,rgba(76,215,246,0.1)_100%)] border border-outline-variant/30 rounded-[1.5rem] p-6 shadow-none flex flex-col justify-center items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <CheckCircle size={20} className="text-primary" />
          </div>
          <h3 className="text-white font-bold text-lg mb-1">{criticalAlerts === 0 ? "System Healthy" : "Action Needed"}</h3>
          <p className="text-xs text-on-surface-variant">Last sync: Just now</p>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Column: Expiry Heatmap & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex justify-between items-end mb-4 pr-2">
              <h3 className="text-xl font-bold text-white">The Expiry Heatmap</h3>
              <Button variant="ghost" className="text-secondary text-sm font-medium hover:bg-transparent hover:text-white p-0 h-auto">
                View All
              </Button>
            </div>
            <Card className="bg-surface-container-highest border-none rounded-[1.5rem] overflow-hidden shadow-none p-2">
              <div className="flex flex-col gap-2">
                {items.slice(0, 5).map((item, idx) => {
                  const daysLeft = parseInt(item.expiry) || 0;
                  const percentage = Math.min(100, Math.max(0, (daysLeft / 30) * 100));
                  const status = daysLeft < 3 ? "Critical" : daysLeft < 10 ? "Warning" : "Safe";
                  const color = status === "Critical" ? "bg-destructive" : status === "Warning" ? "bg-orange-500" : "bg-primary";

                  return (
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
                            status === "Safe" ? "bg-primary/20 text-primary" : 
                            status === "Critical" ? "bg-destructive/20 text-destructive" :
                            "bg-secondary/20 text-secondary"
                          }`}>
                            {item.expiry}
                          </Badge>
                        </div>
                      </div>

                      <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${color} transition-all duration-1000 ease-in-out`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Quick Add Item"
      >
        <ProductForm 
          onSubmit={(data) => {
            addItem(data);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)}
          showPrice={false}
        />
      </Modal>
    </div>
  );
}