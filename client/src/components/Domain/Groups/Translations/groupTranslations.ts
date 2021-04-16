import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { GroupTypeCourseEnum, ParticipationGroupFormationEnum } from 'temp/TEMPORARYgraphql'

export const groupCourseTypeTranslations: { [key in GroupTypeCourseEnum]?: string } = {
    [GroupTypeCourseEnum.Digital]: i18n._(t`Digitale vaardigheden`),
    [GroupTypeCourseEnum.Language]: i18n._(t`Taal`),
    [GroupTypeCourseEnum.Math]: i18n._(t`Rekenen`),
    [GroupTypeCourseEnum.Other]: i18n._(t`Overige`),
}

export const groupFormationTypeTranslations: { [key in ParticipationGroupFormationEnum]?: string } = {
    [ParticipationGroupFormationEnum.InAGroup]: i18n._(t`In een groep`),
    [ParticipationGroupFormationEnum.Individually]: i18n._(t`Individueel`),
}
