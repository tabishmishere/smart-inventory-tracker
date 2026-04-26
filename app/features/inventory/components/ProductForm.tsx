"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InventoryItem } from "../inventory.types";

interface ProductFormProps {
  onSubmit: (data: Omit<InventoryItem, "id">) => void;
  onCancel: () => void;
  initialData?: Partial<InventoryItem>;
  showPrice?: boolean;
}

export function ProductForm({ onSubmit, onCancel, initialData, showPrice = true }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    quantity: initialData?.quantity || 0,
    category: initialData?.category || "Dairy",
    price: initialData?.price || "",
    status: initialData?.status || "In Stock",
    minStock: initialData?.minStock || 5,
    expiry: initialData?.expiry || "7 Days Left",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Product name is required";
    if (formData.quantity < 0) newErrors.quantity = "Quantity cannot be negative";
    if (showPrice && !formData.price) newErrors.price = "Price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        price: showPrice ? formData.price : "$0.00",
      });
    }
  };

  const categories = ["Dairy", "Produce", "Meat & Poultry", "Bakery", "Vegetables", "Beverages", "Frozen Foods", "Pantry"];
  const statuses = ["In Stock", "Low Stock", "Out of Stock"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Product Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Organic Almond Milk"
          className="bg-surface-container-highest border-none rounded-xl text-white placeholder:text-on-surface-variant/50"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Quantity</label>
          <Input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
            className="bg-surface-container-highest border-none rounded-xl text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full h-10 px-3 bg-surface-container-highest border-none rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {showPrice && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Price</label>
            <Input
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="$0.00"
              className="bg-surface-container-highest border-none rounded-xl text-white"
            />
            {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full h-10 px-3 bg-surface-container-highest border-none rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="rounded-xl text-on-surface-variant hover:text-white hover:bg-surface-container-highest"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-xl bg-primary text-on-primary hover:bg-primary-container px-8"
        >
          Save Product
        </Button>
      </div>
    </form>
  );
}
