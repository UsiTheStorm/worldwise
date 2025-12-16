import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:3000';

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setCities(data);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);
  

  const getCity = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setCurrentCity(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(() => ({ cities, currentCity, getCity, isLoading }), [cities, isLoading, currentCity, getCity]);

  return <CitiesContext value={value}>{children}</CitiesContext>;
}

function useCities() {
  const context = use(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

/* eslint-disable react-refresh/only-export-components */
export { CitiesProvider, useCities };
