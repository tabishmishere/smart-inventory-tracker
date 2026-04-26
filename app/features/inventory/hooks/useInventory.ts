"use client";

import { useState, useEffect } from "react";
import { InventoryItem } from "../inventory.types";

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: "SKU-9920", name: "Organic Milk (1L)", category: "Dairy", quantity: 12, minStock: 20, price: "$3.99", expiry: "2 Days Left" },
  { id: "SKU-1024", name: "Sourdough Bread", category: "Bakery", quantity: 5, minStock: 10, price: "$5.49", expiry: "4 Days Left" },
  { id: "SKU-4402", name: "Avocados (Box)", category: "Produce", quantity: 0, minStock: 5, price: "$12.00", expiry: "8 Days Left" },
  { id: "SKU-8821", name: "Canned Tomatoes", category: "Pantry", quantity: 145, minStock: 50, price: "$1.99", expiry: "145 Days Left" },
  { id: "SKU-1192", name: "Dry Pasta (Fusilli)", category: "Pantry", quantity: 85, minStock: 30, price: "$2.49", expiry: "310 Days Left" },
  { id: "SKU-3321", name: "Almond Butter", category: "Pantry", quantity: 24, minStock: 15, price: "$8.99", expiry: "120 Days Left" },
  { id: "SKU-7742", name: "Free Range Eggs", category: "Dairy", quantity: 18, minStock: 30, price: "$6.50", expiry: "12 Days Left" },
];

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("inventory");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(INITIAL_INVENTORY);
      localStorage.setItem("inventory", JSON.stringify(INITIAL_INVENTORY));
    }
  }, []);

  const addItem = (item: Omit<InventoryItem, "id">) => {
    const newItem = {
      ...item,
      id: `SKU-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
    };
    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem("inventory", JSON.stringify(updated));
    console.log("Added Item:", newItem);
  };

  const deleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("inventory", JSON.stringify(updated));
  };

  return { items, addItem, deleteItem };
}
