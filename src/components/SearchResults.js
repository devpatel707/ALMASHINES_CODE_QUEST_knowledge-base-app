import React, { useState } from 'react';
import '../styles/SearchResults.css'; 

const SearchResults = ({ results }) => {
  const [activeSection, setActiveSection] = useState('stackoverflow');
  const [sortOrder, setSortOrder] = useState('relevance');

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Function to handle sorting change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Function to sort Stack Overflow results
  const sortedStackOverflowResults = () => {
    return [...results.stackOverflowResults].sort((a, b) => {
      switch (sortOrder) {
        case 'date':
          return b.creation_date - a.creation_date;
        case 'votes':
          return b.score - a.score;
        case 'comments':
          return (b.is_answered ? 1 : 0) - (a.is_answered ? 1 : 0); 
        default: 
          return 0; 
      }
    });
  };

  // Function to sort Reddit results
  const sortedRedditResults = () => {
    return [...results.redditResults].sort((a, b) => {
      switch (sortOrder) {
        case 'date':
          return new Date(b.created_utc * 1000) - new Date(a.created_utc * 1000);
        case 'votes':
          return b.ups - a.ups;
        case 'comments':
          return b.num_comments - a.num_comments; 
        default:
          return 0;
      }
    });
  };

  return (
    <div className="results-container">
      <h2>Search Results</h2>
      
      <div className="section-nav">
        <button onClick={() => handleSectionChange('stackoverflow')} className={activeSection === 'stackoverflow' ? 'active' : ''}>
          Stack Overflow
        </button>
        <button onClick={() => handleSectionChange('reddit')} className={activeSection === 'reddit' ? 'active' : ''}>
          Reddit
        </button>
      </div>

     
      <div className="sort-options">
        <label>Sort By:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
          <option value="votes">Upvotes</option>
          <option value="comments">Number of Comments</option>
        </select>
      </div>

      {/* Stack Overflow Results */}
      {activeSection === 'stackoverflow' && results.stackOverflowResults?.length > 0 && (
        <div className="result-section">
          <h3>Stack Overflow</h3>
          {sortedStackOverflowResults().map((result) => (
            <div key={result.question_id} className="result-item">
              <h4>{result.title}</h4>
              <p><strong>Author:</strong> {result.owner.display_name}</p>
              <p><strong>Tags:</strong> {result.tags.join(', ')}</p>
              <p><strong>Creation Date:</strong> {new Date(result.creation_date * 1000).toLocaleDateString()}</p>
              <p><strong>Score:</strong> {result.score}</p>
              <p>{result.body?.substring(0, 100)}...</p>
              <p><strong>Comments:</strong> {result.is_answered ? 'Has Comments' : 'No Comments'}</p> 
              <a href={result.link} target="_blank" rel="noopener noreferrer">View Full Post</a>
            </div>
          ))}
        </div>
      )}

      {/* Reddit Results */}
      {activeSection === 'reddit' && results.redditResults?.length > 0 && (
        <div className="result-section">
          <h3>Reddit</h3>
          {sortedRedditResults().map((result) => (
            <div key={result.id} className="result-item">
              <h4>{result.title}</h4>
              <p><strong>Author:</strong> {result.author}</p>
              <p><strong>Subreddit:</strong> {result.subreddit}</p>
              <p><strong>Upvotes:</strong> {result.ups}</p>
              <p><strong>Creation Date:</strong> {new Date(result.created_utc * 1000).toLocaleDateString()}</p>
              <p>{result.selftext?.substring(0, 100)}...</p>
              <p><strong>Number of Comments:</strong> {result.num_comments}</p> 
              <a href={result.url} target="_blank" rel="noopener noreferrer">View Full Post</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
