import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import {
    EducationGroupType,
    EducationLevel,
    EducationTeacherType,
    IntakeFoundVia,
    IntakeNetwork,
    IntakeReferringOrganization,
} from 'api/types/types'
import {
    StudentDutchLastKnownLevelEnum,
    StudentSpeakingLevelEnum,
    StudentJobDaytimeActivitiesEnum,
    StudentMotivationDesiredSkillsEnum,
    StudentMotivationDesiredLearningMethodsEnum,
    StudentWritingTestResultEnum,
    StudentReadingTestResultEnum,
    StudentLastFollowedEducationEnum,
    StudentFollowingEducationRightNowLevelEnum,
} from 'generated/enums'

export const studentReferringOrganizationEnumTranslations: { [key in IntakeReferringOrganization]?: string } = {
    [IntakeReferringOrganization.Uwv]: i18n._(t`Uitvoeringsinstituut Werknemersverzekeringen`),
    [IntakeReferringOrganization.SocialService]: i18n._(t`Sociale service`),
    [IntakeReferringOrganization.Library]: i18n._(t`Bibliotheek`),
    [IntakeReferringOrganization.WelfareWork]: i18n._(t`Welzijn`),
    [IntakeReferringOrganization.NeighborhoodTeam]: i18n._(t`Woonplaats team`),
    [IntakeReferringOrganization.VolunteerOrganization]: i18n._(t`Vrijwillige organisatie`),
    [IntakeReferringOrganization.LanguageProvider]: i18n._(t`Taal aanbieder`),
    [IntakeReferringOrganization.Other]: i18n._(t`Anders namelijk... `),
}

export const studentFoundViaEnumTranslations: { [key in IntakeFoundVia]?: string } = {
    [IntakeFoundVia.VolunteerCenter]: i18n._(t`Vrijwilliger`),
    [IntakeFoundVia.LibraryWebsite]: i18n._(t`Website van de bibliotheek`),
    [IntakeFoundVia.SocialMedia]: i18n._(t`Social media`),
    [IntakeFoundVia.Newspaper]: i18n._(t`Krant`),
    [IntakeFoundVia.ViaVia]: i18n._(t`Via via`),
    [IntakeFoundVia.Other]: i18n._(t`Anders namelijk...`),
}

export const studentNetworkEnumTranslations: { [key in IntakeNetwork]?: string } = {
    [IntakeNetwork.AcquaintancesSpeakingDutch]: i18n._(t`Bekenden die nederlands spreken`),
    [IntakeNetwork.AcquaintancesSpeakingOwnLanguage]: i18n._(t`Bekenden die dezelfde taal spreken `),
    [IntakeNetwork.AidWorkers]: i18n._(t`Hulpverleners`),
    [IntakeNetwork.FamilyMembers]: i18n._(t`Familieleden`),
    [IntakeNetwork.FriendsAcquaintances]: i18n._(t`Vrienden`),
    [IntakeNetwork.HouseholdMembers]: i18n._(t`Huisgenoten`),
    [IntakeNetwork.Neighbors]: i18n._(t`Buren`),
    [IntakeNetwork.PeopleAtMosqueChurch]: i18n._(t`Mensen bij een gebedshuis`),
}

export const studentDutchLastKnownLevelEnumTranslations: { [key in StudentDutchLastKnownLevelEnum]?: string } = {
    [StudentDutchLastKnownLevelEnum.A0]: i18n._(t`A0`),
    [StudentDutchLastKnownLevelEnum.A1]: i18n._(t`A1`),
    [StudentDutchLastKnownLevelEnum.A2]: i18n._(t`A2`),
    [StudentDutchLastKnownLevelEnum.B1]: i18n._(t`B1`),
    [StudentDutchLastKnownLevelEnum.B2]: i18n._(t`B2`),
    [StudentDutchLastKnownLevelEnum.C1]: i18n._(t`C1`),
    [StudentDutchLastKnownLevelEnum.C2]: i18n._(t`C2`),
    [StudentDutchLastKnownLevelEnum.Unknown]: i18n._(t`Onbekend`),
}

