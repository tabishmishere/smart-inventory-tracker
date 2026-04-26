"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, Filter, Plus, MoreHorizontal, ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { ProductForm } from "@/app/features/inventory/components/ProductForm";
import { useInventory } from "@/app/features/inventory/hooks/useInventory";

const getStockStatus = (quantity: number, minStock: number) => {
  if (quantity === 0) return { label: "Out of Stock", color: "bg-destructive/20 text-destructive" };
  if (quantity <= minStock) return { label: "Low Stock", color: "bg-secondary/20 text-secondary" };
  return { label: "In Stock", color: "bg-primary/20 text-primary" };
};

export default function InventoryPage() {
  const { items, addItem, deleteItem } = useInventory();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const status = getStockStatus(item.quantity, item.minStock);
      const matchesCategory = !categoryFilter || item.category === categoryFilter;
      const matchesStatus = !statusFilter || status.label === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchQuery, categoryFilter, statusFilter]);

  const categories = Array.from(new Set(items.map(i => i.category)));
  const statuses = ["In Stock", "Low Stock", "Out of Stock"];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2">
            Inventory Management
          </h1>
          <p className="text-on-surface-variant text-sm font-medium">
            Manage your products, track quantities, and monitor stock levels.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full bg-surface-container border-outline-variant/30 font-semibold cursor-pointer px-6 py-6 text-white hover:bg-surface-container-highest transition-all">
            Export
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-primary text-on-primary hover:bg-primary-container font-semibold cursor-pointer px-6 py-6 shadow-[0_0_20px_rgba(173,198,255,0.15)] transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <Card className="bg-surface-container border-none rounded-[1.5rem] p-4 shadow-none flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <Input
            type="text"
            placeholder="Search by SKU, Name, or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-surface-container-highest border-b-[2px] border-transparent focus:border-primary rounded-full focus-visible:ring-0 text-white placeholder:text-on-surface-variant"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            onChange={(e) => setCategoryFilter(e.target.value || null)}
            className="rounded-full bg-surface-container-highest border-none text-white hover:bg-surface transition-all px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="rounded-full bg-surface-container-highest border-none text-white hover:bg-surface transition-all px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="">All Statuses</option>
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="bg-surface-container border-none rounded-[1.5rem] overflow-hidden shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/50 border-b border-outline-variant/10 text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                <th className="p-5 font-bold flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  Product <ArrowUpDown size={14} />
                </th>
                <th className="p-5 font-bold">Category</th>
                <th className="p-5 font-bold">Stock</th>
                <th className="p-5 font-bold">Status</th>
                <th className="p-5 font-bold cursor-pointer hover:text-white transition-colors flex items-center gap-2">
                  Price <ArrowUpDown size={14} />
                </th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredItems.map((item, idx) => {
                const status = getStockStatus(item.quantity, item.minStock);
                return (
                  <tr key={idx} className="hover:bg-surface-container-highest/30 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-surface-container-highest flex items-center justify-center border border-outline-variant/20 group-hover:border-primary/50 transition-colors">
                          <Package size={16} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-on-surface-variant font-mono mt-0.5">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-sm text-on-surface-variant font-medium">{item.category}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-sm">{item.quantity} Unit{item.quantity !== 1 && 's'}</span>
                        <span className="text-xs text-on-surface-variant">Min: {item.minStock}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <Badge variant="outline" className={`rounded-full border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider ${status.color}`}>
                        {status.label}
                      </Badge>
                    </td>
                    <td className="p-5">
                      <span className="text-sm font-bold text-white">{item.price}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-on-surface-variant hover:text-white hover:bg-surface-container-highest rounded-full">
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteItem(item.id)}
                          className="h-8 w-8 text-on-surface-variant hover:text-destructive hover:bg-destructive/10 rounded-full"
                        >
                          <Trash2 size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-on-surface-variant hover:text-white hover:bg-surface-container-highest rounded-full">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-sm text-on-surface-variant font-medium px-2">
        <p>Showing {filteredItems.length} of {items.length} products</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full bg-surface-container border-outline-variant/30 text-white hover:bg-surface-container-highest disabled:opacity-50" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-surface-container border-outline-variant/30 text-white hover:bg-surface-container-highest">
            Next
          </Button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Product"
      >
        <ProductForm 
          onSubmit={(data) => {
            addItem(data);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

