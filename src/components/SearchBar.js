import React, { useState } from 'react';
import '../styles/SearchBar.css'


const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className='search-bar-container'>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
