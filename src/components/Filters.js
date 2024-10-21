
import React, { useState } from 'react';
import '../styles/Filters.css';

const Filters = ({ onFilterChange, fetchFilteredData }) => {
  const [sortOrder, setSortOrder] = useState('relevance');
  const [filterDate, setFilterDate] = useState('');
  const [filterComments, setFilterComments] = useState('');

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    onFilterChange({ sortOrder: newSortOrder, filterDate, filterComments });
    fetchFilteredData(newSortOrder, filterDate, filterComments); 
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFilterDate(newDate);
    onFilterChange({ sortOrder, filterDate: newDate, filterComments });
    fetchFilteredData(sortOrder, newDate, filterComments); 
  };

  const handleCommentsChange = (e) => {
    const newCommentsCount = e.target.value;
    setFilterComments(newCommentsCount);
    onFilterChange({ sortOrder, filterDate, filterComments: newCommentsCount });
    fetchFilteredData(sortOrder, filterDate, newCommentsCount); 
  };

  return (
    <div className='filters-container'>
      <label>Sort By: </label>
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="relevance">Relevance</option>
        <option value="date">Date</option>
        <option value="votes">Upvotes</option>
        <option value="comments">Number of Comments</option> 
      </select>

      <label>Filter by Date: </label>
      <input type="date" value={filterDate} onChange={handleDateChange} />

      <label>Filter by Comments Count: </label>
      <input
        type="number"
        value={filterComments}
        onChange={handleCommentsChange}
        placeholder="Min comments"
      />
    </div>
  );
};

export default Filters;
