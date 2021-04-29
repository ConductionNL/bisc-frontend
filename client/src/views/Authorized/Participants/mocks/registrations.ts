import times from 'lodash/times'

export const taalhuizenRegistrationsMock: RegistrationsMock[] = times(3, num => ({
    id: 1234523525,
    familyName: 'Hardinge',
    firstName: `Gypsy`,
    additionalName: 'Oz',
    street: 'Parkstraat',
    houseNumber: '22 A',
    postalCode: '3533 AF',
    city: 'Utrecht',
    date: '01/01/2020',
    registeringParty: 'Gemeente Utrecht',
    registratorName: 'Kader Benali',
    registratorEmail: 'k.benali@utrecht.nl',
    registratorPhone: '06 - 11 22 32 76',
    email: 'email@deelnemer.nl',
    phone: '06 - 19 76 85 43',
    note: `Fusce vel porta neque. Fusce accumsan, ante ac suscipit tempus,
    lectus ante elementum est, non venenatis eros leo ac tortor.
    Duis mattis augue non diam tincidunt,
    nec semper leo aliquet. Aenean eget justo ut libero sollicitudin porta dictum at tortor.
    Quisque nec erat in enim laoreet tempus quis ac magna. Sed eros lacus, pretium vel eros in,
    rhoncus hendrerit ex. Sed sem tortor, venenatis ut enim sit amet, sollicitudin tempus nisi.
    Donec fringilla risus eu pellentesque imperdiet.
    Morbi efficitur libero quis libero efficitur rhoncus. `,
    subscribedBy: `01-01-21`,
    registeredPer: `01-01-21`,
}))

export interface RegistrationsMock {
    id: number
    familyName: string
    firstName: string
    additionalName?: string
    street: string
    houseNumber: string
    postalCode: string
    date: string
    email: string
    phone: string
    city: string
    note?: string
    registeringParty: string
    registratorName: string
    registratorEmail: string
    registratorPhone: string
    subscribedBy: string
    registeredPer: string
}

export const taalhuisRegistrationsCreateResponse = {
    id: 1234523525,
    familyName: 'Hardinge',
    firstName: `Gypsy`,
    additionalName: 'Oz',
    street: 'Parkstraat',
    houseNumber: '22 A',
    postalCode: '3533 AF',
    city: 'Utrecht',
    date: '01/01/2020',
    registeringParty: 'Gemeente Utrecht',
    registratorName: 'Kader Benali',
    registratorEmail: 'k.benali@utrecht.nl',
    registratorPhone: '06 - 11 22 32 76',
    email: 'email@deelnemer.nl',
    phone: '06 - 19 76 85 43',
    note: `Fusce vel porta neque. Fusce accumsan, ante ac suscipit tempus,
    lectus ante elementum est, non venenatis eros leo ac tortor.
    Duis mattis augue non diam tincidunt,
    nec semper leo aliquet. Aenean eget justo ut libero sollicitudin porta dictum at tortor.
    Quisque nec erat in enim laoreet tempus quis ac magna. Sed eros lacus, pretium vel eros in,
    rhoncus hendrerit ex. Sed sem tortor, venenatis ut enim sit amet, sollicitudin tempus nisi.
    Donec fringilla risus eu pellentesque imperdiet.
    Morbi efficitur libero quis libero efficitur rhoncus. `,
    subscribedBy: `01-01-21`,
    registeredPer: `01-01-21`,
}
