import times from 'lodash/times'
import { AccountInformationFieldsetModal, Roles } from '../../../../../../components/fieldsets/shared/AccountInformationFieldset'
import { AvailabillityFieldsetModel } from '../../../../../../components/fieldsets/shared/AvailabillityFieldset'
import { InformationFieldsetModel } from '../../../../../../components/fieldsets/shared/InformationFieldset'

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

export interface CoworkerDetailResponseMock extends InformationFieldsetModel, AvailabillityFieldsetModel, AccountInformationFieldsetModal {

}

export const coworkerDetailMock: CoworkerDetailResponseMock = {
    lastname: 'Tester',
    insertion: 'den',
    callSign: 'Henk',
    phonenumber: '0648585398',
    available: 'evening-Ma',
    note: 'My Note',
    email: 'test@mail.com',
    roles: [Roles.mentor, Roles.coordinator]
}
