"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "../../inventory/inventory.types";

interface CategoryFormProps {
  onSubmit: (data: Pick<Category, "name" | "description">) => void;
  onCancel: () => void;
}

export function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Category name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Category Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Frozen Foods"
          className="bg-surface-container-highest border-none rounded-xl text-white placeholder:text-on-surface-variant/50"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Description (Optional)</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe this category..."
          className="w-full h-24 p-3 bg-surface-container-highest border-none rounded-xl text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
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
          Add Category
        </Button>
      </div>
    </form>
  );
}
