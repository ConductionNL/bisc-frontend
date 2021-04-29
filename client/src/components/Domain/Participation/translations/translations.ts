import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import {
    StudentDutchLastKnownLevelEnum,
    StudentFollowingEducationRightNowLevelEnum,
    StudentFoundViaEnum,
    StudentJobDaytimeActivitiesEnum,
    StudentLastFollowedEducationEnum,
    StudentMotivationDesiredLearningMethodsEnum,
    StudentMotivationDesiredSkillsEnum,
    StudentNetworkEnum,
    StudentReadingTestResultEnum,
    StudentReferringOrganizationEnum,
    StudentSpeakingLevelEnum,
    StudentWritingTestResultEnum,
} from 'generated/graphql'

export const studentReferringOrganizationEnumTranslations: { [key in StudentReferringOrganizationEnum]?: string } = {
    [StudentReferringOrganizationEnum.Uwv]: i18n._(t`Uitvoeringsinstituut Werknemersverzekeringen`),
    [StudentReferringOrganizationEnum.SocialService]: i18n._(t`Sociale service`),
    [StudentReferringOrganizationEnum.Library]: i18n._(t`Bibliotheek`),
    [StudentReferringOrganizationEnum.WelfareWork]: i18n._(t`Welzijn`),
    [StudentReferringOrganizationEnum.NeighborhoodTeam]: i18n._(t`Woonplaats team`),
    [StudentReferringOrganizationEnum.VolunteerOrganization]: i18n._(t`Vrijwillige organisatie`),
    [StudentReferringOrganizationEnum.LanguageProvider]: i18n._(t`Taal aanbieder`),
    [StudentReferringOrganizationEnum.Other]: i18n._(t`Anders namelijk: `),
}

export const studentFoundViaEnumTranslations: { [key in StudentFoundViaEnum]?: string } = {
    [StudentFoundViaEnum.VolunteerCenter]: i18n._(t`Vrijwilliger`),
    [StudentFoundViaEnum.LibraryWebsite]: i18n._(t`Website van de bibliotheek`),
    [StudentFoundViaEnum.SocialMedia]: i18n._(t`Social media`),
    [StudentFoundViaEnum.Newspaper]: i18n._(t`Krant`),
    [StudentFoundViaEnum.ViaVia]: i18n._(t`Via via`),
    [StudentFoundViaEnum.Other]: i18n._(t`Anders namelijk: `),
}

export const studentNetworkEnumTranslations: { [key in StudentNetworkEnum]?: string } = {
    [StudentNetworkEnum.AcquaintancesSpeakingDutch]: i18n._(t`Bekenden die nederlands spreken`),
    [StudentNetworkEnum.AcquaintancesSpeakingOwnLanguage]: i18n._(t`Bekenden die dezelfde taal spreken `),
    [StudentNetworkEnum.AidWorkers]: i18n._(t`Hulpverleners`),
    [StudentNetworkEnum.FamilyMembers]: i18n._(t`Familieleden`),
    [StudentNetworkEnum.FriendsAcquaintances]: i18n._(t`Vrienden`),
    [StudentNetworkEnum.HouseholdMembers]: i18n._(t`Huisgenoten`),
    [StudentNetworkEnum.Neighbors]: i18n._(t`Buren`),
    [StudentNetworkEnum.PeopleAtMosqueChurch]: i18n._(t`Mensen bij een gebedshuis`),
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
    [StudentJobDaytimeActivitiesEnum.Other]: i18n._(t`Anders namelijk:`),
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

export const studentStudentLastFollowedEducationEnumTranslations: {
    [key in StudentLastFollowedEducationEnum]?: string
} = {
    [StudentLastFollowedEducationEnum.Hbo]: i18n._(t`Hbo`),
    [StudentLastFollowedEducationEnum.Mbo]: i18n._(t`Mbo`),
    [StudentLastFollowedEducationEnum.NoEducation]: i18n._(t`NoEducation`),
    [StudentLastFollowedEducationEnum.Po]: i18n._(t`Po`),
    [StudentLastFollowedEducationEnum.SomeYearsPo]: i18n._(t`SomeYearsPo`),
    [StudentLastFollowedEducationEnum.University]: i18n._(t`University`),
    [StudentLastFollowedEducationEnum.Vo]: i18n._(t`Vo`),
}

export const studentStudentFollowingEducationRightNowLevelEnumTranslations: {
    [key in StudentFollowingEducationRightNowLevelEnum]?: string
} = {
    [StudentFollowingEducationRightNowLevelEnum.Bo]: i18n._(t`Bo`),
    [StudentFollowingEducationRightNowLevelEnum.Hbo]: i18n._(t`Hbo`),
    [StudentFollowingEducationRightNowLevelEnum.LanguageCourse]: i18n._(t`LanguageCourse`),
    [StudentFollowingEducationRightNowLevelEnum.Wo]: i18n._(t`Wo`),
    [StudentFollowingEducationRightNowLevelEnum.Other]: i18n._(t`Other`),
}
