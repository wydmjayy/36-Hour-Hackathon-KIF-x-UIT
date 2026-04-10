import React from 'react';

const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = ['All', 'Active', 'Zombie', 'Duplicate'];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-smooth border-2 ${
            activeFilter === filter
              ? 'bg-primary-500 border-primary-500 text-white shadow-md'
              : 'bg-white border-gray-100 text-gray-500 hover:border-primary-200'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
