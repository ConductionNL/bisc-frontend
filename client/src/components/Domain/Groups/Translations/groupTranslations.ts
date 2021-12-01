import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { EducationGroupType } from 'api/types/types'
import { ParticipationOfferCourseEnum } from 'generated/enums'

export const groupCourseTypeTranslations: { [key in ParticipationOfferCourseEnum]?: string } = {
    [ParticipationOfferCourseEnum.Digital]: i18n._(t`Digitale vaardigheden`),
    [ParticipationOfferCourseEnum.Language]: i18n._(t`Taal`),
    [ParticipationOfferCourseEnum.Math]: i18n._(t`Rekenen`),
    [ParticipationOfferCourseEnum.Other]: i18n._(t`Overige`),
}

export const groupFormationTypeTranslations: { [key in EducationGroupType]?: string } = {
    [EducationGroupType.Group]: i18n._(t`In een groep`),
    [EducationGroupType.Individually]: i18n._(t`Individueel`),
}
