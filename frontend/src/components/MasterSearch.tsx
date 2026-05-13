import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import type { SearchParams } from "../types";

interface MasterSearchProps {
  onSearch: (params: SearchParams) => void;
}

export const MasterSearch: React.FC<MasterSearchProps> = ({ onSearch }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: "",
    material: "",
    location: "",
    hardware: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleClear = () => {
    const cleared: SearchParams = {
      search: "",
      material: "",
      location: "",
      hardware: "",
    };
    setSearchParams(cleared);
    onSearch(cleared);
  };

  const hasActiveFilters = Object.values(searchParams).some((v) => v !== "");

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              name="search"
              value={searchParams.search}
              onChange={handleChange}
              placeholder="Search techniques, descriptions, instructions..."
              className="input-field pl-10"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? "bg-nautical-100 text-nautical-700" : ""}`}
          >
            <Filter size={20} />
            Filters
          </button>
          <button type="submit" className="btn-primary">
            Search
          </button>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="btn-secondary flex items-center gap-2"
            >
              <X size={20} />
              Clear
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={searchParams.material}
                onChange={handleChange}
                placeholder="e.g., Teak, Mahogany"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={searchParams.location}
                onChange={handleChange}
                placeholder="e.g., High-moisture, Exterior"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hardware Name
              </label>
              <input
                type="text"
                name="hardware"
                value={searchParams.hardware}
                onChange={handleChange}
                placeholder="e.g., Blum Hinge, Southco"
                className="input-field"
              />
            </div>
          </div>
        )}
      </form>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600">Active filters:</span>
          {searchParams.search && (
            <span className="px-3 py-1 bg-nautical-100 text-nautical-700 text-sm rounded-full">
              Search: {searchParams.search}
            </span>
          )}
          {searchParams.material && (
            <span className="px-3 py-1 bg-nautical-100 text-nautical-700 text-sm rounded-full">
              Material: {searchParams.material}
            </span>
          )}
          {searchParams.location && (
            <span className="px-3 py-1 bg-nautical-100 text-nautical-700 text-sm rounded-full">
              Location: {searchParams.location}
            </span>
          )}
          {searchParams.hardware && (
            <span className="px-3 py-1 bg-nautical-100 text-nautical-700 text-sm rounded-full">
              Hardware: {searchParams.hardware}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
