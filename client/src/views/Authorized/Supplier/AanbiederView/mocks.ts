// TODO: remove this file once the api is connected

import times from 'lodash/times'

export interface AanbiederParticipant {
    id: number
    lastName: string
    firstName: string
    nickName: string
    isReferred: boolean
    referredBy?: string
    referredAt?: Date
}

export interface AanbiederParticipantDetail extends AanbiederParticipant {
    fullName: string
    gender: Gender
    birthdate: Date
    address: AddressMetadata
    customer: Customer
    isCivicIntegrationRequired: boolean
    civicIntegrationReason: string
    countryOfOrigin: string
    nativeLanguage: string
    otherLanguages: string[]
    maritalStatus: string
    children?: number
    childrenBirthdates?: Date[]
    referrer: Referrer
    background: BackgroundMetadata
    proficiency: 'NT1' | 'NT2'
    level: string
    education: EducationMetadata
    isCurrentlyEnrolledInACourse: boolean
    profession: ProfessionMetadata
    motivations: MotivationsMetadata
    readingTestResult: string
    writingTestResult: string
    isConsentSigned: boolean
    permissions: PermissionsMetadata
}

enum Gender {
    man = 'Man',
    woman = 'Woman',
}

interface AddressMetadata {
    street: string
    building: number
    apartment: string
    postcode: string
    city: string
    phone: string
    contactPreference: ContactPreference
}

enum ContactPreference {
    call = 'call',
    text = 'text',
    email = 'email',
}

interface Customer {
    id: number
    fullName: string
    assignedAt: Date
}

interface Referrer {
    id: number
    group: string
    name: string
    email: string
}

interface BackgroundMetadata {
    foundVia: string
    foundViaBefore: string
    networks: string[]
    participationLadder: string
}

interface EducationMetadata {
    lastTraining: 'NT1' | 'NT2'
    graduated: boolean
    isCurrentlyEnrolled: boolean
}

interface ProfessionMetadata {
    training: string
    lastCompany: string
    activities: string[]
}

interface MotivationsMetadata {
    learningGoals: Record<string, string[]>
    isFirstTime: boolean
    isFirstTimeReason: string
    learningReason: string
    timingReason: string
    processPreference: string[]
    customerComments: string
}

interface PermissionsMetadata {
    sharingLearningPathway: boolean
    sharingBasicData: boolean
    permissionInformationFromLibrary: boolean
}

export const aanbiederParticipantsMock: AanbiederParticipant[] = times(16, i => ({
    id: i,
    lastName: 'somelastname',
    firstName: 'somefirstname',
    nickName: 'somenickname',
    isReferred: !!(i & 1),
    referredBy: !!(i & 1) ? 'somereferrer' : undefined,
    referredAt: !!(i & 1) ? new Date() : undefined,
}))

export const aanbiederParticipantDetail: AanbiederParticipantDetail = {
    id: 1,
    lastName: 'somelastname',
    firstName: 'somefirstname',
    nickName: 'somenickname',
    fullName: 'somefirstname somelastname',
    gender: Gender.man,
    birthdate: new Date(),
    isReferred: false,
    isCivicIntegrationRequired: false,
    civicIntegrationReason: 'Afgerond',
    address: {
        street: 'somestreetname',
        building: 1,
        apartment: 'A',
        postcode: '1234 AB',
        city: 'somecity',
        phone: '123456789',
        contactPreference: ContactPreference.call,
    },
    customer: {
        id: 1,
        fullName: 'somecustomer fullname',
        assignedAt: new Date(),
    },
    countryOfOrigin: 'somecountry',
    nativeLanguage: 'somelanguage',
    otherLanguages: ['somelanguage'],
    maritalStatus: 'divorced',
    children: 2,
    childrenBirthdates: [new Date(), new Date()],
    referrer: {
        id: 1,
        group: 'somegroup',
        name: 'somename',
        email: 'someemail@email.com',
    },
    background: {
        foundVia: 'somesinglebackgroundanswer',
        foundViaBefore: 'Nee',
        networks: ['somesinglebackgroundanswer', 'somesinglebackgroundanswer'],
        participationLadder: 'someparticipationladder',
    },
    proficiency: 'NT1',
    level: 'somelevel',
    education: {
        lastTraining: 'NT1',
        graduated: false,
        isCurrentlyEnrolled: false,
    },
    isCurrentlyEnrolledInACourse: false,
    profession: {
        training: 'sometraining',
        lastCompany: 'somecompany',
        activities: ['someactivity', 'someactivity'],
    },
    motivations: {
        learningGoals: {
            somelearninggoal: ['somelearninggoal'],
            someotherlearninggoal: ['somelearninggoal', 'somelearninggoal'],
        },
        isFirstTime: false,
        isFirstTimeReason: 'somereason',
        learningReason: 'somereason',
        timingReason: 'timingreason',
        processPreference: ['someprocess', 'someprocess'],
        customerComments: 'nocomments',
    },
    readingTestResult: 'A2',
    writingTestResult: 'someresult',
    isConsentSigned: true,
    permissions: {
        sharingLearningPathway: false,
        sharingBasicData: true,
        permissionInformationFromLibrary: false,
    },
}
