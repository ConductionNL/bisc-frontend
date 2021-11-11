import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import {
    CivicIntegrationReason,
    CivicIntegrationRequirement,
    ContactPreference,
    Gender,
    MaritalStatus,
} from 'api/types/types'

export const civicIntegrationRequirementTranslations: { [key in CivicIntegrationRequirement]?: string } = {
    [CivicIntegrationRequirement.No]: i18n._(t`Nee`),
    [CivicIntegrationRequirement.Yes]: i18n._(t`Ja`),
    [CivicIntegrationRequirement.CurrentlyWorkingOnIntegration]: i18n._(t`Volgt momenteel inburgering`),
}

export const civicIntegrationRequirementReasonTranslations: {
    [key in CivicIntegrationReason]?: string
} = {
    [CivicIntegrationReason.ExemptedOrZRoute]: i18n._(t`Vanwege vrijstelling of Z-route`),
    [CivicIntegrationReason.FromEuCountry]: i18n._(t`Afkomstig uit EU land`),
    [CivicIntegrationReason.Finished]: i18n._(t`Afgerond`),
}

export const genderTranslations: { [key in Gender]?: string } = {
    [Gender.Male]: i18n._(t`Man`),
    [Gender.Female]: i18n._(t`Vrouw`),
    [Gender.X]: i18n._(t`X`),
}

export const contactPreferenceTranslations: { [key in ContactPreference]?: string } = {
    [ContactPreference.Phonecall]: i18n._(t`Bellen`),
    [ContactPreference.Whatsapp]: i18n._(t`Whatsapp`),
    [ContactPreference.Email]: i18n._(t`Mailen`),
    [ContactPreference.Other]: i18n._(t`Anders, namelijk...`),
}

export const maritalStatusTranslations: { [key in MaritalStatus]?: string } = {
    [MaritalStatus.Divorced]: i18n._(t`Gescheiden`),
    [MaritalStatus.MarriedPartner]: i18n._(t`Getrouwd/partner`),
    [MaritalStatus.Single]: i18n._(t`Alleenstaand`),
    [MaritalStatus.Widow]: i18n._(t`Weduwe/weduwnaar`),
}
