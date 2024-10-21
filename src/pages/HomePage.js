import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Filters from '../components/Filters';
import EmailForm from '../components/EmailForm';
import { fetchResults } from '../api/searchAPI';
import { getCachedResults, cacheResults } from '../utils/cache';
import '../styles/HomePage.css'; 

const HomePage = () => {
  const [results, setResults] = useState({});
  const [filters, setFilters] = useState({});

  const handleSearch = async (query) => {
    const cached = getCachedResults(query);
    if (cached) {
      setResults(cached);
    } else {
      const newResults = await fetchResults(query);
      setResults(newResults);
      cacheResults(query, newResults);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
  };

  return (
    <div>
      <h1>Knowledge Base Application</h1>
      <SearchBar onSearch={handleSearch} />
      <Filters onFilterChange={handleFilterChange} />
      <SearchResults results={results} />
      <EmailForm results={results.stackOverflowResults || []} />
    </div>
  );
};

export default HomePage;
