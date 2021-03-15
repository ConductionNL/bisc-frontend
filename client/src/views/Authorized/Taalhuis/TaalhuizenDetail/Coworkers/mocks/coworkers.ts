import times from 'lodash/times'
import { TaalhuisCoworkersFormModel } from '../../TaalhuizenOverviewReadView/coworkers/detail/TaalhuisCoworkerUpdateView'

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