export const studentSpeakingLevelEnumEnumTranslations: { [key in StudentSpeakingLevelEnum]?: string } = {
    [StudentSpeakingLevelEnum.Beginner]: i18n._(t`Beginner`),
    [StudentSpeakingLevelEnum.Advanced]: i18n._(t`Redelijk`),
    [StudentSpeakingLevelEnum.Reasonable]: i18n._(t`Gevorderd`),
}

export const studentJobDaytimeActivitiesEnumTranslations: {
    [key in StudentJobDaytimeActivitiesEnum]?: string
} = {
    [StudentJobDaytimeActivitiesEnum.Job]: i18n._(t`Werk`),
    [StudentJobDaytimeActivitiesEnum.ReIntegration]: i18n._(t`Herintegratie`),
    [StudentJobDaytimeActivitiesEnum.School]: i18n._(t`School`),
    [StudentJobDaytimeActivitiesEnum.SearchingForJob]: i18n._(t`Werk zoekend`),
    [StudentJobDaytimeActivitiesEnum.VolunteerJob]: i18n._(t`Vrijwilligerswerk`),
    [StudentJobDaytimeActivitiesEnum.Other]: i18n._(t`Anders namelijk...`),
}

export const studentMotivationDesiredSkillsEnumTranslations: {
    [key in StudentMotivationDesiredSkillsEnum]?: string
} = {
    [StudentMotivationDesiredSkillsEnum.AdsOnMarktplaats]: i18n._(t`AdsOnMarktplaats`),
    [StudentMotivationDesiredSkillsEnum.CalculationsForRecipes]: i18n._(t`CalculationsForRecipes`),
    [StudentMotivationDesiredSkillsEnum.DeviceFunctionalities]: i18n._(t`DeviceFunctionalities`),
    [StudentMotivationDesiredSkillsEnum.DigitalGovernment]: i18n._(t`DigitalGovernment`),
    [StudentMotivationDesiredSkillsEnum.DoAdministration]: i18n._(t`DoAdministration`),
    [StudentMotivationDesiredSkillsEnum.Kliktik]: i18n._(t`Kliktik`),
    [StudentMotivationDesiredSkillsEnum.Other]: i18n._(t`Other`),
    [StudentMotivationDesiredSkillsEnum.ReadForChildren]: i18n._(t`ReadForChildren`),
    [StudentMotivationDesiredSkillsEnum.ReserveBooksInLibrary]: i18n._(t`ReserveBooksInLibrary`),
    [StudentMotivationDesiredSkillsEnum.UnderstandPrescriptions]: i18n._(t`UnderstandPrescriptions`),
    [StudentMotivationDesiredSkillsEnum.UsingSkype]: i18n._(t`UsingSkype`),
    [StudentMotivationDesiredSkillsEnum.UsingWhatsapp]: i18n._(t`UsingWhatsapp`),
    [StudentMotivationDesiredSkillsEnum.WriteApplicationLetter]: i18n._(t`WriteApplicationLetter`),
    [StudentMotivationDesiredSkillsEnum.WritePostcardForFamily]: i18n._(t`WritePostcardForFamily`),
}

