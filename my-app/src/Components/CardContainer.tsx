import React from 'react';
import { Country } from '../Types/Country';
import Card from './Card';
import styles from './CardContainer.module.css'

const CardContainer = ({countryList} : {countryList: Country[] | undefined}) => {
    return (
        <div className={styles.cardContainer}>
            {countryList && countryList.map(country => {
                return <Card country={country}/>
            })}
        </div>
    );
};

export default CardContainer;