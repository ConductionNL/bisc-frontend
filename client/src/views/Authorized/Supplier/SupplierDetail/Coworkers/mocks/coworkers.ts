import times from 'lodash/times'

export const coworkersMock: CoworkerMock[] = times(100, num => ({
    id: 1234523525,
    lastname: `achternaam ${num}`,
    callsign: `Roepnaam ${num}`,
    roles: ['Coordinator', 'Begeleider'],
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
}))
export interface CoworkerMock {
    id: number
    lastname: string
    callsign: string
    roles: string[]
    createdAt: string
    updatedAt: string
}

export const coworkersCreateMock = {
    id: 1234523525,
    lastname: `achternaam `,
    callsign: `Roepnaam `,
    roles: ['Coordinator', 'Begeleider'],
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
}
