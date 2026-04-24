import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base pl-12 bg-white border-gray-100 shadow-sm"
        placeholder="Search by subscription name..."
      />
    </div>
  );
};

export default SearchBar;
