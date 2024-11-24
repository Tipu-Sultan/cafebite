import { useLocation } from 'react-router-dom';

const useGetQuery = () => {
  const location = useLocation();

  // Parse the query parameters using URLSearchParams
  const searchParams = new URLSearchParams(location.search);

  // Return a function to retrieve a specific query parameter
  const getQueryParam = (key) => searchParams.get(key);

  return getQueryParam;
};

export default useGetQuery;
