"use client";

import { useState } from "react";
import { Package, Bell, Clock, Sparkles } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden w-full bg-surface text-on-surface font-sans">
      {/* Left Column: Login Form */}
      <div className="flex w-full flex-col justify-center overflow-y-auto px-6 md:w-[45%] lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-[380px] py-8">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-highest">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-wide text-white">Guardian</span>
          </div>

          {/* Heading */}
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white leading-tight">
            {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
          </h1>
          <p className="mb-8 text-sm text-on-surface-variant font-medium">
            {isLogin 
              ? "Enter your credentials to manage your inventory." 
              : "Sign up to start tracking inventory the smart way."}
          </p>

          {/* Segmented Control */}
          <div className="mb-8 flex rounded-full bg-surface-container p-1 shadow-inner">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${
                isLogin ? "bg-surface-container-highest text-white shadow-md" : "text-on-surface-variant hover:text-white"
              }`}
            >
              Login
            </button>
            <button 
               onClick={() => setIsLogin(false)}
               className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${
                !isLogin ? "bg-surface-container-highest text-white shadow-md" : "text-on-surface-variant hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
                Name
              </label>
              <input
                type="name"
                placeholder="Enter your name"
                className="w-full rounded-t-lg bg-surface-container-highest px-4 py-2.5 text-sm placeholder-on-surface-variant outline-none border-b-[2px] border-transparent focus:border-primary transition-all text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-t-lg bg-surface-container-highest px-4 py-2.5 text-sm placeholder-on-surface-variant outline-none border-b-[2px] border-transparent focus:border-primary transition-all text-white"
              />
            </div>
            
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
                  Password
                </label>
                {isLogin && (
                  <a href="#" className="flex text-xs font-medium text-secondary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-t-lg bg-surface-container-highest px-4 py-2.5 text-sm placeholder-on-surface-variant outline-none border-b-[2px] border-transparent focus:border-primary transition-all tracking-[0.2em] font-mono text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-full bg-primary py-3 text-[15px] font-bold text-on-primary shadow-[0_0_20px_rgba(173,198,255,0.15)] transition-all hover:bg-primary-container"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-container-high/60"></div>
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="bg-surface px-4 text-on-surface-variant uppercase tracking-widest font-bold">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="flex gap-4">
            <button type="button" className="flex w-full items-center justify-center gap-2.5 rounded-full border border-outline-variant bg-surface-container py-3 text-sm font-semibold transition-all hover:bg-surface-container-highest text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Hero / Content */}
      <div className="hidden w-[55%] p-4 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#131b2c] p-12 xl:p-16 flex flex-col justify-center" style={{
            background: 'radial-gradient(circle at top right, #1a233a 0%, #0d1527 60%)'
        }}>
          <div>
            <h2 className="mb-5 text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-white max-w-lg">
              Never Waste <span className="italic text-secondary">Inventory</span> Again.
            </h2>
            <p className="mb-10 text-base text-on-surface-variant max-w-md leading-relaxed font-medium">
              Guardian leverages next-gen AI to track shelf life, predict demand, and automate expiry alerts before they become losses.
            </p>

            <div className="space-y-4 max-w-[420px]">
              {/* Feature 1 */}
              <div className="group flex items-start gap-4 rounded-xl bg-surface-container-low/60 p-4 backdrop-blur-xl border border-outline-variant/50 transition-all hover:bg-surface-container-high hover:border-outline-variant cursor-default">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-secondary border border-outline-variant/50 group-hover:border-outline-variant shadow-sm transition-all">
                  <Clock size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="mb-0.5 font-bold text-white text-sm">Smart Expiry Tracking</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Visual heatmap of items approaching end-of-life status.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group flex items-start gap-4 rounded-xl bg-surface-container-low/60 p-4 backdrop-blur-xl border border-outline-variant/50 transition-all hover:bg-surface-container-high hover:border-outline-variant cursor-default">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-secondary border border-outline-variant/50 group-hover:border-outline-variant shadow-sm transition-all">
                  <Bell size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="mb-0.5 font-bold text-white text-sm">Real-time Alerts</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Instant notifications via Slack, Email, or SMS for critical items.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group flex items-start gap-4 rounded-xl bg-surface-container-low/60 p-4 backdrop-blur-xl border border-outline-variant/50 transition-all hover:bg-surface-container-high hover:border-outline-variant cursor-default">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-secondary border border-outline-variant/50 group-hover:border-outline-variant shadow-sm transition-all">
                  <Sparkles size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="mb-0.5 font-bold text-white text-sm">AI-Powered Suggestions</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Automated markdown strategies and stock redistribution logic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
