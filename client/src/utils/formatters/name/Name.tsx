interface LastNameType {
    additionalName?: string
    familyName?: string
}

class Name {
    public formattedLastName = (value?: LastNameType | null) => {
        const lastName = [value?.additionalName, value?.familyName]
            .filter(streetItem => streetItem !== undefined)
            .join(', ')

        return lastName
    }
}

export const NameFormatters = new Name()
