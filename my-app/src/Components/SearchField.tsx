import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './SearchField.module.css'
import {HiSearch} from 'react-icons/hi';
import { Country } from '../Types/Country';

const SearchField = ({callBackFunction} : {callBackFunction: (e: string) => void}) => {

    return (
        <div className={styles.searchField}>
            <HiSearch style={{backgroundColor:'white'}} />
            <input
                type="text" 
                placeholder="Search for a country..."
                onChange={(e) => callBackFunction(e.target.value)}
                >
            </input>
        </div>
    );
};

export default SearchField;