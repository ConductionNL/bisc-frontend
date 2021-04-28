import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import isMobilePhone from 'validator/lib/isMobilePhone'

class PhoneNumber {
    public isPhoneNumber = (value: string | null) => {
        if (!value) {
            return null
        }
        if (!isMobilePhone(value, 'nl-NL')) {
            return i18n._(t`Dit is geen telefoonnummer`)
        }
        return null
    }
}

export const PhoneNumberValidators = new PhoneNumber()
