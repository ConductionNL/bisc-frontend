interface LastNameType {
    additionalName?: string | null
    familyName?: string | null
}

class Name {
    public formattedLastName = (value?: LastNameType) => {
        const lastName = [value?.additionalName, value?.familyName]
            .filter(streetItem => streetItem !== undefined || streetItem !== null)
            .join(', ')

        return lastName
    }
}

export const NameFormatters = new Name()
