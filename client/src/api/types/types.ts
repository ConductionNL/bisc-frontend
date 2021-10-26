export enum OrganizationTypeEnum {
    Bisc = 'bisc',
    Taalhuis = 'taalhuis',
}

export interface Telephone {
    id: string
    name: string
    telephone: string
    dateCreated: string
    dateModified: string
}

export interface Address {
    id: string
    name: string
    bagnummeraanduiding: null
    street: string
    houseNumber: string
    houseNumberSuffix: string
    postalCode: string
    region: null
    locality: string
    country: string
    postOfficeBoxNumber: null
    dateCreated: string
    dateModified: string
}

export interface Email {
    id: string
    name: string
    email: string
    dateCreated: string
    dateModified: string
}

export interface User {
    first_name: string
    last_name: string
    name: string
    email: string
    roles: string[]
    organization: Organization
}

export interface Organization {
    id: string
    name: string
    description: null
    type: OrganizationTypeEnum
    coc: null
    vatID: null
    parentOrganization: null
    subOrganizations: unknown[]
    telephones: Telephone[]
    addresses: Address[]
    socials: unknown[]
    emails: Email[]
    persons: unknown[]
    sourceOrganization: null
}

export interface Person {
    id: string
    user: null
    speakingLanguages: null
    primaryLanguage: null
    maritalStatus: null
    givenName: string
    gender: null
    familyName: string
    telephones: Telephone[]
    country: null
    contactPreferenceOther: string
    contactPreference: string
    childrenbirthdays: null
    children: null
    birthplace: null
    birthday: string
    availabilityNotes: string
    availability: string[]
    emails: Email[]
    additionalName: string
    addresses: Address[]
}

export interface Intake {
    currentEducation: string
    date: null
    dayTimeActivities: string[] //['SCHOOL', 'SEARCHING_FOR_JOB', 'OTHER']
    dayTimeActivitiesOther: string //'INTERNSHIP'
    desiredLearningMethod: string[] //['ONLINE']
    desiredSkills: string[] //['USING_WHATSAPP', 'DEVICE_FUNCTIONALITIES', 'OTHER']
    desiredSkillsOther: string //'USING_FACEBOOKs'
    didSignPermissionForm: boolean
    dutchNTLevel: string //'NT1'
    experienceWithTargetGroupYesReason: string
    foundVia: string //'OTHER'
    foundViaOther: string //'Advertentie'
    gotHereVia: string
    hasExperienceWithTargetGroup: boolean
    hasPermissionToSendInformationAboutLibraries: boolean
    hasPermissionToShareDataWithLibraries: boolean
    hasPermissionToShareDataWithProviders: boolean
    hasTriedThisBefore: boolean
    hasTriedThisBeforeExplanation: string //'YES'
    id: string
    inNetherlandsSinceYear: number //2016
    isVOGChecked: boolean
    knowsLatinAlphabet: boolean
    languageInDailyLife: string //'Dutch'
    lastJob: string //'Software Engineer'
    lastKnownLevel: string //'A0'
    network: string[] //['HOUSEHOLD_MEMBERS', 'NEIGHBORS']
    otherRelevantCertificates: string
    participationLadder: string //'4 vrijwilligers werk/maatschappelijke activering'
    readingTestResult: string //'B2'
    referringOrganization: string //'OTHER'
    referringOrganizationEmail: string //'johndoe2@test.caom'
    referringOrganizationOther: string //'SOCIAL_SERVICEaa'
    remarks: string //'stringetje'
    speakingLevel: string //'ADVANCED'
    status: string //'REFERRED'
    targetGroupPreferences: string[]
    trainedForJob: string //'Software Engineer PUT'
    volunteeringPreference: string
    wentToLanguageHouseBefore: boolean
    wentToLanguageHouseBeforeReason: string //'Went to this languageHouse before, because...'
    wentToLanguageHouseBeforeYear: number //2016
    whyWantTheseskills: string //'Verbeteren'
    whyWantThisNow: string //'Hoe sneller hoe beter'
    writingTestResult: string //'WRITE_NAW_DETAILS'
}

export interface Education {
    id: string
    coursetype: string
    degree: boolean
    degreeGranted: null
    description: string
    doesCurrentlyFollowCourse: string
    educations: null
    endDate: string
    group: string
    hours: number
    institution: string
    level: string
    name: string
    startDate: string
    teachertype: string
    type: string
}

export interface OrganizationEmployee {
    id: string
    languageHouse: Organization
    person: Person
    intake: Intake
    educations: Education[]
}

export interface Student {
    id: string
    civicIntegration: CivicIntegration
    educations: Education[]
    person: Person
    learningNeeds: null
    languageHouse: Organization
    participations: null
    intake: Intake
}

export interface CivicIntegration {
    id: string
    reason: string //'FROM_EU_COUNTRY'
    requirement: string //'CURRENTLY_WORKING_ON_INTEGRATION'
    finishDate: string //'2021-04-23T00:00:00+00:00'
}
