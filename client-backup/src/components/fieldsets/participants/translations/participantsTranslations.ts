import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import {
    StudentCivicIntegrationRequirementEnum,
    StudentCivicIntegrationRequirementReasonEnum,
    StudentContactPreferenceEnum,
    StudentFamilyCompositionEnum,
    StudentGenderEnum,
} from 'generated/enums'

export const civicIntegrationRequirementTranslations: { [key in StudentCivicIntegrationRequirementEnum]?: string } = {
    [StudentCivicIntegrationRequirementEnum.No]: i18n._(t`Nee`),
    [StudentCivicIntegrationRequirementEnum.Yes]: i18n._(t`Ja`),
    [StudentCivicIntegrationRequirementEnum.CurrentlyWorkingOnIntegration]: i18n._(t`Volgt momenteel inburgering`),
}

export const civicIntegrationRequirementReasonTranslations: {
    [key in StudentCivicIntegrationRequirementReasonEnum]?: string
} = {
    [StudentCivicIntegrationRequirementReasonEnum.ExemptedOrZroute]: i18n._(t`Vanwege vrijstelling of Z-route`),
    [StudentCivicIntegrationRequirementReasonEnum.FromEuCountry]: i18n._(t`Afkomstig uit EU land`),
    [StudentCivicIntegrationRequirementReasonEnum.Finished]: i18n._(t`Afgerond`),
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
