import Select, { OptionsType } from 'components/Core/DataEntry/Select'
import * as countries from 'i18n-iso-countries'
const translationsForDutchCountries = require('i18n-iso-countries/langs/nl.json')

countries.registerLocale(translationsForDutchCountries)

const countriesObject = countries.getNames('nl', { select: 'official' })

const countryOptions: OptionsType[] = Object.keys(countriesObject).map(countryCode => {
    return {
        value: countryCode,
        label: countriesObject[countryCode],
    }
})

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CountrySelect: React.FunctionComponent<Props> = props => {
    return <Select {...props} onFocus={event => (event.target.autocomplete = 'off')} options={countryOptions} />
}

export function getCountryLabelByCode(code: string): string {
    return countries.getName(code, 'nl')
}
