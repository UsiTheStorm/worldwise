import React from 'react';

import { Link } from 'react-router-dom';

import PageNav from '../components/PageNav';

function Homepage() {
  return (
    <div>
      <PageNav />
      <p>Homepage</p>
      <Link to="/product">Product</Link>
    </div>
  );
}

export default Homepage;
