import times from 'lodash/times'

export const coworkersMock: TaalhuisCoworkersFormModel[] = times(3, num => ({
    id: 1234523525,
    achternaam: `Wit`,
    tussenvoegsel: `De`,
    roepnaam: `Peter`,
    telefoonnummer: `030 - 526 72 80`,
    email: `medewerker${num}@aanbieder.nl`,
    rol: `medewerker`,
    createdAt: `01-01-21`,
    updatedAt: `01-01-21`,
}))

export interface TaalhuisCoworkersFormModel {
    id: number
    achternaam: string
    tussenvoegsel: string
    roepnaam: string
    telefoonnummer: string
    email: string
    rol: string
    createdAt: string
    updatedAt: string
}

export const coworkerCreateResponse = {
    id: 1234523525,
    achternaam: 'Wit',
    tussenvoegsel: 'De',
    roepnaam: 'Peter',
    telefoonnummer: '030 - 526 72 80',
    email: 'info@aanbieder.nl',
    rol: 'medewerker',
    createdAt: `01-01-21`,
    updatedAt: `01-01-21`,
}
