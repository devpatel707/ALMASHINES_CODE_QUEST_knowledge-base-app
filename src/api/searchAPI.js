import axios from 'axios';

// Base URLs for Stack Overflow and Reddit API
const STACK_OVERFLOW_API = 'https://api.stackexchange.com/2.2/search';
const REDDIT_API = 'https://www.reddit.com/search.json';

// Fetch Stack Overflow data
export const fetchStackOverflowResults = async (query) => {
  try {
    const response = await axios.get(STACK_OVERFLOW_API, {
      params: {
        order: 'desc',
        sort: 'relevance',
        intitle: query,
        site: 'stackoverflow',
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching Stack Overflow results:', error);
    return [];
  }
};

// Fetch Reddit data
export const fetchRedditResults = async (query) => {
  try {
    const response = await axios.get(REDDIT_API, {
      params: {
        q: query,
        sort: 'relevance',
        limit: 20,
      },
    });
    return response.data.data.children.map((child) => child.data);
  } catch (error) {
    console.error('Error fetching Reddit results:', error);
    return [];
  }
};

// Fetch combined results
export const fetchResults = async (query) => {
  const [stackOverflowResults, redditResults] = await Promise.all([
    fetchStackOverflowResults(query),
    fetchRedditResults(query),
  ]);
  return { stackOverflowResults, redditResults };
};
