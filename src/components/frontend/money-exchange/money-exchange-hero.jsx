"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ShieldCheck,
  Zap,
  Globe2,
  Clock,
} from "lucide-react";
import Container from "@/components/common/container/container";
import { CURRENCIES } from "./currencies-data";

export default function MoneyExchangeHero({ onSelectCurrency }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const tickerCurrencies = CURRENCIES.filter(
    (c) => c.code !== "BDT" && ["USD", "SAR", "AED", "EUR", "GBP", "MYR", "THB", "SGD"].includes(c.code)
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 600);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0b568e] via-[#1c74c0] to-[#0e4877] text-white">
      {/* Background Decorative Rings / Glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-[#e59a12]/20 blur-3xl" />

      <Container className="relative z-10 pt-10 pb-8 md:pt-14 md:pb-10">
        {/* Top Badges */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400 -ml-3.5" />
            Live Google / Interbank Feed
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e59a12]/25 border border-[#e59a12]/40 px-3 py-1 text-xs font-semibold text-amber-200">
            <Zap className="h-3.5 w-3.5 text-[#e59a12]" />
            Best Travel Forex Rate in Bangladesh
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-blue-100">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-200" />
            Govt. Licensed Money Changer
          </span>
        </div>

        {/* Hero Title & Description */}
        <div className="max-w-3xl text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white leading-tight">
            Foreign Currency & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Money Exchange Service
            </span>
          </h1>
          <p className="mt-3 text-sm text-blue-100 sm:text-base md:text-lg leading-relaxed max-w-2xl">
            আন্তর্জাতিক ভ্রমণ, ওমরাহ ও চিকিৎসার জন্য সেরা রেটে যেকোনো দেশের মুদ্রা কনভার্ট করার রিকোয়েস্ট পাঠান।
            হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর বা আমাদের ব্রাঞ্চ থেকে সরাসরি ক্যাশ সংগ্রহ করুন।
          </p>
        </div>

        {/* Live Rate Row / Ticker Header */}
        <div className="mt-8 rounded-2xl bg-white/10 p-3 sm:p-4 backdrop-blur-md border border-white/15 shadow-xl">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200 sm:text-sm">
                Live Exchange Rates (Against BDT ৳)
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-blue-100">
              <span className="hidden sm:inline flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 opacity-80" />
                Updated: <strong className="text-white font-medium">{lastUpdated}</strong>
              </span>
              <button
                onClick={handleRefresh}
                title="Refresh rates"
                className="flex items-center gap-1.5 rounded-lg bg-white/15 hover:bg-white/25 px-2.5 py-1 text-xs font-medium text-white transition active:scale-95"
              >
                <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Sync Rates</span>
              </button>
            </div>
          </div>

          {/* Rate Row Scrollable Horizontal Cards */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {tickerCurrencies.map((c) => {
              const isPositive = c.change24h >= 0;
              return (
                <button
                  key={c.code}
                  onClick={() => onSelectCurrency && onSelectCurrency(c.code)}
                  className="group flex flex-shrink-0 items-center gap-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-amber-300/40 p-2 sm:px-3 sm:py-2 text-left transition hover:shadow-lg active:scale-98"
                >
                  <span className="text-xl sm:text-2xl leading-none">{c.flag}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white group-hover:text-amber-200 transition">
                        {c.code}/BDT
                      </span>
                      <span
                        className={`inline-flex items-center text-[10px] font-semibold ${
                          isPositive ? "text-emerald-300" : "text-rose-300"
                        }`}
                      >
                        {isPositive ? <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> : <TrendingDown className="h-2.5 w-2.5 mr-0.5" />}
                        {isPositive ? "+" : ""}
                        {c.change24h}%
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">
                      ৳{c.rateToBDT.toFixed(2)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
