import { Country } from "../Types/Country"
import { CountryFromAPI } from "../Types/CountryFromAPI"

export const countryFromAPIMaker = (countryEntry: CountryFromAPI) => {
    return {
        cca3: countryEntry.cca3,
        flagUrl: countryEntry.flags.png,
        name: countryEntry.name.common,
        continents: countryEntry.continents,
        population: countryEntry.population,
        capital: countryEntry.capital,
        borders: countryEntry.borders,
        nativeName: countryEntry.name.nativeName,
        tld: countryEntry.tld,
        currencies: countryEntry.currencies,
        subregion: countryEntry.subregion,
        languages: countryEntry.languages
  } as Country
}