import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import isMobilePhone from 'validator/lib/isMobilePhone'

class PhoneNumber {
    public isPhoneNumber = (value: string | null) => {
        if (!value || !isMobilePhone(value, 'nl-NL')) {
            return i18n._(t`Dit is geen telefoon nummer`)
        }
        return null
    }
}

export const PhoneNumberValidators = new PhoneNumber()
