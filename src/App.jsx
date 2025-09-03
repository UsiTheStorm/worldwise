import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CityList from './components/CityList';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';

import Product from './pages/Product';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CityList />} />

          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<p>list of countries</p>} />
          <Route path="form" element={<p>form</p>} />
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
