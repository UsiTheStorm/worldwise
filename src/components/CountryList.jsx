import React from 'react';

import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList({ cities, isLoading }) {
  if (isLoading)
    return <Spinner />;

  if (!cities.length)
    return <Message message="Start by searching for a city" />;

  const countriesMap = new Map();

  cities.forEach((city) => {
    if (!countriesMap.has(city.country)) {
      countriesMap.set(city.country, {
        id: city.id,
        country: city.country,
        emoji: city.emoji,
      });
    }
  });

  const countries = Array.from(countriesMap.values());

  // console.log(countries);

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
