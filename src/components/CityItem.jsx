import { Link } from 'react-router-dom';
// import { useCities } from '../contexts/CitiesContext';
import styles from './CityItem.module.css';

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

function CityItem({ city }) {
  const { cityName, emoji, date, notes } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 cityName={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button type="button" className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