export const studentMotivationDesiredSkillsLabelEnumTranslations: {
    [key in StudentMotivationDesiredSkillsEnum]?: string
} = {
    // same translations are intended
    [StudentMotivationDesiredSkillsEnum.AdsOnMarktplaats]: i18n._(t`Digitaal vaardig worden`),
    [StudentMotivationDesiredSkillsEnum.DeviceFunctionalities]: i18n._(t`Digitaal vaardig worden`),
    [StudentMotivationDesiredSkillsEnum.DigitalGovernment]: i18n._(t`Digitaal vaardig worden`),
    [StudentMotivationDesiredSkillsEnum.Kliktik]: i18n._(t`Digitaal vaardig worden`),
    [StudentMotivationDesiredSkillsEnum.Other]: i18n._(t`Anders`),
    [StudentMotivationDesiredSkillsEnum.ReserveBooksInLibrary]: i18n._(t`Digitaal vaardig worden`),
    [StudentMotivationDesiredSkillsEnum.UsingSkype]: i18n._(t`Digitaal vaardig worden`),
    [StudentMotivationDesiredSkillsEnum.UsingWhatsapp]: i18n._(t`Digitaal vaardig worden`),
    [StudentMotivationDesiredSkillsEnum.CalculationsForRecipes]: i18n._(t`Beter leren rekenen`),
    [StudentMotivationDesiredSkillsEnum.DoAdministration]: i18n._(t`Beter leren rekenen`),
    [StudentMotivationDesiredSkillsEnum.ReadForChildren]: i18n._(t`Beter leren lezen`),
    [StudentMotivationDesiredSkillsEnum.UnderstandPrescriptions]: i18n._(t`Beter leren lezen`),
    [StudentMotivationDesiredSkillsEnum.WriteApplicationLetter]: i18n._(t`Beter leren schrijven`),
    [StudentMotivationDesiredSkillsEnum.WritePostcardForFamily]: i18n._(t`Beter leren schrijven`),
}

export const studentMotivationDesiredLearningMethodsEnumTranslations: {
    [key in StudentMotivationDesiredLearningMethodsEnum]?: string
} = {
    [StudentMotivationDesiredLearningMethodsEnum.HomeEnvironment]: i18n._(t`HomeEnvironment`),
    [StudentMotivationDesiredLearningMethodsEnum.InAGroup]: i18n._(t`InAGroup`),
    [StudentMotivationDesiredLearningMethodsEnum.InLibraryOrOther]: i18n._(t`OneOnOne`),
    [StudentMotivationDesiredLearningMethodsEnum.OneOnOne]: i18n._(t`OneOnOne`),
    [StudentMotivationDesiredLearningMethodsEnum.Online]: i18n._(t`Online`),
}

export const studentWritingTestResultEnumTranslations: {
    [key in StudentWritingTestResultEnum]?: string
} = {
    [StudentWritingTestResultEnum.CanNotWrite]: i18n._(t`CanNotWrite`),
    [StudentWritingTestResultEnum.WriteNawDetails]: i18n._(t`WriteNawDetails`),
    [StudentWritingTestResultEnum.WriteSimpleLetters]: i18n._(t`WriteSimpleLetters`),
    [StudentWritingTestResultEnum.WriteSimpleTexts]: i18n._(t`WriteSimpleTexts`),
}

export const studentReadingTestResultEnumTranslations: {
    [key in StudentReadingTestResultEnum]?: string
} = {
    [StudentReadingTestResultEnum.A0]: i18n._(t`A0`),
    [StudentReadingTestResultEnum.A1]: i18n._(t`A0`),
    [StudentReadingTestResultEnum.A2]: i18n._(t`A2`),
    [StudentReadingTestResultEnum.B1]: i18n._(t`B1`),
    [StudentReadingTestResultEnum.B2]: i18n._(t`B2`),
    [StudentReadingTestResultEnum.C1]: i18n._(t`C1`),
    [StudentReadingTestResultEnum.C2]: i18n._(t`C2`),
    [StudentReadingTestResultEnum.CanNotRead]: i18n._(t`CanNotRead`),
}

export const educationTeacherTypeEnumTranslations: {
    [key in EducationTeacherType]?: string
} = {
    [EducationTeacherType.Professional]: i18n._(t`Professional`),
    [EducationTeacherType.Volunteer]: i18n._(t`Vrijwilliger`),
    [EducationTeacherType.Both]: i18n._(t`Beide`),
}

export const educationGroupTypeEnumTranslations: {
    [key in EducationGroupType]?: string
} = {
    [EducationGroupType.Group]: i18n._(t`Groep`),
    [EducationGroupType.Individually]: i18n._(t`Individueel`),
}
