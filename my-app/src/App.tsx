import { useEffect, useMemo, useState } from 'react';
import { useQuery} from 'react-query';
import './App.css';
import CardContainer from './Components/CardContainer';
import Header from './Components/Header';
import SearchField from './Components/SearchField';
import Selection from './Components/Selection';
import { Country } from './Types/Country';
import { CountryFromAPI } from './Types/CountryFromAPI';
import { countryFromAPIMaker } from './util/apiToFile';




function App(): JSX.Element {
  // const fetchAllCountriesFromAPI = (): any => fetch('https://restcountries.com/v3.1/all').then(res => res.json())
  // const { isLoading, error,  data } = useQuery('allCountries', fetchAllCountriesFromAPI);

  // const transformedData : Array<Country> = data?.map((countryEntry: CountryFromAPI) => {
  //     return{
  //       code: countryEntry.cca2,
  //       flagUrl: countryEntry.flags.png,
  //       name: countryEntry.name.official,
  //       continents: countryEntry.continents,
  //       population: countryEntry.population,
  //       capital: countryEntry.capital,
  //       borders: countryEntry.borders,
  //     }
  //   });

  const { isLoading, error, data } = useQuery(['getAllCountries'], async () => {
    const countryListFromAPI = await fetch('https://restcountries.com/v3.1/all').then(res => res.json()) as CountryFromAPI[]
    const transformedData = countryListFromAPI.map((countryEntry: CountryFromAPI) => {
      return countryFromAPIMaker(countryEntry)
    }) as Country[]
    return transformedData
  })

  const [shownCountries, setShownCountries] = useState<Country[]>()
  const [selectedRegion, setSelectedRegion] = useState('Any')
  const [text, setText] = useState("")


  function filterShownCountriesByNameAndRegion(text: string, continent: string): void{
    if (continent === "Any"){
      console.log('any')
      const filteredCountries = data?.filter(country => country.name.toLowerCase().includes(text.toLowerCase()));
      setShownCountries(filteredCountries)
    }
    else{
      const filteredCountries = data?.filter(country => country.continents.includes(continent) && country.name.toLowerCase().includes(text.toLowerCase()));
      setShownCountries(filteredCountries)
    }
  }

  useEffect(() =>{
    setShownCountries(data)
  },[data])

  useEffect(() =>{
    if(!data){
      return
    }
    console.log('filtering')
    filterShownCountriesByNameAndRegion(text,selectedRegion)
  },[text,selectedRegion])

  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred</>

  function getContinents() {
    var continents: string[] = []
    if (!data) return [""];
    const allDuplicateContinents = data.map(country => country.continents).flat()
    for(let i = 0; i < allDuplicateContinents.length; i++){
      if(!continents.includes(allDuplicateContinents[i])){
        continents.push(allDuplicateContinents[i])
      }
    }
    continents.sort()
    continents.unshift("Any")
    return continents
  }

  const continents = getContinents()

  return (
      <div className="App">
        <Header/>
        <div className="main-section">
          <div className="utility-tools">
            <SearchField callBackFunction={setText}/>
            <Selection options={continents} callBackFunction={setSelectedRegion}/>
          </div>
          <CardContainer countryList={shownCountries}/>
        </div>
      </div>
  );
}

export default App;