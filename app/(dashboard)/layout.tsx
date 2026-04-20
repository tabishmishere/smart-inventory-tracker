import { ReactNode } from "react";
import Link from "next/link";
import { Package, LayoutDashboard, Boxes, Tag, Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-surface text-on-surface font-sans">
      {/* Sidebar: Uses surface background so it blends, active item uses surface-container-highest */}
      <aside className="w-64 flex flex-col px-4 py-8">
        <div className="flex items-center gap-3 px-2 mb-12">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-highest">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-wide text-white">Guardian</span>
        </div>

        <nav className="flex-1 space-y-2">
          {/* Active Link Example */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-[1.5rem] bg-surface-container-highest text-white transition-all font-medium"
          >
            <LayoutDashboard size={18} className="text-primary" />
            Dashboard
          </Link>
          
          <Link
            href="/inventory"
            className="flex items-center gap-3 px-4 py-3 rounded-[1.5rem] text-on-surface-variant hover:text-white hover:bg-surface-container transition-all font-medium"
          >
            <Boxes size={18} />
            Inventory
          </Link>
          
          <Link
            href="/categories"
            className="flex items-center gap-3 px-4 py-3 rounded-[1.5rem] text-on-surface-variant hover:text-white hover:bg-surface-container transition-all font-medium"
          >
            <Tag size={18} />
            Categories
          </Link>

          <Link
            href="/alerts"
            className="flex items-center gap-3 px-4 py-3 rounded-[1.5rem] text-on-surface-variant hover:text-white hover:bg-surface-container transition-all font-medium"
          >
            <Bell size={18} />
            Alerts
          </Link>
        </nav>
      </aside>

      {/* Main Content Area: Background shifted to surface-container for the "No-Line" visual separation */}
      <main className="flex-1 flex flex-col bg-surface-container rounded-l-[2.5rem] my-4 mr-4 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between px-10 py-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
            <Input
              type="text"
              placeholder="Search inventory, categories..."
              className="w-full pl-10 bg-surface-container-highest border-b-[2px] border-transparent focus:border-primary  rounded-full focus-visible:ring-0 text-white placeholder:text-on-surface-variant"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User size={18} />
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-bold text-white">Admin User</p>
                <p className="text-xs text-on-surface-variant">Store Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-10 pt-4">
          {children}
        </div>
      </main>
    </div>
  );
}
