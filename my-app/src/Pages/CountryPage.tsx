import React from 'react';
import { useQueries, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import { Country } from '../Types/Country';
import { CountryFromAPI } from '../Types/CountryFromAPI';
import { countryFromAPIMaker } from '../util/apiToFile';
import styles from './CountryPage.module.css'

const CountryPage = () => {
    const countryID = useParams().id

    const {isLoading, error, data} = useQuery(['getCountry', countryID], async () => {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryID}`).then(res => res.json()) as CountryFromAPI[]
        return res.map(el => countryFromAPIMaker(el)) 
    })


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>error!</div>

    if (!data || data.length != 1 ) return <div> Oops an error!</div> 



    
    const thisCountry = data[0]

    const allNativeNameKeys = Object.keys(thisCountry.nativeName)
    const nativeNamesToDisplay = allNativeNameKeys.map(nativeName => thisCountry.nativeName[nativeName].common)

    const allCurrencyKeys = Object.keys(thisCountry.currencies)
    const allCurrencyNames = allCurrencyKeys.map(currencyKey => thisCountry.currencies[currencyKey].name)
    
    const allLanguageKeys = Object.keys(thisCountry.languages)
    const allLanguageNames = allLanguageKeys.map(languageKey => thisCountry.languages[languageKey])

    const infoToShow= [
        {
            title: 'Native name',
            value: nativeNamesToDisplay.join(", ")
        },
        {
            title: 'Population',
            value: thisCountry.population
        },
        {
            title: 'Region',
            value: thisCountry.continents.join(", ")
        },
        {
            title: 'Sub Region',
            value: thisCountry.subregion,
        },
        {
            title: 'Top Level Domain',
            value: thisCountry.tld.join(", ")
        },
        {
            title: 'Currencies',
            value: allCurrencyNames.join(", ")
        },
        {
            title: 'Languages',
            value: allLanguageNames.join(", ")
        },
        
    ]

    return (
        <div>
            <Header/>
            <div className="main-section">
                <div>
                    <div className={styles.backButtonWrapper}>
                        <button>back</button>
                    </div>
                    <div className={styles.flagSection}>
                        <img src={thisCountry.flagUrl}/>
                    </div>
                    <div className={styles.informationSection}>
                        <div>
                            <h3>{thisCountry.name}</h3>
                        </div>
                        <ul>
                            {infoToShow.map((obj, idx) => {
                                return(<li key={idx}><span>{obj.title} : </span>{obj.value}</li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryPage;