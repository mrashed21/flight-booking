"use client";

import { useState } from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import FlagSvg from "@/components/ui/flag-svg";
import { CURRENCIES } from "./currencies-data";

export default function LiveRatesTable({ onSelectCurrency }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Currencies" },
    { id: "popular", label: "Top Travel Currencies" },
    { id: "middle-east", label: "Middle East (Hajj/Umrah)" },
    { id: "asia", label: "Asia Travel" },
    { id: "europe", label: "Europe & Americas" },
  ];

  const filteredCurrencies = CURRENCIES.filter((c) => {
    if (c.code === "BDT") return false; // don't show BDT vs BDT in table

    // Category filter
    if (activeCategory === "popular" && c.category !== "popular") return false;
    if (activeCategory === "middle-east" && c.category !== "middle-east") return false;
    if (activeCategory === "asia" && c.category !== "asia") return false;
    if (activeCategory === "europe" && !["europe", "americas"].includes(c.category)) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="mt-12 rounded-3xl bg-white p-5 sm:p-8 shadow-xl border border-gray-100">
      {/* Table Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Live Market Rates
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
            Daily Foreign Currency Buy & Sell Rates
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time exchange rates synced with global interbank feeds and central bank compliance.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search currency, e.g. USD, Riyal..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="my-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeCategory === cat.id
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
              <th className="py-3.5 px-3">Currency</th>
              <th className="py-3.5 px-3">We Buy (Cash)</th>
              <th className="py-3.5 px-3">We Sell (Cash)</th>
              <th className="py-3.5 px-3 hidden sm:table-cell">Mid-Market Rate</th>
              <th className="py-3.5 px-3">24h Change</th>
              <th className="py-3.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {filteredCurrencies.map((c) => {
              const isPositive = c.change24h >= 0;
              return (
                <tr
                  key={c.code}
                  className="group hover:bg-blue-50/40 transition-colors"
                >
                  {/* Currency Name & Flag */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <FlagSvg countryCode={c.countryCode} title={c.country} style={{ width: "2rem", height: "1.45rem" }} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-gray-900 group-hover:text-primary transition">
                            {c.code}
                          </span>
                          <span className="hidden sm:inline rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500 font-semibold">
                            {c.symbol}
                          </span>
                          {c.popularTag && (
                            <span className="hidden md:inline rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.2 text-[10px] font-bold">
                              {c.popularTag}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{c.name} • {c.country}</div>
                      </div>
                    </div>
                  </td>

                  {/* We Buy */}
                  <td className="py-3.5 px-3 font-bold text-gray-900">
                    ৳{c.buyRate.toFixed(2)}
                  </td>

                  {/* We Sell */}
                  <td className="py-3.5 px-3 font-extrabold text-primary">
                    ৳{c.sellRate.toFixed(2)}
                  </td>

                  {/* Mid Market */}
                  <td className="py-3.5 px-3 text-gray-500 hidden sm:table-cell">
                    ৳{c.rateToBDT.toFixed(2)}
                  </td>

                  {/* 24h Change */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                        isPositive
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {isPositive ? "+" : ""}
                      {c.change24h}%
                    </span>
                  </td>

                  {/* Quick Convert Button */}
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => {
                        if (onSelectCurrency) onSelectCurrency(c.code);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1 rounded-xl bg-gray-100 hover:bg-primary hover:text-white px-3 py-1.5 text-xs font-bold text-gray-700 transition active:scale-95"
                    >
                      <span>Convert</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredCurrencies.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p className="text-sm font-semibold">No currencies found matching your search.</p>
            <p className="text-xs text-gray-400 mt-1">Please try searching by currency code (e.g., USD, EUR, SAR) or country name.</p>
          </div>
        )}
      </div>

      {/* Table Footer Note */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4 text-[11px] text-gray-400">
        <div>
          * Rates are indicative and subject to market conditions. Submitting an online request guarantees your rate lock for 24 hours.
        </div>
        <div>
          Per Bangladesh Bank travel quota, each adult traveler is entitled to up to USD 12,000 passport endorsement per calendar year.
        </div>
      </div>
    </div>
  );
}
