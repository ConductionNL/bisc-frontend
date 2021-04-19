import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedTopicEnum,
} from 'generated/graphql'

export const learningNeedTopicTranslations: { [key in LearningNeedTopicEnum]?: string } = {
    [LearningNeedTopicEnum.Attitude]: i18n._(t`Attitude`),
    [LearningNeedTopicEnum.Behaviour]: i18n._(t`Behaviour`),
    [LearningNeedTopicEnum.DigitalCommunication]: i18n._(t`DigitalCommunication`),
    [LearningNeedTopicEnum.DigitalProcessingInformation]: i18n._(t`DigitalProcessingInformation`),
    [LearningNeedTopicEnum.DigitalSearchingInformation]: i18n._(t`DigitalSearchingInformation`),
    [LearningNeedTopicEnum.DigitalUsingIctSystems]: i18n._(t`DigitalUsingIctSystems`),
    [LearningNeedTopicEnum.DutchReading]: i18n._(t`DutchReading`),
    [LearningNeedTopicEnum.DutchWriting]: i18n._(t`DutchWriting`),
    [LearningNeedTopicEnum.Knowledge]: i18n._(t`Knowledge`),
    [LearningNeedTopicEnum.MathGeometry]: i18n._(t`MathGeometry`),
    [LearningNeedTopicEnum.MathLinks]: i18n._(t`MathLinks`),
    [LearningNeedTopicEnum.MathNumbers]: i18n._(t`MathNumbers`),
    [LearningNeedTopicEnum.MathProportion]: i18n._(t`MathProportion`),
    [LearningNeedTopicEnum.Other]: i18n._(t`Other`),
    [LearningNeedTopicEnum.Skills]: i18n._(t`Skills`),
}

export const learningNeedApplicationTranslations: { [key in LearningNeedApplicationEnum]?: string } = {
    [LearningNeedApplicationEnum.AdministrationAndFinance]: i18n._(t`AdministrationAndFinance`),
    [LearningNeedApplicationEnum.FamilyAndParenting]: i18n._(t`FamilyAndParenting`),
    [LearningNeedApplicationEnum.HealthAndWellbeing]: i18n._(t`HealthAndWellbeing`),
    [LearningNeedApplicationEnum.HousingAndNeighborhood]: i18n._(t`HousingAndNeighborhood`),
    [LearningNeedApplicationEnum.LaborMarketAndWork]: i18n._(t`LaborMarketAndWork`),
    [LearningNeedApplicationEnum.Other]: i18n._(t`Other`),
    [LearningNeedApplicationEnum.Selfreliance]: i18n._(t`Selfreliance`),
}

export const learningNeedLevelTranslations: { [key in LearningNeedLevelEnum]?: string } = {
    [LearningNeedLevelEnum.Inflow]: i18n._(t`Inflow`),
    [LearningNeedLevelEnum.Nlqf1]: i18n._(t`Nlqf1`),
    [LearningNeedLevelEnum.Nlqf2]: i18n._(t`Nlqf2`),
    [LearningNeedLevelEnum.Nlqf3]: i18n._(t`Nlqf3`),
    [LearningNeedLevelEnum.Nlqf4]: i18n._(t`Nlqf4`),
    [LearningNeedLevelEnum.Other]: i18n._(t`Other`),
}

export const learningNeedOfferDifferencesTranslations: { [key in LearningNeedOfferDifferenceEnum]?: string } = {
    [LearningNeedOfferDifferenceEnum.No]: i18n._(t`No`),
    [LearningNeedOfferDifferenceEnum.YesDistance]: i18n._(t`YesDistance`),
    [LearningNeedOfferDifferenceEnum.YesOther]: i18n._(t`YesOther`),
    [LearningNeedOfferDifferenceEnum.YesWaitinglist]: i18n._(t`YesWaitinglist`),
}
