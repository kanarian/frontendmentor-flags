export type CountryFromAPI =  {
    cca2: string
    continents: Array<string>
    population: number
    flags:{
      png: string
    }
    name:{
      official: string
      nativeName: string
    }
    tld: Array<string>
    capital: Array<string>
    currencies: Array<string>
    borders: Array<string>
    subregion: string
    languages: object
  }