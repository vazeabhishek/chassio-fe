export const getAuthHeaders = () => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
  
    return authToken ? { Authorization: `Bearer ${authToken}` } : {};
  };
  
  export const customFetch = (url, options = {}) => {
    const headers = {
      ...getAuthHeaders(),
      ...options.headers,
    };
  
    return fetch(url, { ...options, headers });
  };
  