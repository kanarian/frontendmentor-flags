import { Country } from "../Types/Country";

const codeToCountryNameMapper = (countryList: Country[]) => {
    var res = new Map<string,string>();
    countryList.map(country => {
        const cca3 = country.cca3
        res.set(cca3,country.name)
    })
    return res
}