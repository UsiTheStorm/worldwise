import { createContext, use, useEffect, useMemo, useState } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:3000';

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const value = useMemo(() => ({ cities, isLoading }), [cities, isLoading]);

  return <CitiesContext value={value}>{children}</CitiesContext>;
}

function useCities() {
  const context = use(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
