import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedTopicEnum,
} from 'generated/enums'

export const learningNeedTopicTranslations: { [key in LearningNeedTopicEnum]?: string } = {
    [LearningNeedTopicEnum.Attitude]: i18n._(t`Houding`),
    [LearningNeedTopicEnum.Behaviour]: i18n._(t`Gedrag`),
    [LearningNeedTopicEnum.DigitalCommunication]: i18n._(t`Digitale vaardigheden: Communicatie`),
    [LearningNeedTopicEnum.DigitalProcessingInformation]: i18n._(
        t`Digitale vaardigheden: Informatie verwerken en presenteren`
    ),
    [LearningNeedTopicEnum.DigitalSearchingInformation]: i18n._(t`Digitale vaardigheden: Informatie zoeken`),
    [LearningNeedTopicEnum.DigitalUsingIctSystems]: i18n._(t`Digitale vaardigheden: ICT-systemen gebruiken`),
    [LearningNeedTopicEnum.DutchReading]: i18n._(t`Nederlands: Lezen`),
    [LearningNeedTopicEnum.DutchWriting]: i18n._(t`Nederlands: Schrijven`),
    [LearningNeedTopicEnum.Knowledge]: i18n._(t`Kennis`),
    [LearningNeedTopicEnum.MathGeometry]: i18n._(t`Rekenen: Meten en meetkunde`),
    [LearningNeedTopicEnum.MathLinks]: i18n._(t`Rekenen: Verbanden`),
    [LearningNeedTopicEnum.MathNumbers]: i18n._(t`Rekenen: Getallen`),
    [LearningNeedTopicEnum.MathProportion]: i18n._(t`Rekenen: Verhoudingen`),
    [LearningNeedTopicEnum.Other]: i18n._(t`Anders, namelijk:`),
    [LearningNeedTopicEnum.Skills]: i18n._(t`Vaardigheden`),
}

export const learningNeedApplicationTranslations: { [key in LearningNeedApplicationEnum]?: string } = {
    [LearningNeedApplicationEnum.AdministrationAndFinance]: i18n._(t`Arbeidsmarkt en werk`),
    [LearningNeedApplicationEnum.FamilyAndParenting]: i18n._(t`Gezin en opvoeden`),
    [LearningNeedApplicationEnum.HealthAndWellbeing]: i18n._(t`Gezondheid en welzijn`),
    [LearningNeedApplicationEnum.HousingAndNeighborhood]: i18n._(t`Honen en buurt`),
    [LearningNeedApplicationEnum.LaborMarketAndWork]: i18n._(t`Arbeidsmarkt en werk`),
    [LearningNeedApplicationEnum.Other]: i18n._(t`Anders, namelijk:`),
    [LearningNeedApplicationEnum.Selfreliance]: i18n._(t`Zelfredzaamheid`),
}

export const learningNeedLevelTranslations: { [key in LearningNeedLevelEnum]?: string } = {
    [LearningNeedLevelEnum.Inflow]: i18n._(t`Instroom`),
    [LearningNeedLevelEnum.Nlqf1]: i18n._(t`NLQF 1`),
    [LearningNeedLevelEnum.Nlqf2]: i18n._(t`NLQF 2`),
    [LearningNeedLevelEnum.Nlqf3]: i18n._(t`NLQF 3`),
    [LearningNeedLevelEnum.Nlqf4]: i18n._(t`NLQF 4`),
    [LearningNeedLevelEnum.Other]: i18n._(t`Anders, namelijk:`),
}

export const learningNeedOfferDifferencesTranslations: { [key in LearningNeedOfferDifferenceEnum]?: string } = {
    [LearningNeedOfferDifferenceEnum.No]: i18n._(t`Nee, er is geen verschil`),
    [LearningNeedOfferDifferenceEnum.YesDistance]: i18n._(t`Ja, want: niet aangeboden binnen bereisbare afstand`),
    [LearningNeedOfferDifferenceEnum.YesOther]: i18n._(t`Ja, want: anders`),
    [LearningNeedOfferDifferenceEnum.YesWaitinglist]: i18n._(t`Ja, want: wachtlijst`),
}
