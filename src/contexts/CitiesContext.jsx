import { createContext, use, useCallback, useEffect, useMemo, useReducer } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:3000';

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'cities/loaded':
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case 'city/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };
    case 'city/loaded':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'rejected':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        dispatch({ payload: data, type: 'cities/loaded' });
      }
      catch (err) {
        console.error('Error loading cities:', err);
        dispatch({ payload: 'Error loading cities', type: 'rejected' });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async (id) => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      dispatch({ payload: data, type: 'city/loaded' });
    }
    catch (error) {
      console.error(error);
      dispatch({ payload: 'Error loading city', type: 'rejected' });
    }
  }, []);

  const createCity = useCallback(async (newCity) => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();

      dispatch({ payload: data, type: 'city/created' });
    }
    catch (error) {
      console.error(error);
      dispatch({ payload: 'Error creating city', type: 'rejected' });
    }
  }, []);

  const deleteCity = useCallback(async (id) => {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ payload: id, type: 'city/deleted' });
    }
    catch (error) {
      console.error('Error deleting city:', error);
      dispatch({ payload: 'Error deleting city', type: 'rejected' });
    }
  }, []);

  // const clearCurrentCity = useCallback(() => {
  //   setCurrentCity(undefined);
  // }, []);

  const value = useMemo(() => ({ cities, createCity, currentCity, deleteCity, getCity, isLoading }), [cities, isLoading, currentCity, getCity, createCity, deleteCity]);

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
