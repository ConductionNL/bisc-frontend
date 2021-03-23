// TODO: remove this file once the api is connected

import times from 'lodash/times'

export interface AanbiederParticipant {
    id: number
    lastName: string
    firstName: string
    isReferred: boolean
    referredBy?: string
    referredAt?: Date
}

export interface AanbiederParticipantDetail extends AanbiederParticipant {
    fullName: string
    gender: Gender
    birthDate: Date
    address: Address
    customer: Customer
    isCivicIntegrationRequired: boolean
    civicIntegrationReason: string
}

enum Gender {
    man = 'Man',
    woman = 'Woman',
}

interface Address {
    id: number
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

export const aanbiederParticipantsMock: AanbiederParticipant[] = times(16, i => ({
    id: i,
    lastName: 'somelastname',
    firstName: 'somefirstname',
    isReferred: !!(i & 1),
    referredBy: !!(i & 1) ? 'somereferrer' : undefined,
    referredAt: !!(i & 1) ? new Date() : undefined,
}))

export const aanbiederParticipantDetail: AanbiederParticipantDetail = {
    id: 1,
    lastName: 'somelastname',
    firstName: 'somefirstname',
    fullName: 'somefirstname somelastname',
    gender: Gender.man,
    birthDate: new Date(),
    isReferred: false,
    isCivicIntegrationRequired: false,
    civicIntegrationReason: 'Afgerond',
    address: {
        id: 1,
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
}
