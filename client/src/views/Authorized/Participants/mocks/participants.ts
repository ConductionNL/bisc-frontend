import times from 'lodash/times'
import { DutchNTFieldsetModel } from '../../../../components/fieldsets/shared/ DutchNTInformationFieldset'
import { AvailabillityFieldsetModel } from '../../../../components/fieldsets/shared/AvailabillityFieldset'
import { ContactInformationFieldsetModel } from '../../../../components/fieldsets/shared/ContactInformationFieldset'
import { CourseInformationFieldsetModel } from '../../../../components/fieldsets/shared/CourseInformationFieldset'
import { EducationInformationFieldsetModel } from '../../../../components/fieldsets/shared/EducationInformationFieldset'
import { GeneralInformationFieldsetModel } from '../../../../components/fieldsets/shared/GeneralInformationFieldset'
import { BackgroundInformationFieldsetModel } from '../../../../components/fieldsets/shared/participants/BackgroundInformationFieldset'
import { CivicIntegrationFieldsetModel } from '../../../../components/fieldsets/shared/participants/CivilIntegrationInformationFieldset'
import { LevelInformationFieldsetModel } from '../../../../components/fieldsets/shared/participants/LevelInformationFieldset'
import { MotivationInformationFieldsetModel } from '../../../../components/fieldsets/shared/participants/MotivationInformationFieldset'
import { ReadingTestInformationFieldsetModel } from '../../../../components/fieldsets/shared/participants/ReadingTestInformationFieldset'
import { RefererInformationFieldsetModel } from '../../../../components/fieldsets/shared/participants/ReferrerInformationFieldset'
import { WorkInformationFieldsetModel } from '../../../../components/fieldsets/shared/participants/WorkInformationFieldset'
import { WritingInformationFieldsetModel } from '../../../../components/fieldsets/shared/participants/WritingInformationFieldset'
import { PersonInformationFieldsetModel } from '../../../../components/fieldsets/shared/PersonInformationFieldset'

export const taalhuizenParticipantsMock: ParticipantsMock[] = times(3, num => ({
    id: '1234523525',
    lastName: 'André',
    nickName: `Willemse`,
    insertion: '',
    gender: 'Man',
    dateOfBirth: '21-09-1985',
    countryOfOrigin: 'Mozambique',
    phone: '',
    street: 'Postweg',
    streetNr: '5',
    postalCode: '1234 AB',
    email: 'andrewillemse@email.com',
    city: 'Utrecht',
    phoneNumberContactPerson: '06 12 34 56 78',
    contactPreference: 'Bellen',
    civicIntegrationRequirement: 'Nee',
    civicIntegrationRequirementReason: 'Afgerond',
    notifyingParty: 'XYZ',
    referrerEmailAddress: 'verwijzer@email.nl',
    foundVia: 'Via via',
    foundViaBefore: 'Nee',
    network: ['Gezinsleden', 'Buren', 'Hulpverleners', 'Vrienden, kennissen'],
    participationLadder: '2 sociale contacten',
    NTLevel: 'NT1',
    languageLevel: 'Redelijk',
    lastEducation: 'NT1',
    graduated: 'Nee',
    currentEducation: 'Nee',
    course: 'Nee',
    trained: 'Schaapsherder',
    lastWorkplace: 'Mc Donalds',
    dayTimeActivities: [''],
    skills: [''],
    triedThisSkillBefore: 'Nee',
    reasonWhy: 'Niet gemotiveerd',
    learningReason: 'Ik wil mijn kinderen helpen',
    whyNowLearningReason: 'I.v.m. thuisonderwijs',
    learningPreference: ['In een groep', 'Online'],
    remark: 'Lijkt erg gemotiveerd',
    available: '',
    note: 'Dinsdagochtend is optioneel',
    writingResults: 'Kan eenvoudige teksten schrijven (boodschappenbriefje etc.)',
    readingResults: 'A2',
    nativeLanguage: 'Portugees',
    otherLanguages: ['-'],
    familyComposition: ['Weduwe/weduwnaar'],
    numberOfChildren: '2',
    dateOfBirthChildren: ['01-01-2010', '02-02-2012'],
    runningParticipants: '1',
    completedParticipants: '0',
    createdAt: `01-01-21`,
    editedAt: `01-01-21`,
}))

export interface ParticipantsMock
    extends CivicIntegrationFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetModel,
        GeneralInformationFieldsetModel,
        RefererInformationFieldsetModel,
        BackgroundInformationFieldsetModel,
        DutchNTFieldsetModel,
        LevelInformationFieldsetModel,
        EducationInformationFieldsetModel,
        CourseInformationFieldsetModel,
        WorkInformationFieldsetModel,
        MotivationInformationFieldsetModel,
        AvailabillityFieldsetModel,
        ReadingTestInformationFieldsetModel,
        WritingInformationFieldsetModel {
    id: string
    runningParticipants: string
    completedParticipants: string
    createdAt: string
    editedAt: string
}

export const taalhuisParticipantsCreateResponse = {
    id: '1234523525',
    lastName: 'André',
    nickName: `Willemse`,
    insertion: '',
    gender: 'Man',
    dateOfBirth: '21-09-1985',
    countryOfOrigin: 'Mozambique',
    phone: '',
    street: 'Postweg',
    streetNr: '5',
    postalCode: '1234 AB',
    email: 'andrewillemse@email.com',
    city: 'Utrecht',
    phoneNumberContactPerson: '06 12 34 56 78',
    contactPreference: 'Bellen',
    civicIntegrationRequirement: 'Nee',
    civicIntegrationRequirementReason: 'Afgerond',
    notifyingParty: 'XYZ',
    referrerEmailAddress: 'verwijzer@email.nl',
    foundVia: 'Via via',
    foundViaBefore: 'Nee',
    network: ['Gezinsleden', 'Buren', 'Hulpverleners', 'Vrienden, kennissen'],
    participationLadder: '2 sociale contacten',
    NTLevel: 'NT1',
    languageLevel: 'Redelijk',
    lastEducation: 'NT1',
    graduated: 'Nee',
    currentEducation: 'Nee',
    course: 'Nee',
    trained: 'Schaapsherder',
    lastWorkplace: 'Mc Donalds',
    dayTimeActivities: [''],
    skills: [''],
    triedThisSkillBefore: 'Nee',
    reasonWhy: 'Niet gemotiveerd',
    learningReason: 'Ik wil mijn kinderen helpen',
    whyNowLearningReason: 'I.v.m. thuisonderwijs',
    learningPreference: ['In een groep', 'Online'],
    remark: 'Lijkt erg gemotiveerd',
    available: '',
    note: 'Dinsdagochtend is optioneel',
    writingResults: 'Kan eenvoudige teksten schrijven (boodschappenbriefje etc.)',
    readingResults: 'A2',
    nativeLanguage: 'Portugees',
    otherLanguages: ['-'],
    familyComposition: ['Weduwe/weduwnaar'],
    numberOfChildren: '2',
    dateOfBirthChildren: ['01-01-2010', '02-02-2012'],
    runningParticipants: '1',
    completedParticipants: '0',
    createdAt: `01-01-21`,
    editedAt: `01-01-21`,
}
