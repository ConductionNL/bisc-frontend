import { PostPutOrganizationEmployeeParams } from 'api/employee/employee'
import { PostPutOrganizationParams } from 'api/organization/organization'
import { Organization, OrganizationEmployee, OrganizationTypeEnum } from 'api/types/types'
import { TaalhuisCoworkersInformationFieldsetModel } from 'components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'
import { TaalhuisInformationFieldsetModel } from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'

export function getMappedTaalhuisFormFields(
    formData: TaalhuisInformationFieldsetModel,
    defaultTaalhuis?: Organization
): PostPutOrganizationParams {
    const addresses: PostPutOrganizationParams['addresses'] = [
        {
            id: defaultTaalhuis?.addresses?.[0].id,
            street: formData['addresses[0].street'] ?? undefined,
            houseNumber: formData['addresses[0].houseNumber'] ?? undefined,
            houseNumberSuffix: formData['addresses[0].houseNumberSuffix'] ?? undefined,
            postalCode: formData['addresses[0].postalCode'] ?? undefined,
            locality: formData['addresses[0].locality'] ?? undefined,
            country: 'NL',
        },
    ]

    const telephones: PostPutOrganizationParams['telephones'] = [
        {
            id: defaultTaalhuis?.telephones?.[0].id,
            telephone: formData['telephones[0].telephone'] ?? undefined,
        },
    ]

    const emails: PostPutOrganizationParams['emails'] = [
        {
            id: defaultTaalhuis?.emails?.[0].id,
            email: formData['emails[0].email'] ?? undefined,
        },
    ]

    return {
        id: defaultTaalhuis?.id,
        name: formData.name ?? undefined,
        type: defaultTaalhuis?.id ? undefined : OrganizationTypeEnum.Taalhuis,
        postalCodes: formData.codes,
        addresses,
        telephones,
        emails,
    }
}

export function getMappedTaalhuisCoworkerFormFields(
    formData: TaalhuisCoworkersInformationFieldsetModel,
    languageHouseId: string,
    defaultTaalhuisCoworker?: OrganizationEmployee
): PostPutOrganizationEmployeeParams {
    const telephones = [
        {
            id: defaultTaalhuisCoworker?.person.telephones?.[0].id,
            telephone: formData['person.telephones[0].telephone'] ?? undefined,
        },
    ]

    const emails = [
        {
            id: defaultTaalhuisCoworker?.person.emails?.[0].id,
            email: formData['person.emails[0].email'] ?? undefined,
        },
    ]

    const person: PostPutOrganizationEmployeeParams['person'] = {
        id: defaultTaalhuisCoworker?.person.id,
        givenName: formData['person.givenName'] ?? undefined,
        additionalName: formData['person.additionalName'] ?? undefined,
        familyName: formData['person.familyName'] ?? undefined,
        telephones: telephones,
        emails: emails,
    }

    return {
        // id: defaultTaalhuisCoworker?.id,
        person,
        organization: languageHouseId,
        role: formData.role ?? undefined,
    }
}
