"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

const CountrySelect = ({
  countries = [],
  label,
  placeholder = "Select country",
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const itemRefs = useRef([]);
  const inputRef = useRef(null);

  /* ---------------- FILTER ---------------- */
  const filtered =
    query === ""
      ? countries
      : countries.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase()),
        );

  /* ---------------- OPEN → highlight selected ---------------- */
  useEffect(() => {
    if (!open) return;

    if (value && !isTyping) {
      const idx = filtered.findIndex((c) => c.isoCode === value.isoCode);
      setActiveIndex(idx >= 0 ? idx : 0);
    } else {
      setActiveIndex(0);
    }
  }, [open, value, filtered, isTyping]);

  /* ---------------- SCROLL INTO VIEW ---------------- */
  useEffect(() => {
    if (!open) return;

    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      activeItem.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex, open]);

  /* ---------------- GSAP ---------------- */
  useEffect(() => {
    if (open && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
      );
    }
  }, [open]);

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const close = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
        setIsTyping(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ---------------- IMPROVED KEYBOARD NAVIGATION ---------------- */
  const handleKeyDown = useCallback(
    (e) => {
      const navigationKeys = [
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
        "Escape",
        "Tab",
        "Shift",
        "Control",
        "Alt",
        "Meta",
        "CapsLock",
        "ContextMenu",
        "Insert",
        "Delete",
        "Home",
        "End",
        "PageUp",
        "PageDown",
        "NumLock",
        "ScrollLock",
        "Pause",
        "PrintScreen",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
      ];

      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowDown":
          setOpen(true);
          setActiveIndex((prev) => {
            const next = prev + 1;
            return next >= filtered.length ? 0 : next;
          });
          break;

        case "ArrowUp":
          setOpen(true);
          setActiveIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? filtered.length - 1 : next;
          });
          break;

        case "Enter":
          if (open && filtered[activeIndex]) {
            select(filtered[activeIndex]);
          } else if (!open) {
            setOpen(true);
          }
          break;

        case "Escape":
          setOpen(false);
          setQuery("");
          setIsTyping(false);
          setTimeout(() => inputRef.current?.focus(), 10);
          break;

        case "Tab":
          if (open) {
            e.preventDefault();
            if (filtered[activeIndex]) {
              select(filtered[activeIndex]);
            }
          }
          break;

        case "Backspace":
          break;

        case "ArrowLeft":
        case "ArrowRight":
        case "Shift":
        case "Control":
        case "Alt":
        case "Meta":
          break;

        default:
          if (
            e.key.length === 1 &&
            !e.ctrlKey &&
            !e.altKey &&
            !e.metaKey &&
            !navigationKeys.includes(e.key)
          ) {
            if (!isTyping) {
              setIsTyping(true);
              setQuery(e.key);
              setOpen(true);
            }
          }
          break;
      }
    },
    [open, activeIndex, filtered, isTyping],
  );

  /* ---------------- SELECT ---------------- */
  const select = useCallback(
    (country) => {
      onChange(country);
      setOpen(false);
      setQuery("");
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    },
    [onChange],
  );

  /* ---------------- INPUT CHANGE ---------------- */
  const handleInputChange = (e) => {
    const val = e.target.value;

    setIsTyping(true);
    setQuery(val);
    setOpen(true);
    setActiveIndex(0);

    if (val === "" && value) {
      onChange(null);
    }
  };

  /* ---------------- INPUT FOCUS ---------------- */
  const handleInputFocus = () => {
    setOpen(true);
    setQuery("");
    setIsTyping(false);
    setTimeout(() => {
      if (value && !isTyping) {
        const idx = filtered.findIndex((c) => c.isoCode === value.isoCode);
        setActiveIndex(idx >= 0 ? idx : 0);
      } else {
        setActiveIndex(0);
      }
    }, 0);
  };

  /* ---------------- INPUT DISPLAY VALUE ---------------- */
  const inputValue = isTyping ? query : value ? value.name : "";

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      {/* INPUT */}
      <div className="bg-surface flex items-center gap-2 rounded-md px-3 py-2">
        {/* FLAG */}
        {value && !isTyping && (
          <ReactCountryFlag svg countryCode={value.isoCode} />
        )}

        <input
          ref={inputRef}
          value={inputValue}
          placeholder={value && !isTyping ? "" : placeholder}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm font-medium outline-none"
          aria-expanded={open}
          aria-haspopup="listbox"
          role="combobox"
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          ref={dropdownRef}
          className="border-muted/20 absolute z-50 mt-0.5 w-full rounded-md border bg-white shadow-md"
          role="listbox"
          aria-label="Country selection"
        >
          <ul className="scrollbar-hide max-h-60 overflow-auto py-1">
            {filtered.map((c, i) => (
              <li
                key={c.isoCode}
                ref={(el) => (itemRefs.current[i] = el)}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => select(c)}
                className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  i === activeIndex
                    ? " bg-primary-soft text-primary font-medium"
                    : "hover:bg-primary-bg"
                }`}
                role="option"
                aria-selected={i === activeIndex}
              >
                <ReactCountryFlag svg countryCode={c.isoCode} />
                <span>{c.name}</span>
              </li>
            ))}
            {!filtered?.length && (
              <li className="px-3 py-4 text-center text-sm text-gray-500">
                No countries found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
