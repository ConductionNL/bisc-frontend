import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import {
    DesiredLearningMethod,
    DesiredSkills,
    EducationGroupType,
    EducationTeacherType,
    IntakeDayTimeActivities,
    IntakeFoundVia,
    IntakeNetwork,
    IntakeReferringOrganization,
    ReadingTestResult,
    WritingTestResult,
} from 'api/types/types'
import {
    StudentDutchLastKnownLevelEnum,
    StudentSpeakingLevelEnum,
    StudentJobDaytimeActivitiesEnum,
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
    [key in DesiredSkills]?: string
} = {
    [DesiredSkills.Kliktik]: i18n._(t`Klik & Tik`),
    [DesiredSkills.UsingWhatsapp]: i18n._(t`Leren whatsappen`),
    [DesiredSkills.UsingSkype]: i18n._(t`Leren skypen`),
    [DesiredSkills.DeviceFunctionalities]: i18n._(t`Functionaliteiten apparaat leren kennen`),
    [DesiredSkills.DigitalGovernment]: i18n._(t`Met digitale overheid werken`),
    [DesiredSkills.ReserveBooksInLibrary]: i18n._(t`Boeken kunnen reserveren in de bibliotheek`),
    [DesiredSkills.AdsOnMarktplaats]: i18n._(t`Een advertentie op marktplaats zetten`),
    [DesiredSkills.ReadForChildren]: i18n._(t`Voorlezen aan mijn (klein)kind`),
    [DesiredSkills.UnderstandPrescriptions]: i18n._(t`Een bijsluiter begrijpen`),
    [DesiredSkills.WriteApplicationLetter]: i18n._(t`Sollicitatiebrief schrijven`),
    [DesiredSkills.WritePostcardForFamily]: i18n._(t`Een kaart aan familie kunnen sturen`),
    [DesiredSkills.DoAdministration]: i18n._(t`Mijn eigen administratie kunnen doen`),
    [DesiredSkills.CalculationsForRecipes]: i18n._(t`Hoeveelheden bij een recept kunnen uitrekenen`),
    [DesiredSkills.Other]: i18n._(t`Anders, namelijk...`),
}

export const studentMotivationDesiredSkillsLabelEnumTranslations: {
    [key in DesiredSkills]?: string
} = {
    // same translations are intended
    [DesiredSkills.AdsOnMarktplaats]: i18n._(t`Digitaal vaardig worden`),
    [DesiredSkills.DeviceFunctionalities]: i18n._(t`Digitaal vaardig worden`),
    [DesiredSkills.DigitalGovernment]: i18n._(t`Digitaal vaardig worden`),
    [DesiredSkills.Kliktik]: i18n._(t`Digitaal vaardig worden`),
    [DesiredSkills.Other]: i18n._(t`Anders`),
    [DesiredSkills.ReserveBooksInLibrary]: i18n._(t`Digitaal vaardig worden`),
    [DesiredSkills.UsingSkype]: i18n._(t`Digitaal vaardig worden`),
    [DesiredSkills.UsingWhatsapp]: i18n._(t`Digitaal vaardig worden`),
    [DesiredSkills.CalculationsForRecipes]: i18n._(t`Beter leren rekenen`),
    [DesiredSkills.DoAdministration]: i18n._(t`Beter leren rekenen`),
    [DesiredSkills.ReadForChildren]: i18n._(t`Beter leren lezen`),
    [DesiredSkills.UnderstandPrescriptions]: i18n._(t`Beter leren lezen`),
    [DesiredSkills.WriteApplicationLetter]: i18n._(t`Beter leren schrijven`),
    [DesiredSkills.WritePostcardForFamily]: i18n._(t`Beter leren schrijven`),
}

export const studentMotivationDesiredLearningMethodsEnumTranslations: {
    [key in DesiredLearningMethod]?: string
} = {
    [DesiredLearningMethod.InAGroup]: i18n._(t`In een groep`),
    [DesiredLearningMethod.OneOnOne]: i18n._(t`Een-op-een`),
    [DesiredLearningMethod.HomeEnvironment]: i18n._(t`In thuis omgeving`),
    [DesiredLearningMethod.InLibraryOrOther]: i18n._(t`In de bibliotheek of elders`),
    [DesiredLearningMethod.Online]: i18n._(t`Online`),
}

export const studentWritingTestResultEnumTranslations: {
    [key in WritingTestResult]?: string
} = {
    [WritingTestResult.CanNotWrite]: i18n._(t`Kan niet schrijven`),
    [WritingTestResult.WriteNawDetails]: i18n._(t`Kan NAW gegevens schrijven`),
    [WritingTestResult.WriteSimpleLetters]: i18n._(t`Kan (eenvoudige) brieven schrijven`),
    [WritingTestResult.WriteSimpleTexts]: i18n._(t`Kan eenvoudige teksten schrijven (boodschappenbriefje etc.)`),
}

export const studentReadingTestResultEnumTranslations: {
    [key in ReadingTestResult]?: string
} = {
    [ReadingTestResult.A0]: i18n._(t`A0`),
    [ReadingTestResult.A1]: i18n._(t`A0`),
    [ReadingTestResult.A2]: i18n._(t`A2`),
    [ReadingTestResult.B1]: i18n._(t`B1`),
    [ReadingTestResult.B2]: i18n._(t`B2`),
    [ReadingTestResult.C1]: i18n._(t`C1`),
    [ReadingTestResult.C2]: i18n._(t`C2`),
    [ReadingTestResult.CanNotRead]: i18n._(t`Kan niet lezen`),
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

export const intakeDayTimeActivitiesEnumTranslations: {
    [key in IntakeDayTimeActivities]?: string
} = {
    [IntakeDayTimeActivities.SearchingForJob]: i18n._(t`Op zoek naar werk`),
    [IntakeDayTimeActivities.ReIntegration]: i18n._(t`Re-integratie`),
    [IntakeDayTimeActivities.School]: i18n._(t`Studie/school`),
    [IntakeDayTimeActivities.VolunteerJob]: i18n._(t`Vrijwilligerswerk`),
    [IntakeDayTimeActivities.Job]: i18n._(t`Werk`),
    [IntakeDayTimeActivities.Other]: i18n._(t`Anders, namelijk...`),
}
