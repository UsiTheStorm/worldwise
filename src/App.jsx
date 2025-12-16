import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import { CitiesProvider, useCities } from './contexts/CitiesContext';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';

import './App.css';
import Product from './pages/Product';

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Homepage />} index />
          <Route element={<Product />} path="/product" />
          <Route element={<Pricing />} path="/pricing" />
          <Route element={<Login />} path="/login" />
          <Route element={<AppLayout />} path="/app">
            <Route element={<Navigate replace to="cities" />} index />
            <Route element={<CityList />} path="cities" />
            <Route element={<City />} path="cities/:id" />
            <Route element={<CountryList />} path="countries" />
            <Route element={<Form />} path="form" />
          </Route>

          <Route element={<PageNotFound />} path="*" />

        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
