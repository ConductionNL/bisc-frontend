// TODO: remove this file once the api is connected

import times from 'lodash/times'

export interface AanbiederParticipant {
    id: number
    lastName: string
    firstName: string
    isReferred: boolean
}

export const aanbiederParticipantsMock: AanbiederParticipant[] = times(16, i => ({
    id: i,
    lastName: 'somelastname',
    firstName: 'somefirstname',
    isReferred: !!(i & 1),
}))
