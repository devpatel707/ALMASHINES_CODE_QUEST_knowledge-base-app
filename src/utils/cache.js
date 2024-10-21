const cache = {};

export const getCachedResults = (query) => {
  return cache[query];
};

export const cacheResults = (query, results) => {
  cache[query] = results;
};
