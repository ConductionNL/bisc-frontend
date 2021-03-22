interface LastNameType {
    additionalName?: string | null
    familyName?: string | null
}

interface FullNameType extends LastNameType {
    givenName: string
}

class Name {
    public formattedLastName = (value?: LastNameType | null) => {
        const lastName = [value?.additionalName, value?.familyName].filter(part => part).join(', ')

        return lastName
    }

    public formattedFullname = (value?: FullNameType | null) => {
        const lastName = [value?.givenName, value?.additionalName, value?.familyName]
            .filter(item => item !== undefined)
            .join(' ')

        return lastName
    }
}

export const NameFormatters = new Name()
