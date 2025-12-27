"use client";

import { gsap } from "gsap";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const formatDate = (date) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const isSameDay = (a, b) =>
  a &&
  b &&
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

const DateSelecet = ({
  name,
  tripType = "One Way",
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) => {
  const [open, setOpen] = useState(false);
  const [cursorDate, setCursorDate] = useState(new Date());
  const [search, setSearch] = useState("");

  const panelRef = useRef(null);
  const wrapperRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  /* ---------- animation ---------- */
  useEffect(() => {
    if (!open || !panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 10, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power3.out" }
    );
  }, [open]);

  /* ---------- calendar grid ---------- */
  const days = useMemo(() => {
    const year = cursorDate.getFullYear();
    const month = cursorDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= totalDays; d++) arr.push(new Date(year, month, d));
    return arr;
  }, [cursorDate]);

  /* ---------- search date ---------- */
  useEffect(() => {
    if (!search) return;
    const parsed = new Date(search);
    if (!isNaN(parsed)) setCursorDate(parsed);
  }, [search]);

  /* ---------- select logic ---------- */
  const handleSelect = (date) => {
    if (date < today) return; // ❌ past date block

    if (!fromDate || (fromDate && toDate)) {
      setFromDate(date);
      setToDate(null);
      if (tripType === "One Way") setOpen(false);
      return;
    }

    if (date >= fromDate) {
      setToDate(date);
      setOpen(false);
    } else {
      setFromDate(date);
    }
  };

  const getSearchPlaceholder = () => {
    const today = new Date();
    return `Search date (e.g. ${today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })})`;
  };

  return (
    <div ref={wrapperRef} className="relative w-55">
      <label htmlFor="" className="text-muted">
        {name}
      </label>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-white text-sm shadow-sm hover:shadow transition border-muted"
      >
        <CalendarDays size={16} className="text-primary" />
        <span className="truncate">
          {fromDate
            ? tripType === "Round Trip" && toDate
              ? `${formatDate(fromDate)} → ${formatDate(toDate)}`
              : formatDate(fromDate)
            : formatDate(new Date())}
        </span>
      </button>

      {/* modal */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-18 z-50 mb-2 rounded-xl border border-muted bg-white p-4 shadow-xl w-100"
        >
          {/* search */}
          <input
            placeholder={getSearchPlaceholder()}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3 w-full rounded-md border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* header */}
          <div className="flex items-center justify-between mb-3">
            <button
              className="cursor-pointer"
              onClick={() =>
                setCursorDate(
                  new Date(
                    cursorDate.getFullYear(),
                    cursorDate.getMonth() - 1,
                    1
                  )
                )
              }
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-medium">
              {cursorDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <button
              className="cursor-pointer"
              onClick={() =>
                setCursorDate(
                  new Date(
                    cursorDate.getFullYear(),
                    cursorDate.getMonth() + 1,
                    1
                  )
                )
              }
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* weekdays */}
          <div className="grid grid-cols-7 text-xs text-gray-400 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="text-center">
                {d}
              </span>
            ))}
          </div>

          {/* dates */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) =>
              d ? (
                <button
                  key={i}
                  disabled={d < today}
                  onClick={() => handleSelect(d)}
                  className={`h-9 rounded-md text-sm transition
        ${
          d < today
            ? "text-gray-300 cursor-not-allowed"
            : isSameDay(d, fromDate) || isSameDay(d, toDate)
            ? "bg-primary text-white"
            : "hover:bg-primary/10"
        }`}
                >
                  {d.getDate()}
                </button>
              ) : (
                <span key={i} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelecet;
