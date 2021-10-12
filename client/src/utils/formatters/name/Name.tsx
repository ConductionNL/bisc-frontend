import { Person } from 'api/types/types'

class Name {
    public formattedFullname = (person: Partial<Person>) => {
        const fullName = [person.givenName, this.formattedLastName(person)].filter(part => !!part).join(' ')
        return fullName
    }

    public formattedLastName = (person: Partial<Person>) => {
        const familyName = [person.additionalName, person.familyName].filter(part => !!part).join(', ')
        return familyName
    }
}

export const NameFormatters = new Name()
