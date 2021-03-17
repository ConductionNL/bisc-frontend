interface AddressType {
    street?: string
    houseNumber?: string
    houseNumberSuffix?: string
    postalCode?: string
    locality?: string
}

class Adress {
    public formattedAddress = (value?: AddressType | null) => {
        const street = [value?.street, value?.houseNumber, value?.houseNumberSuffix]
            .filter(streetItem => streetItem !== undefined)
            .join(' ')
        const postalCode = value?.postalCode
        const textArr = [street, postalCode].filter(streetItem => streetItem !== undefined)

        return textArr.join(', ')
    }
}

export const AdressFormatters = new Adress()
