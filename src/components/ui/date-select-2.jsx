"use client";

import { gsap } from "gsap";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Portal from "./Portal";

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

const DateSelect2 = ({
  value,
  onChange,
  isDisabled = false,
  className = "",
  label = "Select Date",
  allowPast = false,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [cursorDate, setCursorDate] = useState(today);
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState(null);

  const currentYear = today.getFullYear();

  const panelRef = useRef(null);
  const wrapperRef = useRef(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open || !panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 10, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power3.out" },
    );
  }, [open]);

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

  useEffect(() => {
    if (!search) return;

    const parsed = parseSearchDate(search);
    if (parsed) {
      setCursorDate(parsed);
    }
  }, [search]);

  const handleSelect = (date) => {
    if (!allowPast && date < today) return;

    onChange(toISOWithOffset(date));
    setOpen(false);
    setSearch("");
  };

  const calculatePosition = () => {
    if (!wrapperRef.current) return null;

    const rect = wrapperRef.current.getBoundingClientRect();
    const PANEL_WIDTH = 320;

    return {
      top: rect.bottom + 6,
      left: rect.right - PANEL_WIDTH,
    };
  };

  const toggle = () => {
    const pos = calculatePosition();
    if (pos) setCoords(pos);
    setOpen((p) => !p);
  };

  return (
    <div ref={wrapperRef} className="relative min-w-40">
      <label className="text-muted mb-1 block text-sm font-medium">
        {label}
      </label>

      <button
        type="button"
        disabled={isDisabled}
        onClick={toggle}
        className={`border-muted/20 flex w-full items-center gap-2 rounded border bg-white px-4 py-2.5 text-sm font-medium transition hover:shadow ${
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } ${className}`}
      >
        <CalendarDays size={16} className="text-primary" />
        <span className={selectedDate ? "text-black" : "text-muted"}>
          {selectedDate ? formatDate(selectedDate) : "Select Date"}
        </span>
      </button>

      {open && (
        <Portal>
          <div
            ref={panelRef}
            className="fixed w-80 rounded-xl border bg-white p-4 shadow-xl"
            style={{
              top: coords?.top,
              left: coords?.left,
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search (Dec ${currentYear})`}
              className="mb-3 w-full rounded-md border px-3 py-2 text-sm"
            />

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
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((d, i) =>
                d ? (
                  <button
                    key={i}
                    disabled={!allowPast && d < today}
                    onClick={() => handleSelect(d)}
                    className={`h-9 rounded-md text-sm ${
                      !allowPast && d < today
                        ? "cursor-not-allowed text-gray-400"
                        : isSameDay(d, selectedDate)
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
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
        </Portal>
      )}
    </div>
  );
};

export default DateSelect2;
