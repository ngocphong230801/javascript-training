/**
 * Get the value of a query parameter from the URL.
 * @param {string} parameterName - The name of the query parameter to retrieve.
 * @returns {string|null} - The value of the specified query parameter, or null if not found.
 */
export const getQueryParameter = (parameterName) => {
  // Get the full query string from the URL.
  const queryString = window.location.search;
  
  // Create a URLSearchParams object to handle the query parameters.
  const urlParams = new URLSearchParams(queryString);
  
  // Retrieve and return the value of the specified query parameter.
  return urlParams.get(parameterName);
};
