"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minDate = new Date(),
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse current selected date
  const selectedDate = useMemo(() => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }, [value]);

  const [viewDate, setViewDate] = useState(() => {
    return selectedDate ? new Date(selectedDate) : new Date();
  });

  useEffect(() => {
    if (selectedDate) {
      setViewDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Calculate days in month
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        date: new Date(year, month, d),
        isCurrentMonth: true,
      });
    }

    // Next month padding (to fill 35 or 42 cells)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  const prevMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(year, month + 1, 1));
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDateDisabled = (date) => {
    if (!minDate) return false;
    const startOfMin = new Date(minDate);
    startOfMin.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < startOfMin;
  };

  const handleSelectDate = (date) => {
    if (isDateDisabled(date)) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const isoString = `${yyyy}-${mm}-${dd}`;
    onChange(isoString);
    setIsOpen(false);
  };

  const formattedLabel = useMemo(() => {
    if (!selectedDate) return null;
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Shadcn-style trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 text-sm text-left text-gray-900 shadow-sm transition hover:border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
      >
        <div className="flex items-center gap-2.5 truncate">
          <CalendarIcon className="h-4 w-4 text-primary flex-shrink-0" />
          <span className={formattedLabel ? "font-semibold text-gray-900" : "text-gray-400 font-normal"}>
            {formattedLabel || placeholder}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
          Calendar
        </span>
      </button>

      {/* Popover Calendar */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-2xl bg-white p-3.5 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-sm font-bold text-gray-900">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-1">
            {weekDays.map((wd) => (
              <div key={wd} className="py-1">
                {wd}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {calendarDays.map((item, idx) => {
              const isSelected = isSameDay(item.date, selectedDate);
              const isToday = isSameDay(item.date, new Date());
              const disabled = isDateDisabled(item.date);

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDate(item.date)}
                  className={`flex h-8 w-8 mx-auto items-center justify-center rounded-lg transition text-xs ${
                    isSelected
                      ? "bg-primary text-white font-bold shadow-md shadow-primary/30"
                      : isToday
                      ? "border border-primary text-primary font-bold hover:bg-primary/10"
                      : item.isCurrentMonth
                      ? "text-gray-800 hover:bg-gray-100 font-medium"
                      : "text-gray-300 hover:bg-gray-50"
                  } ${disabled ? "opacity-30 cursor-not-allowed hover:bg-transparent" : "cursor-pointer"}`}
                >
                  {item.date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer Quick Action */}
          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={() => handleSelectDate(new Date())}
              className="text-primary font-semibold hover:underline"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                handleSelectDate(tomorrow);
              }}
              className="text-gray-500 font-medium hover:text-gray-800"
            >
              Tomorrow
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
