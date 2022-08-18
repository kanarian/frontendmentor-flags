import React from 'react';
import styles from './Selection.module.css'

const Selection = ({options, callBackFunction} : {options : string[], callBackFunction: (e: string) => void} ) => {
    return (
        <div className={styles.selectionWrapper}>
            <select onChange={e=>callBackFunction(e.target.value)}>
                {options.map((option, idx) =>{
                    return <option value={option} key={idx}>{option}</option>
                })}
            </select>
        </div>
    );
};

export default Selection;