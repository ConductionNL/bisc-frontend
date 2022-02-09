import { PostPutAddressParams } from 'api/common/address'
import { PostPutEmailParams } from 'api/common/email'
import { PostPutPersonParams } from 'api/common/person'
import { PostPutTelephoneParams } from 'api/common/telephone'
import { PostPutStudentParams } from 'api/student/student'
import { IntakeReferringOrganization, IntakeStatus } from 'api/types/types'
import { PublicRegistrationFieldsFormModel } from 'components/Domain/PublicRegistration/Fields/PublicRegistrationFields'

export function publicRegistrationFieldsMapper(formData: PublicRegistrationFieldsFormModel): PostPutStudentParams {
    const addresses: PostPutAddressParams[] = []

    if (
        formData['person.addresses[0].street'] ||
        formData['person.addresses[0].houseNumber'] ||
        formData['person.addresses[0].houseNumberSuffix'] ||
        formData['person.addresses[0].postalCode'] ||
        formData['person.addresses[0].locality']
    ) {
        addresses.push({
            street: formData['person.addresses[0].street'],
            houseNumber: formData['person.addresses[0].houseNumber'],
            houseNumberSuffix: formData['person.addresses[0].houseNumberSuffix'],
            postalCode: formData['person.addresses[0].postalCode'],
            locality: formData['person.addresses[0].locality'],
            country: 'NL',
        })
    }

    const emails: PostPutEmailParams[] = []

    if (formData['person.emails[0].email']) {
        emails.push({
            email: formData['person.emails[0].email'],
        })
    }

    const telephones: PostPutTelephoneParams[] = []

    if (formData['person.telephones[0].telephone']) {
        telephones.push({
            telephone: formData['person.telephones[0].telephone'],
        })
    }

    const referringPersonEmails: PostPutEmailParams[] = []

    if (formData['intake.referringPerson.emails[0].email']) {
        referringPersonEmails.push({
            email: formData['intake.referringPerson.emails[0].email'],
        })
    }

    const referringPersonTelephones: PostPutTelephoneParams[] = []

    if (formData['intake.referringPerson.telephones[0].telephone']) {
        referringPersonTelephones.push({
            telephone: formData['intake.referringPerson.telephones[0].telephone'],
        })
    }

    const referringPerson: PostPutPersonParams = {
        givenName: formData['intake.referringPerson.givenName'] ?? undefined,
        additionalName: formData['intake.referringPerson.additionalName'] ?? undefined,
        familyName: formData['intake.referringPerson.familyName'] ?? undefined,
        team: formData['intake.referringPerson.team'] ?? undefined,
        emails: referringPersonEmails,
        telephones: referringPersonTelephones,
    }

    return {
        languageHouse: formData['languageHouse'],
        team: formData.team,
        person: {
            familyName: formData['person.familyName'],
            givenName: formData['person.givenName'],
            additionalName: formData['person.additionalName'] || undefined,
            addresses: addresses,
            emails: emails,
            telephones: telephones,
        },
        intake: {
            referringOrganization: IntakeReferringOrganization.Other,
            referringOrganizationOther: formData['intake.referringOrganizationOther'],
            referringPerson: referringPerson,
            remarks: formData['intake.remarks'],
            status: IntakeStatus.Pending,
            didSignPermissionForm: true,
            hasPermissionToSendInformationAboutLibraries: false,
            hasPermissionToShareDataWithLibraries: false,
            hasPermissionToShareDataWithProviders: false,
        },
    }
}
