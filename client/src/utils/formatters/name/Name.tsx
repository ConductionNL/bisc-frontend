interface LastNameType {
    additionalName?: string | null
    familyName?: string | null
}

interface FullNameType extends LastNameType {
    givenName?: string | null
}

class Name {
    public formattedFullname = (value?: FullNameType | null) => {
        const fullName = [value?.givenName, value?.additionalName, value?.familyName].filter(item => item).join(' ')

        return fullName
    }

    public formattedLastName = (value?: LastNameType) => {
        const familyName = [value?.additionalName, value?.familyName].filter(part => !!part).join(', ')

        return familyName
    }
}

export const NameFormatters = new Name()
