"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Combobox from "./Combobox";

export default function ControlPanel({
   filters = [],
  onSearch,
  onFilterChange,
  onClearFilters,
  
}) {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  // Handle selecting a filter
  const handleFilterSelect = (name, option) => {
    setActiveFilters((prev) => ({ ...prev, [name]: option }));
    onFilterChange?.(name, option);
  };

  // Handle clearing all filters
  const handleClear = () => {
    setActiveFilters({});
    onClearFilters?.();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-md mb-4 space-y-3 md:space-y-0 p-3">
      {/* Search Bar */}
       <div className="flex md:mr-4 w-full md:w-auto gap-2">
        <Input
          type="text"
          placeholder="Search..."
          className="w-[200px] text-gray-700 text-base focus:outline-none"
          value={searchValue}
          onChange={(e) => {
            const value = e.target.value;
            setSearchValue(value);
            onSearch?.(value);
          }}
        />

        {/* Display active filter names */}
        {Object.keys(activeFilters).length > 0 && (
  <div className="mt-1 flex flex-wrap gap-2">
    {Object.entries(activeFilters).map(([name, value]) => (
      <span
        key={name}
        className="px-2 py-1 text-gray-800 rounded-full text-sm"
      >
        {name}: {value && typeof value === "object" ? value.label : value}
      </span>
    ))}
  </div>
)}
      </div>


      {/* Filters Section */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {filters.map((filter) => (
            <Combobox
              key={filter.name}
              value={activeFilters[filter.name]}
              onValueChange={(val) => handleFilterSelect(filter.name, val)}
              options={filter.options}
              placeholder={filter.name}
            />
          ))}

          {/* Clear All Filters Button */}
          <button
            onClick={handleClear}
            className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md border border-red-300 text-sm text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
