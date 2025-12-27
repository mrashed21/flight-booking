"use client";

import { useEffect, useRef, useState } from "react";

const Select = ({
  id,
  name,
  options = [],
  value,
  defaultValue = null,
  onChange,
  placeholder = "Select...",
  isMulti = false,
  isDisabled = false,
  isClearable = false,
  isSearchable = true,
  className = "",
  getOptionLabel = (o) => o?.label,
  getOptionValue = (o) => o?.value,
}) => {
  /* ===================== STATE ===================== */

  // dropdown open / close
  const [open, setOpen] = useState(false);

  // search input value
  const [search, setSearch] = useState("");

  // highlighted index (used for dropdown options)
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // highlighted index for selected items (only for isMulti)
  const [selectedHighlightIndex, setSelectedHighlightIndex] = useState(-1);

  // internal value (supports controlled + defaultValue)
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);

  /* ===================== REFS ===================== */

  // wrapper for outside click detection
  const wrapperRef = useRef(null);

  // input ref (keyboard focus)
  const inputRef = useRef(null);

  // option refs (for dropdown auto scroll)
  const optionRefs = useRef([]);

  // selected value container ref (auto scroll bottom)
  const valueContainerRef = useRef(null);

  /* ===================== EFFECTS ===================== */

  // Close dropdown when clicking outside component
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setSelectedHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync internal value when controlled `value` changes
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  // Auto scroll dropdown option into view when highlightedIndex changes
  useEffect(() => {
    const el = optionRefs.current[highlightedIndex];
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  // Reset dropdown highlight when dropdown opens or search changes
  useEffect(() => {
    if (open) {
      setHighlightedIndex(0);
    }
  }, [open, search]);

  // Auto scroll selected values container to bottom (multi select UX)
  useEffect(() => {
    if (isMulti && valueContainerRef.current) {
      valueContainerRef.current.scrollTop =
        valueContainerRef.current.scrollHeight;
    }
  }, [isMulti, internalValue]);

  /* ===================== DERIVED ===================== */

  // Normalize selected value into array
  const selected = isMulti
    ? Array.isArray(internalValue)
      ? internalValue
      : []
    : internalValue
    ? [internalValue]
    : [];

  /* ===================== HANDLERS ===================== */

  // Central change handler
  const handleChange = (val) => {
    setInternalValue(val);
    onChange?.(val);
  };

  // Select option from dropdown
  const selectOption = (option) => {
    if (isMulti) {
      handleChange([...selected, option]);
    } else {
      handleChange(option);
      setOpen(false);
    }
    setSearch("");
  };

  // Remove selected option
  const removeOption = (option) => {
    if (isMulti) {
      handleChange(
        selected.filter((v) => getOptionValue(v) !== getOptionValue(option))
      );
    } else {
      handleChange(null);
    }
  };

  // Filter dropdown options (exclude already selected)
  const filteredOptions = options.filter((o) => {
    const alreadySelected = selected.some(
      (s) => getOptionValue(s) === getOptionValue(o)
    );
    if (alreadySelected) return false;
    if (!isSearchable) return true;
    return getOptionLabel(o)?.toLowerCase()?.includes(search.toLowerCase());
  });

  /* ===================== KEYBOARD ===================== */

  const handleKeyDown = (e) => {
    /* ---- MULTI SELECT: selected items keyboard remove ---- */
    if (isMulti && !open && selected.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedHighlightIndex((i) => Math.min(i + 1, selected.length - 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedHighlightIndex((i) => Math.max(i - 1, 0));
        return;
      }

      if (e.key === "Enter" && selectedHighlightIndex >= 0) {
        e.preventDefault();
        removeOption(selected[selectedHighlightIndex]);
        setSelectedHighlightIndex(-1);
        return;
      }
    }

    /* ---- DROPDOWN KEYBOARD NAVIGATION ---- */
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (!open) {
        setOpen(true);
        setHighlightedIndex(0);
        return;
      }

      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    }

    if (!open) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const opt = filteredOptions[highlightedIndex];
      if (opt) selectOption(opt);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  /* ===================== RENDER ===================== */

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className} ${
        isDisabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <label htmlFor={id} className="text-muted">
        {name}
      </label>

      {/* Control */}
      <div
        ref={valueContainerRef}
        className="min-h-10 max-h-16 border border-muted rounded px-2 py-1
                   flex flex-wrap gap-1 items-center cursor-text bg-white
                   overflow-y-auto scrollbar-hide"
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
      >
        <input type="hidden" id={id} name={name} />

        {/* Selected preview */}
        {selected.map((item, index) => (
          <span
            key={getOptionValue(item)}
            className={`px-2 py-1 rounded text-sm flex items-center gap-1
              ${
                isMulti && index === selectedHighlightIndex
                  ? "bg-gray-300"
                  : "bg-primary-bg"
              }`}
          >
            {getOptionLabel(item)}
            {isClearable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(item);
                }} className="cursor-pointer text-red-500 font-bold text-xs"
              >
                ✕
              </button>
            )}
          </span>
        ))}

        {/* Input */}
        {isSearchable && (isMulti || selected.length === 0) && (
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 outline-none text-sm"
          />
        )}
      </div>

      {/* Dropdown */}
      {open && filteredOptions.length > 0 && (
        <div
          className="absolute z-20 w-full mt-0.5 border border-muted rounded
                        bg-white max-h-56 overflow-y-auto shadow scrollbar-hide"
        >
          {filteredOptions.map((opt, index) => (
            <div
              key={getOptionValue(opt)}
              ref={(el) => (optionRefs.current[index] = el)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectOption(opt)}
              className={`px-3 py-2 cursor-pointer text-sm ${
                index === highlightedIndex
                  ? "bg-primary-soft"
                  : "hover:bg-primary-bg"
              }`}
            >
              {getOptionLabel(opt)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
