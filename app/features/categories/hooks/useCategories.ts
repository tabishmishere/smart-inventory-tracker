"use client";

import { useState, useEffect } from "react";
import { Category } from "../../inventory/inventory.types";
import { Coffee, Apple, Beef, Cake, Carrot, GlassWater, ThermometerSnowflake, Wheat } from "lucide-react";

const INITIAL_CATEGORIES: Category[] = [
  { name: "Dairy", count: 24, status: "Healthy", color: "bg-blue-500/20 text-blue-500", border: "border-blue-500/30" },
  { name: "Produce", count: 56, status: "Action Needed", color: "bg-green-500/20 text-green-500", border: "border-green-500/30", attention: true },
  { name: "Meat & Poultry", count: 12, status: "Healthy", color: "bg-red-500/20 text-red-500", border: "border-red-500/30" },
  { name: "Bakery", count: 34, status: "Healthy", color: "bg-orange-500/20 text-orange-500", border: "border-orange-500/30" },
  { name: "Vegetables", count: 48, status: "Low Stock", color: "bg-emerald-500/20 text-emerald-500", border: "border-emerald-500/30", warning: true },
  { name: "Beverages", count: 89, status: "Healthy", color: "bg-cyan-500/20 text-cyan-500", border: "border-cyan-500/30" },
  { name: "Frozen Foods", count: 110, status: "Healthy", color: "bg-indigo-500/20 text-indigo-500", border: "border-indigo-500/30" },
  { name: "Pantry", count: 215, status: "Healthy", color: "bg-amber-500/20 text-amber-500", border: "border-amber-500/30" },
];

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("categories");
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      setCategories(INITIAL_CATEGORIES);
      localStorage.setItem("categories", JSON.stringify(INITIAL_CATEGORIES));
    }
  }, []);

  const addCategory = (category: Pick<Category, "name" | "description">) => {
    const newCategory: Category = {
      ...category,
      count: 0,
      status: "Healthy",
      color: "bg-primary/20 text-primary",
      border: "border-primary/30",
    };
    const updated = [...categories, newCategory];
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  return { categories, addCategory };
}
