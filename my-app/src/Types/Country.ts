export type Country = {
    code: string
    continents: Array<string>
    population: number
    flagUrl: string
    name: string
    nativeName:{
      [key:string]:{
        official: string
        common: string
      }
    }
    tld: Array<string>
    currencies: {
      [key:string]:{
        name: string
        symbol:string
      }
    }
    subregion: string
    languages: {
      [key:string]: string
    }
    capital: Array<string>
    borders: Array<string>
  }