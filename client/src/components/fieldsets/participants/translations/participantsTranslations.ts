import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { StudentCivicIntegrationRequirementEnum, StudentCivicIntegrationRequirementReasonEnum, StudentGenderEnum } from 'generated/graphql'

export const civicIntegrationRequirementTranslations: { [key in StudentCivicIntegrationRequirementEnum]?: string } = {
    [StudentCivicIntegrationRequirementEnum.No]: i18n._(t`Nee`),
    [StudentCivicIntegrationRequirementEnum.Yes]: i18n._(t`Ja`),
    [StudentCivicIntegrationRequirementEnum.CurrentlyWorkingOnIntegration]: i18n._(t`Volgt momenteel inburgering`),
}

export const civicIntegrationRequirementReasonTranslations: { [key in StudentCivicIntegrationRequirementReasonEnum]?: string } = {
    [StudentCivicIntegrationRequirementReasonEnum.ExemptedOrZroute]: i18n._(t`Vanwege vrijstelling of Z-route`),
    [StudentCivicIntegrationRequirementReasonEnum.FromEuCountry]: i18n._(t`Afkomstig uit EU land`),
    [StudentCivicIntegrationRequirementReasonEnum.Finished]: i18n._(t`Afgerond`),
}

export const genderTranslations: { [key in StudentGenderEnum]?: string } = {
    [StudentGenderEnum.Male]: i18n._(t`Man`),
    [StudentGenderEnum.Female]: i18n._(t`Vrouw`),
    [StudentGenderEnum.X]: i18n._(t`X`),
}
