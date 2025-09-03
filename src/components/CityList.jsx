import React from 'react';

import City from './City';
import styles from './CityList.module.css';
import Spinner from './Spinner';

function CityList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <City key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
