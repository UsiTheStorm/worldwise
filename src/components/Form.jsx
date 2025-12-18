// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import useUrlPosition from '../hooks/useUrlPosition';
import BackButton from './BackButton';
import Button from './Button';
import Message from './Message';
import Spinner from './Spinner';

import styles from './Form.module.css';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(() => new Date());
  const [notes, setNotes] = useState('');
  const [lat, lng] = useUrlPosition();

  const [geocodingError, setGeocodingError] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const BASIC_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

  useEffect(() => {
    async function fetchCityData() {
      try {
        setGeocodingError('');
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASIC_URL}?latitude=${lat}&longitude=${lng}`);
        if (!res.ok)
          throw new Error('Failed to fetch city data');

        const data = await res.json();

        if (!data.countryCode) {
          throw new Error('There is no country for the provided coordinates. Please click somewhere else on the map😊');
        }

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName || '');
        setEmoji(convertToEmoji(data.countryCode || ''));
      }
      catch (err) {
        console.error(err);
        setGeocodingError(err.message);
      }
      finally {
        setIsLoadingGeocoding(false);
      }
    }
    if (lat && lng)
      fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding)
    return <Spinner />;

  if (geocodingError)
    return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={e => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />

      </div>
    </form>
  );
}

export default Form;
