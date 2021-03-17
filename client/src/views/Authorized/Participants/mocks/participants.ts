import times from 'lodash/times'

export const taalhuizenParticipantsMock: ParticipantsMock[] = times(3, num => ({
    id: 1234523525,
    lastName: 'Hardinge',
    name: `Gypsy`,
    runningParticipants: '1',
    completedParticipants: '0',
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
    lastName: 'Hardinge',
    name: `Gypsy`,
    runningParticipants: '1',
    completedParticipants: '0',
    createdAt: `01-01-21`,
    editedAt: `01-01-21`,
}
