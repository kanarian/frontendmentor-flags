import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import { CountryFromAPI } from '../Types/CountryFromAPI';
import { countryFromAPIMaker } from '../util/apiToFile';
import styles from './CountryPage.module.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { Country } from '../Types/Country';

const CountryPage = () => {
    const countryID = useParams().id
    const navigate = useNavigate();

    const {data} = useQuery(['getCountry', countryID], async () => {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryID}`).then(res => res.json()) as CountryFromAPI[]
        return res.map(el => countryFromAPIMaker(el)) 
    })
    

    const {isLoading, error, data: borderData} = useQuery(['borderCountries',data], async () => {
        var borderCountries = data?.at(0)?.borders
        console.log(borderCountries)
        const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountries?.join(',')}`)
        .then(res => res.json()) as CountryFromAPI[];
        return res.map(el => countryFromAPIMaker(el)) as Country[];
    }, {enabled: !!data?.at(0)?.borders})


    console.log(borderData)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>error!</div>

    if (!data || !borderData || data.length != 1 ) return <div> Oops an error!</div>


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

    const borderCountriesToShow = borderData.map(borderCountry => {return {code:borderCountry.cca3,name:borderCountry.name}})

    return (
        <div>
            <Header/>
            <div className="main-section">
                <div>
                    <div className={styles.buttonWrapper}>
                        <AiOutlineArrowLeft className={styles.buttonWrapperIcon}/>
                        <button onClick={() => navigate('/')}>Back</button>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.flagSection}>
                            <img src={thisCountry.flagUrl}/>
                        </div>
                        <div className={styles.informationSection}>
                            <div>
                                <h1>{thisCountry.name}</h1>
                            </div>
                            <ul>
                                {infoToShow.map((obj, idx) => {
                                    return(<li key={idx}><span>{obj.title} : </span>{obj.value}</li>)
                                })}
                            </ul>
                            <div className={styles.borderCountriesWrapper}>
                                <div>
                                    <span className={styles.fontweight600}>Border Countries</span>:
                                </div>
                                <div className={styles.borderCountriesButtonWrapper}>
                                    {borderCountriesToShow && borderCountriesToShow.map((obj, idx) => {
                                        return(
                                            <div className={`${styles.buttonWrapper} ${styles.buttonBorderContainer}`}>
                                                <button 
                                                key={idx} 
                                                onClick={() => navigate(`/country/${obj.code}`)}>
                                                    {obj.name}
                                                </button>
                                            </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryPage;