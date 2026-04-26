"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical, Coffee, Apple, Beef, Cake, Carrot, GlassWater, ThermometerSnowflake, Wheat } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { CategoryForm } from "@/app/features/categories/components/CategoryForm";
import { useCategories } from "@/app/features/categories/hooks/useCategories";

const ICON_MAP: Record<string, any> = {
  "Dairy": Coffee,
  "Produce": Apple,
  "Meat & Poultry": Beef,
  "Bakery": Cake,
  "Vegetables": Carrot,
  "Beverages": GlassWater,
  "Frozen Foods": ThermometerSnowflake,
  "Pantry": Wheat,
};

export default function CategoriesPage() {
  const { categories, addCategory } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2">
            Categories
          </h1>
          <p className="text-on-surface-variant text-sm font-medium">
            Organize your inventory by custom groups and departments.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-primary text-on-primary hover:bg-primary-container font-semibold cursor-pointer px-6 py-6 shadow-[0_0_20px_rgba(173,198,255,0.15)] transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> New Category
          </Button>
        </div>
      </div>

      {/* Utilities */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 bg-surface-container-highest border-transparent rounded-full focus-visible:ring-0 text-white placeholder:text-on-surface-variant shadow-none"
          />
        </div>
        <p className="text-sm font-semibold text-on-surface-variant">
          Showing {filteredCategories.length} Categories
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCategories.map((category, idx) => {
          const Icon = ICON_MAP[category.name] || Wheat;
          return (
            <Card key={idx} className={`bg-surface-container border border-outline-variant/10 rounded-[1.5rem] p-6 shadow-none hover:bg-surface-container-high transition-all group cursor-pointer relative overflow-hidden`}>
              {/* Background glowing blur */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${category.color?.split(' ')[0] || 'bg-primary/20'}`} />

              <div className="flex justify-between items-start mb-6">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${category.color} ${category.border}`}>
                  <Icon size={24} />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-on-surface-variant hover:text-white rounded-full">
                  <MoreVertical size={16} />
                </Button>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{category.name}</h2>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm font-bold text-on-surface-variant">
                    {category.count} <span className="font-medium text-xs">Items</span>
                  </p>
                  <Badge variant="outline" className={`rounded-full border-none px-3 font-bold text-[10px] uppercase tracking-wider
                    ${category.attention ? 'bg-destructive/20 text-destructive' : 
                      category.warning ? 'bg-secondary/20 text-secondary' : 
                      'bg-primary/20 text-primary'}
                  `}>
                    {category.status}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Category"
      >
        <CategoryForm 
          onSubmit={(data) => {
            addCategory(data);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

