import times from 'lodash/times'

export const taalhuizenParticipantsMock: ParticipantsMock[] = times(3, num => ({
    id: 1234523525,
    lastName: 'Hardinge',
    name: `Gypsy`,
    runningParticipants: 'string',
    completedParticipants: 'string',
    createdAt: `01-01-21`,
    editedAt: `01-01-21`,
}))

export interface ParticipantsMock {
    id: number
    lastName: string
    name: string
    runningParticipants: string
    completedParticipants: string
    createdAt: string
    editedAt: string
}

export const taalhuisParticipantsCreateResponse = {
    id: 1234523525,
    name: `Taalhuis x`,
    adres: `test`,
    postalCode: `1234AB`,
    city: `Utrecht`,
    email: `medewerker@aanbieder.nl`,
    phoneNumber: '030 - 526 72 80',
    createdAt: `01-01-21`,
    editedAt: `01-01-21`,
}
