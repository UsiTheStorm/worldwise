import styles from './CountryItem.module.css';

function CountryItem({ country }) {
  const isTruncated = country.country.length > 14;

  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span
        className={styles.countryName}
        title={isTruncated ? country.country : ''}
      >{country.country}
      </span>

    </li>
  );
}

export default CountryItem;
