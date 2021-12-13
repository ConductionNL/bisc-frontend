import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { EducationGroupType, ParticipationEndReason, ParticipationGroupType } from 'api/types/types'
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

export const participationGroupFormationTypeTranslations: { [key in ParticipationGroupType]?: string } = {
    [ParticipationGroupType.Group]: i18n._(t`In een groep`),
    [ParticipationGroupType.Individually]: i18n._(t`Individueel`),
}

export const participationEndOptionsTranslations: Record<ParticipationEndReason, string> = {
    [ParticipationEndReason.Moved]: i18n._('Verhuisd'),
    [ParticipationEndReason.Work]: i18n._('Werk'),
    [ParticipationEndReason.Health]: i18n._('Ziekte/gezondheid'),
    [ParticipationEndReason.Deceased]: i18n._('Overlijden'),
    [ParticipationEndReason.CompletedSuccessfully]: i18n._('Succesvol afgerond'),
    [ParticipationEndReason.Family]: i18n._('Familie omstandigheden'),
    [ParticipationEndReason.DoesNotMeetExpectations]: i18n._('Voldoet niet aan verwachting deelnemer'),
    [ParticipationEndReason.Other]: i18n._('Overig'),
}
