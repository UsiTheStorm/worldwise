import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';
import { AuthProvider } from './contexts/AuthContext';
import { CitiesProvider } from './contexts/CitiesContext';

import './App.css';

import ProtectedRout from './pages/ProtectedRout';

const AppLayout = lazy(() => import('./pages/AppLayout'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Product = lazy(() => import('./pages/Product'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
