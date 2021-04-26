import { UserEnvironmentEnum, UserRoleEnum } from '../../../client/src/generated/graphql'
import { base64ExamplePdf } from './base64examplePDF'

export const mocks = {
    Query: () => ({
        currentUser: () => ({
            id: '123-jessedvrs',
            username: 'jessedvrs',
            givenName: 'Jesse',
            additionalName: 'Boyd',
            familyName: 'de Vries',
            userEnvironment: UserEnvironmentEnum.Aanbieder,
            organizationId: '123-organization',
            organizationName: 'organizationName',
            dateCreated: new Date(),
            dateModified: new Date(),
            userRoles: [{id: 1, name: UserRoleEnum.AanbiederCoordinator }],
        })
    }),
    Mutation: () => ({
        downloadProviderEmployeeDocument: () => ({ data: { base64data: base64ExamplePdf } }),
        downloadStudentDocument: () => ({ data: { base64data: base64ExamplePdf } }),
    }),
}
