import React from 'react';

import styles from './Sidebar.module.css';

function SidebarFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Copyright &copy; {new Date().getFullYear()} by WorldWise Inc.
      </p>
    </footer>
  );
}

export default SidebarFooter;
