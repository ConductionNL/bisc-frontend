import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { GroupTypeCourseEnum } from 'temp/TEMPORARYgraphql'

export const groupCourseTypeTranslations: { [key in GroupTypeCourseEnum]?: string } = {
    [GroupTypeCourseEnum.Digital]: i18n._(t`Digitale vaardigheden`),
    [GroupTypeCourseEnum.Language]: i18n._(t`Taal`),
    [GroupTypeCourseEnum.Math]: i18n._(t`Rekenen`),
    [GroupTypeCourseEnum.Other]: i18n._(t`Overige`),
}
