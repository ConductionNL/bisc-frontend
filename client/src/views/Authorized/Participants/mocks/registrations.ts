import times from 'lodash/times'

export const taalhuizenRegistrationsMock: RegistrationsMock[] = times(3, num => ({
    id: 1234523525,
    lastName: 'Hardinge',
    nickName: `Gypsy`,
    subscribedBy: `01-01-21`,
    registeredPer: `01-01-21`,
}))

export interface RegistrationsMock {
    id: number
    lastName: string
    nickName: string
    subscribedBy: string
    registeredPer: string
}

export const taalhuisRegistrationsCreateResponse = {
    id: 1234523525,
    lastName: 'Hardinge',
    name: `Gypsy`,
    subscribedBy: `01-01-21`,
    registeredPer: `01-01-21`,
}
