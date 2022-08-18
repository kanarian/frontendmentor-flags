export type CountryFromAPI =  {
    cca3: string
    continents: Array<string>
    population: number
    flags:{
      png: string
    }
    name:{
      official: string
      common: string
      nativeName:{
        [key:string]:{
          official: string
          common: string
        }
      }
    }
    tld: Array<string>
    capital: Array<string>
    currencies: {
      [key:string]:{
        name: string
        symbol:string
      }
    }
    borders: Array<string>
    subregion: string
    languages: {
      [key:string]: string
    }
  }