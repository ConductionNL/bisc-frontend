import times from 'lodash/times'
import { TaalhuisCoworkersFormModel } from '../TaalhuisCoworkersOverviewView'

export const coworkersMock: TaalhuisCoworkersFormModel[] = times(3, num => ({
    id: 1234523525,
    achternaam: `Wit`,
    tussenvoegsel: `De`,
    roepnaam: `Peter`,
    telefoonnummer: `030 - 526 72 80`,
    email: `medewerker${num}@aanbieder.nl`,
    rol: `medewerker`,
    aangemaakt: `01-01-21`,
    bewerkt: `01-01-21`,
}))

export const coworkerCreateResponse = {
    id: 1234523525,
    achternaam: 'Wit',
    tussenvoegsel: 'De',
    roepnaam: 'Peter',
    telefoonnummer: '030 - 526 72 80',
    email: 'info@aanbieder.nl',
    rol: 'medewerker',
    aangemaakt: `01-01-21`,
    bewerkt: `01-01-21`,
}
