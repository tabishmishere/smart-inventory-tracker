"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, LayoutDashboard, Boxes, Tag, Bell, Search, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full bg-surface text-on-surface font-sans">
      {/* Sidebar: Uses surface background so it blends, fixed/sticky to not scroll */}
      <aside className="w-64 flex-shrink-0 flex flex-col h-screen sticky top-0 px-4 py-8 border-r border-outline-variant/20 bg-surface z-20">
        <div className="flex items-center gap-3 px-2 mb-12">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-highest">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-wide text-white">Guardian</span>
        </div>

        <nav className="flex-1 space-y-2 mt-4">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-[1.5rem] transition-all font-medium ${
              pathname === '/dashboard' 
                ? 'bg-surface-container-highest text-white' 
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
            }`}
          >
            <LayoutDashboard size={18} className={pathname === '/dashboard' ? "text-primary" : ""} />
            Dashboard
          </Link>
          
          <Link
            href="/inventory"
            className={`flex items-center gap-3 px-4 py-3 rounded-[1.5rem] transition-all font-medium ${
              pathname === '/inventory' 
                ? 'bg-surface-container-highest text-white' 
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
            }`}
          >
            <Boxes size={18} className={pathname === '/inventory' ? "text-primary" : ""} />
            Inventory
          </Link>
          
          <Link
            href="/categories"
            className={`flex items-center gap-3 px-4 py-3 rounded-[1.5rem] transition-all font-medium ${
              pathname === '/categories' 
                ? 'bg-surface-container-highest text-white' 
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
            }`}
          >
            <Tag size={18} className={pathname === '/categories' ? "text-primary" : ""} />
            Categories
          </Link>

          <Link
            href="/alerts"
            className={`flex items-center gap-3 px-4 py-3 rounded-[1.5rem] transition-all font-medium ${
              pathname === '/alerts' 
                ? 'bg-surface-container-highest text-white' 
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
            }`}
          >
            <Bell size={18} className={pathname === '/alerts' ? "text-primary" : ""} />
            Alerts
          </Link>
        </nav>

        {/* User Info at the bottom of the sidebar */}
        <div className="mt-auto px-4 py-4 rounded-[1.5rem] bg-surface-container-low border border-outline-variant/30 flex items-center justify-between group cursor-pointer hover:bg-surface-container transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User size={18} />
            </div>
            <div className="flex flex-col overflow-hidden text-sm">
              <p className="font-bold text-white truncate">Admin User</p>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant truncate">Store Manager</p>
            </div>
          </div>
          <LogOut size={16} className="text-on-surface-variant group-hover:text-error transition-colors" />
        </div>
      </aside>

      {/* Main Content Area: Taking full height, seamless look matching login page */}
      <main className="flex-1 flex flex-col min-w-0 bg-surface">
        {/* Top Header */}
        <header className="sticky top-0 z-10 flex items-center justify-end px-8 lg:px-12 py-6 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
          {/* <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
            <Input
              type="text"
              placeholder="Search inventory, categories..."
              className="w-full pl-10 bg-surface-container-highest border-b-[2px] border-transparent focus:border-primary rounded-full focus-visible:ring-0 text-white placeholder:text-on-surface-variant"
            />
          </div> */}

          <div className="flex items-center gap-4">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-white transition-colors border border-outline-variant/20">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-error border-2 border-surface-container-highest"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
