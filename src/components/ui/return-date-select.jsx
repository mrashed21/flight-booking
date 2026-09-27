"use client";

import { gsap } from "gsap";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Portal from "./Portal";

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
const ReturnDateSelect = ({
  value,
  setValue,
  departureDate,
  className = "",
  isDisabled = false,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const defaultReturnDate = addDays(today, 7);

  const [open, setOpen] = useState(false);
  const [cursorDate, setCursorDate] = useState(defaultReturnDate);
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState(null);

  const currentYear = today.getFullYear();

  const panelRef = useRef(null);
  const wrapperRef = useRef(null);
  const prevDepartureDateRef = useRef(departureDate);

  /* derived selected date from parent */
  const selectedDate = value ? new Date(value) : null;

  /* minimum selectable date - departure date or today */
  const minDate = useMemo(() => {
    if (departureDate) {
      const depDate = new Date(departureDate);
      depDate.setHours(0, 0, 0, 0);
      return depDate;
    }
    return today;
  }, [departureDate]);

  /* reset return date when departure date changes */
  useEffect(() => {
    if (departureDate !== prevDepartureDateRef.current) {
      setValue(null); // reset return date
      prevDepartureDateRef.current = departureDate;

      // Update cursor to show month of new departure date
      if (departureDate) {
        const depDate = new Date(departureDate);
        setCursorDate(addDays(depDate, 7));
      }
    }
  }, [departureDate, setValue]);

  /* ---------- outside click ---------- */
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
    if (!open) return;

    const updatePosition = () => {
      const pos = calculatePosition();
      if (pos) {
        setCoords((prevCoords) => {
          if (
            !prevCoords ||
            prevCoords.top !== pos.top ||
            prevCoords.left !== pos.left
          ) {
            return pos;
          }
          return prevCoords;
        });
      }
    };

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
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
    if (date < minDate) return;

    setValue(toISOWithOffset(date));
    setOpen(false);
    setSearch("");
  };

  /* display date - 7 days from departure or today+7 */
  const displayDate = useMemo(() => {
    if (selectedDate) return selectedDate;
    if (departureDate) {
      const depDate = new Date(departureDate);
      return addDays(depDate, 7);
    }
    return defaultReturnDate;
  }, [selectedDate, departureDate, defaultReturnDate]);

  const toggle = () => {
    const pos = calculatePosition();
    if (pos) setCoords(pos);
    setOpen((p) => !p);
  };

  const calculatePosition = () => {
    if (!wrapperRef.current) return null;

    const rect = wrapperRef.current.getBoundingClientRect();
    const PANEL_WIDTH = 320;
    const GAP = 6;

    let left = rect.right - PANEL_WIDTH;

    if (left < 12) {
      left = 12;
    }

    return {
      top: rect.bottom + GAP,
      left,
    };
  };

  return (
    <div ref={wrapperRef} className="relative min-w-40">
      <label className="text-muted mb-1 block text-sm font-medium">
        Return
      </label>

      {/* trigger */}
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
          {selectedDate ? formatDate(displayDate) : "Select Date"}
          {/* {formatDate(displayDate)} */}
          {/* formatDate(displayDate) */}
        </span>
      </button>

      {/* modal */}
      {open && (
        <Portal>
          <div
            ref={panelRef}
            className="border-muted/20 cz-max fixed w-80 rounded-xl border bg-white p-4 shadow-xl will-change-transform"
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            {/* search */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search (e.g. Dec ${currentYear}, ${currentYear} 12)`}
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
                    disabled={d < minDate}
                    onClick={() => handleSelect(d)}
                    className={`h-9 rounded-md text-sm font-medium transition ${
                      d < minDate
                        ? "text-muted cursor-not-allowed"
                        : isSameDay(d, selectedDate)
                          ? "bg-primary cursor-pointer text-white"
                          : isSameDay(d, displayDate) && !selectedDate
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
        </Portal>
      )}
    </div>
  );
};

export default ReturnDateSelect;
