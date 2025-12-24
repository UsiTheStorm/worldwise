import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import styles from './User.module.css';

function User() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate('/');
  }

  useEffect(() => {
    if (!user)
      navigate('/');
  }, [user, navigate]);

  if (!user)
    return null;

  return (
    <div className={styles.user}>
      <img alt={user.name} src={user.avatar} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick} type="button">Logout</button>
    </div>
  );
}

export default User;
