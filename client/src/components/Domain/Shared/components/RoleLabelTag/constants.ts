import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { UserRoleEnum } from 'generated/graphql'

export const roleTranslations = {
    [UserRoleEnum.AanbiederCoordinator]: i18n._(t`Coördinator`),
    [UserRoleEnum.TaalhuisCoordinator]: i18n._(t`Coördinator`),
    [UserRoleEnum.AanbiederMentor]: i18n._(t`Begeleider`),
    [UserRoleEnum.AanbiederVolunteer]: i18n._(t`Vrijwilliger`),
    [UserRoleEnum.TaalhuisEmployee]: i18n._(t`Medewerker`),
}
