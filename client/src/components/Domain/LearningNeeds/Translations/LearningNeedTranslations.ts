import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { LearningResultApplication, LearningResultLevel, LearningResultSubject } from 'api/types/types'
import { LearningNeedApplicationEnum, LearningNeedLevelEnum, LearningNeedOfferDifferenceEnum } from 'generated/enums'

export const learningResultSubjectTranslations: { [key in LearningResultSubject]?: string } = {
    [LearningResultSubject.Attitude]: i18n._(t`Houding`),
    [LearningResultSubject.Behaviour]: i18n._(t`Gedrag`),
    [LearningResultSubject.DigitalSkillsCommunication]: i18n._(t`Digitale vaardigheden: Communicatie`),
    [LearningResultSubject.DigitalSkillsProcessingAndPresentingInformation]: i18n._(
        t`Digitale vaardigheden: Informatie verwerken en presenteren`
    ),
    [LearningResultSubject.DigitalSkillsLookingForInformation]: i18n._(t`Digitale vaardigheden: Informatie zoeken`),
    [LearningResultSubject.DigitalSkillsUsingIctSystems]: i18n._(t`Digitale vaardigheden: ICT-systemen gebruiken`),
    [LearningResultSubject.DutchRead]: i18n._(t`Nederlands: Lezen`),
    [LearningResultSubject.DutchWrite]: i18n._(t`Nederlands: Schrijven`),
    [LearningResultSubject.Knowledge]: i18n._(t`Kennis`),
    [LearningResultSubject.MathematicsMeasurementAndGeometry]: i18n._(t`Rekenen: Meten en meetkunde`),
    [LearningResultSubject.ThematicsRelations]: i18n._(t`Rekenen: Verbanden`),
    [LearningResultSubject.MathematicsNumbers]: i18n._(t`Rekenen: Getallen`),
    [LearningResultSubject.MathematicsProportions]: i18n._(t`Rekenen: Verhoudingen`),
    [LearningResultSubject.Other]: i18n._(t`Anders, namelijk:`),
    [LearningResultSubject.Skills]: i18n._(t`Vaardigheden`),
}

export const learningResultApplicationTranslations: { [key in LearningResultApplication]?: string } = {
    [LearningResultApplication.LaborMarketAndWork]: i18n._(t`Arbeidsmarkt en werk`),
    [LearningResultApplication.FamilyAndUpbringing]: i18n._(t`Gezin en opvoeden`),
    [LearningResultApplication.HealthAndWellbeing]: i18n._(t`Gezondheid en welzijn`),
    [LearningResultApplication.LivingAndNeighborhood]: i18n._(t`Wonen en buurt`),
    [LearningResultApplication.SelfSustainability]: i18n._(t`Zelfredzaamheid`),
    [LearningResultApplication.Other]: i18n._(t`Anders, namelijk:`),
}

export const learningResultLevelTranslations: { [key in LearningResultLevel]?: string } = {
    [LearningResultLevel.Influx]: i18n._(t`Instroom`),
    [LearningResultLevel.Nlqf1]: i18n._(t`NLQF 1`),
    [LearningResultLevel.Nlqf2]: i18n._(t`NLQF 2`),
    [LearningResultLevel.Nlqf3]: i18n._(t`NLQF 3`),
    [LearningResultLevel.Nlqf4]: i18n._(t`NLQF 4`),
    [LearningResultLevel.Other]: i18n._(t`Anders, namelijk:`),
}

export const learningNeedOfferDifferencesTranslations: { [key in LearningNeedOfferDifferenceEnum]?: string } = {
    [LearningNeedOfferDifferenceEnum.No]: i18n._(t`Nee, er is geen verschil`),
    [LearningNeedOfferDifferenceEnum.YesDistance]: i18n._(t`Ja, want: niet aangeboden binnen bereisbare afstand`),
    [LearningNeedOfferDifferenceEnum.YesOther]: i18n._(t`Ja, want: anders`),
    [LearningNeedOfferDifferenceEnum.YesWaitinglist]: i18n._(t`Ja, want: wachtlijst`),
}
