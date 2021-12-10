import {
    PostPutAddressParams,
    PostPutEmailParams,
    PostPutStudentParams,
    PostPutTelephoneParams,
} from 'api/student/student'
import { IntakeStatus } from 'api/types/types'
import { PublicRegistrationFieldsFormModel } from 'components/Domain/PublicRegistration/Fields/PublicRegistrationFields'

export function publicRegistrationFieldsMapper(formData: PublicRegistrationFieldsFormModel): PostPutStudentParams {
    const addresses: PostPutAddressParams[] = [
        {
            street: formData['person.addresses[0].street'],
            houseNumber: formData['person.addresses[0].houseNumber'],
            houseNumberSuffix: formData['person.addresses[0].houseNumberSuffix'],
            postalCode: formData['person.addresses[0].postalCode'],
            locality: formData['person.addresses[0].locality'],
            country: 'NL',
        },
    ]

    const emails: PostPutEmailParams[] = [
        {
            email: formData['person.emails[0].email'],
        },
    ]

    const telephones: PostPutTelephoneParams[] = [
        {
            telephone: formData['person.telephones[0].telephone'],
        },
    ]

    const postStudentParams: PostPutStudentParams = {
        languageHouse: formData['languageHouse'],
        person: {
            familyName: formData['person.familyName'],
            givenName: formData['person.givenName'],
            additionalName: formData['person.additionalName'] || undefined,
            addresses: addresses,
            emails: emails,
            telephones: telephones,
        },
        intake: {
            remarks: formData['intake.remarks'],
            status: IntakeStatus.Pending,
            didSignPermissionForm: true,
            hasPermissionToSendInformationAboutLibraries: false,
            hasPermissionToShareDataWithLibraries: false,
            hasPermissionToShareDataWithProviders: false,
        },
    }

    return postStudentParams
}
