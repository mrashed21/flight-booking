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
  /* ===================== STATE & REFS ===================== */
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedHighlightIndex, setSelectedHighlightIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(
    value !== undefined ? value : defaultValue
  );

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const optionRefs = useRef([]);
  const valueContainerRef = useRef(null);

  /* ===================== EFFECTS ===================== */

  // outside click
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

  // sync controlled value
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  // scroll highlighted option into view
  useEffect(() => {
    const el = optionRefs.current[highlightedIndex];
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  // reset highlight when open or search changes
  useEffect(() => {
    if (open) setHighlightedIndex(0);
  }, [open, search]);

  // auto scroll multi selected container to bottom
  useEffect(() => {
    if (isMulti && valueContainerRef.current) {
      valueContainerRef.current.scrollTop =
        valueContainerRef.current.scrollHeight;
    }
  }, [isMulti, internalValue]);

  /* ===================== DERIVED ===================== */

  const selected = isMulti
    ? Array.isArray(internalValue)
      ? internalValue
      : []
    : internalValue
    ? [internalValue]
    : [];

  const handleChange = (val) => {
    setInternalValue(val);
    onChange?.(val);
  };

  const selectOption = (option) => {
    if (isMulti) {
      handleChange([...selected, option]);
    } else {
      handleChange(option);
      setOpen(false);
    }
    setSearch("");
  };

  const removeOption = (option) => {
    if (isMulti) {
      handleChange(
        selected.filter((v) => getOptionValue(v) !== getOptionValue(option))
      );
    } else {
      handleChange(null);
    }
  };

  const filteredOptions = options.filter((o) => {
    const alreadySelected = selected.some(
      (s) => getOptionValue(s) === getOptionValue(o)
    );
    if (alreadySelected) return false;
    if (!isSearchable) return true;
    return getOptionLabel(o)
      ?.toString()
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  /* ===================== KEYBOARD ===================== */

  const handleKeyDown = (e) => {
    // multi: navigate selected items when closed
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
      {name && (
        <label htmlFor={id} className="block mb-1 text-muted text-sm font-medium">
          {name}
        </label>
      )}

      {/* Control */}
      <div
        ref={valueContainerRef}
        className="min-h-10 max-h-16 border border-muted rounded px-2 py-1
                   flex flex-wrap gap-1 items-center cursor-text bg-white
                   overflow-y-auto"
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
        onKeyDown={handleKeyDown}
      >
        <input type="hidden" id={id} name={name} />

        {/* Selected preview */}
        {selected.map((item, index) => (
          <span
            key={getOptionValue(item)}
            className={`px-2 py-1 rounded flex items-center gap-2 font-medium
              ${
                isMulti && index === selectedHighlightIndex
                  ? "bg-gray-200"
                  : "bg-primary-bg"
              }`}
          >
            <span className="truncate">{getOptionLabel(item)}</span>
            {isClearable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(item);
                }}
                className="cursor-pointer text-xs font-bold text-red-500"
                aria-label="remove"
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
            className="flex-1 outline-none text-sm min-w-30"
          />
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-20 w-full mt-0.5 border border-muted rounded
                        bg-white max-h-56 overflow-y-auto shadow"
        >
          {filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted">No options</div>
          )}

          {filteredOptions.map((opt, index) => (
            <div
              key={getOptionValue(opt)}
              ref={(el) => (optionRefs.current[index] = el)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectOption(opt)}
              className={`px-3 py-2 cursor-pointer text-sm flex justify-between items-center
                ${index === highlightedIndex ? "bg-primary-soft" : "hover:bg-primary-bg"}`}
            >
              {/* <-- Here is the only place where option display is used.
                    You can change this block to render any extra fields.
                    Currently showing only the label (getOptionLabel) */}
              <div className="truncate">{getOptionLabel(opt)}</div>

              {/* if you want value shown on right uncomment next line */}
              {/* <div className="text-xs text-muted">{getOptionValue(opt)}</div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
