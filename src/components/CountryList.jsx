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

  const countries = cities.reduce((acc, item) => {
    if (!acc.map(el => el.country).includes(item.country)) {
      acc.push({
        id: item.id,
        country: item.country,
        emoji: item.emoji,
      });
    }
    return acc;
  }, []);

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
