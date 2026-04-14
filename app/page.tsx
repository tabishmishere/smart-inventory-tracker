"use client";

import { useState } from "react";
import { Package, Bell, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-surface text-on-surface font-sans overflow-hidden items-center justify-center">
      {/* CENTER WRAPPER (fixes scrollbar + alignment) */}
      <div className="flex w-full max-w-6xl h-[92vh] items-center justify-center rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Column */}
        <div className="flex w-full md:w-[45%] flex-col justify-center px-6 lg:px-12 xl:px-20 overflow-hidden">
          <div className="mx-auto w-full max-w-[380px]">
            {/* Logo */}
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-highest">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold tracking-wide text-white">
                Guardian
              </span>
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
            <div className="mb-8 flex rounded-full bg-surface-container p-1 shadow-inner relative overflow-hidden">
              {/* Smooth slider */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute top-1 bottom-1 w-1/2 rounded-full bg-surface-container-highest shadow-md"
                style={{ left: isLogin ? "4px" : "50%" }}
              />

              <button
                onClick={() => setIsLogin(true)}
                className="flex-1 rounded-full py-2 text-sm font-semibold cursor-pointer text-on-surface-variant z-10"
              >
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className="flex-1 rounded-full py-2 text-sm cursor-pointer font-semibold text-on-surface-variant z-10"
              >
                Sign Up
              </button>
            </div>

            {/* FORM (animated, no layout shift) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <form className="space-y-5">
                  {!isLogin && (
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
                  )}

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
                        <a
                          href="#"
                          className="flex text-xs font-medium text-secondary hover:underline"
                        >
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column (CENTER FIX ONLY) */}
        <div className="hidden w-[55%] lg:flex items-center justify-center p-4">
          <div
            className="w-full h-full rounded-2xl flex flex-col justify-center p-12 xl:p-16 text-white"
            style={{
              background:
                "radial-gradient(circle at top right, #1a233a 0%, #0d1527 60%)",
            }}
          >
            <h2 className="mb-5 text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-white max-w-lg">
              Never Waste{" "}
              <span className="italic text-secondary">Inventory</span> Again.
            </h2>

            <p className="mb-10 text-base text-on-surface-variant max-w-md leading-relaxed font-medium">
              Guardian leverages next-gen AI to track shelf life, predict
              demand, and automate expiry alerts before they become losses.
            </p>

            <div className="space-y-4 max-w-[420px]">
              <div className="flex items-start gap-4 rounded-xl bg-surface-container-low/60 p-4 border border-outline-variant/50">
                <div className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-container-highest">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Smart Expiry Tracking
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Visual heatmap of items approaching end-of-life status.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-surface-container-low/60 p-4 border border-outline-variant/50">
                <div className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-container-highest">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Real-time Alerts
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Instant notifications via Slack, Email, or SMS.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-surface-container-low/60 p-4 border border-outline-variant/50">
                <div className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-container-highest">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    AI-Powered Suggestions
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Automated stock optimization and redistribution logic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
