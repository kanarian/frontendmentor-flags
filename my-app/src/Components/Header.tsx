import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'

const Header = () => {
    const navigate  = useNavigate()
    return (
        <div className={styles.header}>
            <div className={styles.headerLogo} onClick={() => {navigate('/')}}>
                Where in the world?
            </div>
            <div>
                Dark Mode
            </div>
        </div>
    );
};

export default Header;