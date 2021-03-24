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

export const aanbiederParticipantsMock: AanbiederParticipant[] = times(16, i => ({
    id: i,
    lastName: 'somelastname',
    firstName: 'somefirstname',
    isReferred: !!(i & 1),
    referredBy: !!(i & 1) ? 'somereferrer' : undefined,
    referredAt: !!(i & 1) ? new Date() : undefined,
}))
