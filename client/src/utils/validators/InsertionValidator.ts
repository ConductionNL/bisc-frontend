import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { GenericValidators } from './GenericValidators'
interface StringsMatch {
    newPassword?: string
    repeatPassword?: string
}
class Insertion {
    public isValidInsertion = (value: string | null) => {
        const check = [GenericValidators.noCapitals(value), GenericValidators.noSpecialCharacters(value)]
        if (check.every(validator => validator !== null)) {
            return check[0]
        }
        return null
    }
}

export const InsertionValidators = new Insertion()
