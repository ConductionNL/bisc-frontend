import { StudentContactPreferenceEnum, UserEnvironmentEnum, UserRoleEnum } from '../../../client/src/generated/graphql'
import { base64ExamplePdf } from './base64examplePDF'

export const mocks = {
    Query: () => ({
        currentUser: () => ({
            id: '123-jessedvrs',
            username: 'jessedvrs',
            givenName: 'Jesse',
            additionalName: 'de',
            familyName: 'Vries',
            userEnvironment: UserEnvironmentEnum.Taalhuis,
            organizationId: '123-organization',
            organizationName: 'organizationName',
            dateCreated: new Date(),
            dateModified: new Date(),
            userRoles: [{id: 1, name: UserRoleEnum.TaalhuisCoordinator }],
        })
    }),
    Mutation: () => ({
        downloadProviderEmployeeDocument: () => ({ data: { base64data: base64ExamplePdf } }),
        downloadStudentDocument: () => ({ data: { base64data: base64ExamplePdf } }),
    }),
    ProviderAddressType: () => addressFields,
    ProviderEmployeeAddressType: () => addressFields,
    LanguageHouseAddressType: () => addressFields,
    StudentContactType: () => ({
        ...addressFields,
        email: 'john@example.org',
        telephone: '0612345678',
        contactPersonTelephone: '0612345678',
        contactPreference: StudentContactPreferenceEnum.Other,
        contactPreferenceOther: 'Contactpersoon bellen',
    }),
}

const addressFields = {
    street: 'Prinsengracht',
    houseNumber: 197,
    houseNumberSuffix: 'D',
    postalCode: '1015DT',
    locality: 'Amsterdam'
}
