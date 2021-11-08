import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { CivicIntegrationReason, CivicIntegrationRequirement } from 'api/types/types'
import { StudentContactPreferenceEnum, StudentFamilyCompositionEnum, StudentGenderEnum } from 'generated/enums'

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

export const genderTranslations: { [key in StudentGenderEnum]?: string } = {
    [StudentGenderEnum.Male]: i18n._(t`Man`),
    [StudentGenderEnum.Female]: i18n._(t`Vrouw`),
    [StudentGenderEnum.X]: i18n._(t`X`),
}

export const contactPreferenceTranslations: { [key in StudentContactPreferenceEnum]?: string } = {
    [StudentContactPreferenceEnum.Phonecall]: i18n._(t`Bellen`),
    [StudentContactPreferenceEnum.Whatsapp]: i18n._(t`Whatsapp`),
    [StudentContactPreferenceEnum.Email]: i18n._(t`Mailen`),
    [StudentContactPreferenceEnum.Other]: i18n._(t`Anders, namelijk...`),
}

export const familyCompositionTranslations: { [key in StudentFamilyCompositionEnum]?: string } = {
    [StudentFamilyCompositionEnum.Divorced]: i18n._(t`Gescheiden`),
    [StudentFamilyCompositionEnum.MarriedPartner]: i18n._(t`Getrouwd/partner`),
    [StudentFamilyCompositionEnum.Single]: i18n._(t`Alleenstaand`),
    [StudentFamilyCompositionEnum.Widow]: i18n._(t`Weduwe/weduwnaar`),
}
