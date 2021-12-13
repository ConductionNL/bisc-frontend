import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { DefaultSelectOption } from 'components/Core/DataEntry/NewSelectV2'
import isObject from 'lodash/isObject'

class Generic {
    public required = (value: string | null) => {
        if (!value) {
            return i18n._(t`Dit veld is verplicht`)
        }
        return null
    }

    public noSpecialCharacters = (value: string | null) => {
        const noSpecialCharacters = /'^[a-zA-Z0-9]{4,10}$'/
        if (!value) {
            return null
        }
        if (!noSpecialCharacters.test(value)) {
            return i18n._(t`Speciale karakters zijn niet toegestaan`)
        }
        return null
    }

    public noCapitals = (value: string | null) => {
        const noSpecialCharacters = /(?!^.*[A-Z]{2,}.*$)^[A-Za-z]*$/
        if (!value) {
            return null
        }
        if (!noSpecialCharacters.test(value)) {
            return i18n._(t`Hoofdletters zijn niet toegestaan`)
        }
        return null
    }

    public selectedOptionFromOptions(value: string | null, options: (string | DefaultSelectOption)[]) {
        const correspondingOption = options.find(option => {
            if (isObject(option)) {
                return option.value === value
            }
            return option === value
        })

        if (correspondingOption) {
            return i18n._(t`De waarde staat niet gelijk aan een waarde uit de lijst`)
        }

        return null
    }
}

export const GenericValidators = new Generic()
