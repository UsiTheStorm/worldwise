import React, { use } from 'react';

import { useCities } from '../contexts/CitiesContext';
import CountryItem from './CountryItem';
import Message from './Message';
import Spinner from './Spinner';

import styles from './CountryList.module.css';

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading)
    return <Spinner />;

  if (!cities.length)
    return <Message message="Start by searching for a city" />;

  const countriesMap = new Map();

  cities.forEach((city) => {
    if (!countriesMap.has(city.country)) {
      countriesMap.set(city.country, {
        country: city.country,
        emoji: city.emoji,
        id: city.id,
      });
    }
  });

  const countries = Array.from(countriesMap.values());

  // console.log(countries);

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
