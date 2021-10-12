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
    id: string
    volunteeringPreference: string
    targetGroupPreferences: string[]
    otherRelevantCertificates: string
    isVOGChecked: boolean
    hasExperienceWithTargetGroup: boolean
    gotHereVia: string
    experienceWithTargetGroupYesReason: string
    currentEducation: string
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
