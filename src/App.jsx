import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Product from './pages/Product';

import './App.css';

const BASE_URL = 'http://localhost:3000';

function App() {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Homepage />} index />
        <Route element={<Product />} path="/product" />
        <Route element={<Pricing />} path="/pricing" />
        <Route element={<Login />} path="/login" />
        <Route element={<AppLayout />} path="/app">
          <Route element={<Navigate replace to="cities" />} index />

          <Route element={<CityList cities={cities} isLoading={isLoading} />} path="cities" />
          <Route element={<City />} path="cities/:id" />
          <Route element={<CountryList cities={cities} isLoading={isLoading} />} path="countries" />
          <Route element={<Form />} path="form" />
        </Route>

        <Route element={<PageNotFound />} path="*" />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
