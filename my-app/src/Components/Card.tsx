import React from 'react';
import { Country } from '../Types/Country';
import styles from './Card.module.css';

const Card = ({country} : {country:Country}) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardFlag}>
                <img src={country.flagUrl}></img>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                    <div><strong>{country.name}</strong></div>
                </div>
                <div>
                    <span className={styles.cardKeyword}>Population:</span> {country.population}
                </div>
                <div>
                    <span className={styles.cardKeyword}>Region:</span> {country.continents?.[0]}
                </div>
                <div>
                    <span className={styles.cardKeyword}>Capital:</span> {country.capital?.[0]}
                </div>
            </div>
        </div>
    );
};

export default Card;