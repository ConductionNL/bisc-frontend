interface LastNameType {
    additionalName?: string | null
    familyName?: string | null
}

interface FullNameType extends LastNameType {
    givenName?: string | null
}

class Name {
    public formattedFullname = (value?: FullNameType | null) => {
        const fullName = [value?.givenName, value?.additionalName, value?.familyName]
            .filter(item => item !== undefined)
            .join(' ')

        return fullName
    }

    public formattedLastName = (value?: LastNameType) => {
        const lastName = [value?.additionalName, value?.familyName]
            .filter(streetItem => streetItem !== undefined || streetItem !== null)
            .join(', ')

        return lastName
    }
}

export const NameFormatters = new Name()
