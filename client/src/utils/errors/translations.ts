import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { ErrorCode, ErrorTranslationType } from './types'

export const genericErrorTranslations: ErrorTranslationType[] = [
    {
        errorCode: ErrorCode.AuthenticationFailed,
        title: i18n._(t`Het authoiriseren van de gebruiker is mislukt`),
        message: i18n._(t`Probeer opnieuw in te loggen`),
    },
    {
        errorCode: ErrorCode.AuthorizationFailed,
        title: i18n._(t`De gebruiker heeft onvoldoende rechten`),
        message: i18n._(t`Neem contact op met uw beheerder`),
    },
    {
        errorCode: ErrorCode.PasswordConfirmationFailed,
        title: i18n._(t`De wachtwoorden komen niet overeen`),
        message: i18n._(t`controleer of je de wachtwoorden goed hebt ingevuld`),
    },
]
