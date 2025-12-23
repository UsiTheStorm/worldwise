import styles from './Button.module.css';

function Button({ children, htmlType = 'submit', onClick, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick} type={htmlType}>
      {children}
    </button>
  );
}

export default Button;
