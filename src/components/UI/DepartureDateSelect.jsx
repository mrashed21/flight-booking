"use client";

import { gsap } from "gsap";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- helpers ---------- */
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

const toISOWithOffset = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00+00:00`;
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

/* smart search parser */
const parseSearchDate = (input) => {
  if (!input) return null;

  const normalized = input
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const parsed = new Date(normalized);
  if (!isNaN(parsed)) return parsed;

  return null;
};

/* ---------- component ---------- */
const DepartureDateSelect = ({
  value,
  setValue,
  isDisabled = false,
  className = "",
  label = "Departure",
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [cursorDate, setCursorDate] = useState(today);
  const [search, setSearch] = useState("");

  const currentYear = today.getFullYear();
  const nextMonth = addDays(today, 7).toLocaleString("default", {
    month: "short",
  });

  const panelRef = useRef(null);
  const wrapperRef = useRef(null);

  /* derived selected date from parent */
  const selectedDate = value ? new Date(value) : null;

  /* ---------- outside click ---------- */
  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* ---------- animation ---------- */
  useEffect(() => {
    if (!open || !panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 10, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power3.out" },
    );
  }, [open]);

  /* ---------- calendar grid ---------- */
  const days = useMemo(() => {
    const y = cursorDate.getFullYear();
    const m = cursorDate.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const totalDays = new Date(y, m + 1, 0).getDate();

    const arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= totalDays; d++) arr.push(new Date(y, m, d));
    return arr;
  }, [cursorDate]);

  /* ---------- search ---------- */
  useEffect(() => {
    if (!search) return;

    const parsed = parseSearchDate(search);
    if (parsed) {
      setCursorDate(parsed);
    }
  }, [search]);

  /* ---------- select ---------- */
  const handleSelect = (date) => {
    if (date < today) return;

    setValue(toISOWithOffset(date));
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={wrapperRef} className="relative min-w-40">
      <label className="text-muted mb-1 block text-sm font-medium">
        {label}
      </label>

      {/* trigger */}
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => setOpen((p) => !p)}
        className={`border-muted flex w-full items-center gap-2 rounded border bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:shadow ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
      >
        <CalendarDays size={16} className="text-primary" />
        <span className={selectedDate ? "text-black" : "text-muted"}>
          {selectedDate ? formatDate(selectedDate) : "Select Date"}
        </span>
      </button>

      {/* modal */}
      {open && (
        <div
          ref={panelRef}
          className={`border-muted/20 absolute top-full right-0 z-50 mt-1 w-80 rounded-xl border bg-white p-4 shadow-xl`}
        >
          {/* search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search (e.g. Dec ${currentYear}, Dec ${currentYear})`}
            className="border-muted/20 mb-3 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          />

          {/* header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={() =>
                setCursorDate(
                  new Date(
                    cursorDate.getFullYear(),
                    cursorDate.getMonth() - 1,
                    1,
                  ),
                )
              }
              className="hover:bg-muted/20 cursor-pointer rounded p-1"
            >
              <ChevronLeft size={20} />
            </button>

            <p className="text-sm font-semibold">
              {cursorDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>

            <button
              onClick={() =>
                setCursorDate(
                  new Date(
                    cursorDate.getFullYear(),
                    cursorDate.getMonth() + 1,
                    1,
                  ),
                )
              }
              className="hover:bg-muted/20 cursor-pointer rounded p-1"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* weekday headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-muted flex h-9 items-center justify-center text-xs font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* calendar */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) =>
              d ? (
                <button
                  key={i}
                  disabled={d < today}
                  onClick={() => handleSelect(d)}
                  className={`h-9 rounded-md text-sm font-medium transition ${
                    d < today
                      ? "text-muted cursor-not-allowed"
                      : isSameDay(d, selectedDate)
                        ? "bg-primary cursor-pointer text-white"
                        : isSameDay(d, today)
                          ? "bg-primary-bg text-info hover:bg-gray-light cursor-pointer"
                          : "hover:bg-gray-light cursor-pointer"
                  }`}
                >
                  {d.getDate()}
                </button>
              ) : (
                <span key={i} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartureDateSelect;
