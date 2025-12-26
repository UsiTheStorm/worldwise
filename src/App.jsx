import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import { AuthProvider } from './contexts/AuthContext';
import { CitiesProvider } from './contexts/CitiesContext';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import ProtectedRout from './pages/ProtectedRout';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Homepage />} index />
            <Route element={<Product />} path="/product" />
            <Route element={<Pricing />} path="/pricing" />
            <Route element={<Login />} path="/login" />
            <Route element={<ProtectedRout><AppLayout /></ProtectedRout>} path="/app">
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
    </AuthProvider>
  );
}

export default App;
