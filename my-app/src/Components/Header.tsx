import React from 'react';
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerLogo}>
                Where in the world?
            </div>
            <div>
                Dark Mode
            </div>
        </div>
    );
};

export default Header;