export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: string;
  expiry: string;
  status?: string;
}

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Category {
  name: string;
  count: number;
  status: string;
  description?: string;
  icon?: string; // We'll store the name of the icon
  color?: string;
  border?: string;
  attention?: boolean;
  warning?: boolean;
}
