"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertCircle, AlertTriangle } from "lucide-react";
import { useInventory } from "../../inventory/hooks/useInventory";

export function AlertsList() {
  const { items } = useInventory();

  const lowStock = items.filter(i => i.quantity > 0 && i.quantity <= i.minStock);
  const outOfStock = items.filter(i => i.quantity === 0);

  return (
    <div className="space-y-8">
      {/* Out of Stock Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertCircle className="text-destructive" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Out of Stock ({outOfStock.length})</h2>
        </div>
        
        {outOfStock.length === 0 ? (
          <p className="text-on-surface-variant text-sm bg-surface-container p-6 rounded-2xl border border-outline-variant/10">No items are currently out of stock.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {outOfStock.map((item) => (
              <Card key={item.id} className="bg-surface-container border border-destructive/30 rounded-2xl p-5 hover:bg-surface-container-high transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <Package className="text-destructive" size={24} />
                  </div>
                  <Badge className="bg-destructive/20 text-destructive border-none font-bold uppercase tracking-tighter text-[10px]">Critical</Badge>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-on-surface-variant mb-4">{item.category} • {item.id}</p>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <span className="text-sm font-bold text-destructive">0 Units Left</span>
                  <span className="text-xs text-on-surface-variant">Min: {item.minStock}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Low Stock Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
            <AlertTriangle className="text-secondary" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Low Stock ({lowStock.length})</h2>
        </div>

        {lowStock.length === 0 ? (
          <p className="text-on-surface-variant text-sm bg-surface-container p-6 rounded-2xl border border-outline-variant/10">No items are currently low on stock.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {lowStock.map((item) => (
              <Card key={item.id} className="bg-surface-container border border-secondary/30 rounded-2xl p-5 hover:bg-surface-container-high transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Package className="text-secondary" size={24} />
                  </div>
                  <Badge className="bg-secondary/20 text-secondary border-none font-bold uppercase tracking-tighter text-[10px]">Warning</Badge>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-on-surface-variant mb-4">{item.category} • {item.id}</p>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <span className="text-sm font-bold text-secondary">{item.quantity} Units Left</span>
                  <span className="text-xs text-on-surface-variant">Min: {item.minStock}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
