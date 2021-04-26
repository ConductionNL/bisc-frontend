import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { StudentCivicIntegrationRequirementReasonEnum } from 'generated/graphql'

export const civicIntegrationRequirementReasonTranslations: { [key in StudentCivicIntegrationRequirementReasonEnum]?: string } = {
    [StudentCivicIntegrationRequirementReasonEnum.ExemptedOrZroute]: i18n._(t`Vanwege vrijstelling of Z-route`),
    [StudentCivicIntegrationRequirementReasonEnum.FromEuCountry]: i18n._(t`Afkomstig uit EU land`),
    [StudentCivicIntegrationRequirementReasonEnum.Finished]: i18n._(t`Afgerond`),
}
