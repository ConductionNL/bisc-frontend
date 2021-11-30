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
            name: 'taalhuisAddress',
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
            name: 'taalhuisPhone',
            telephone: formData['telephones[0].telephone'] ?? undefined,
        },
    ]

    const emails: PostPutOrganizationParams['emails'] = [
        {
            id: defaultTaalhuis?.emails?.[0].id,
            name: 'taalhuisEmail',
            email: formData['emails[0].email'] ?? undefined,
        },
    ]

    return {
        id: defaultTaalhuis?.id,
        name: formData.name ?? undefined,
        type: defaultTaalhuis?.id ? undefined : OrganizationTypeEnum.Taalhuis,
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
    // const telephones = [
    //     {
    //         id: defaultTaalhuisCoworker?.person.telephones?.[0].id,
    //         name: 'taalhuisPhone',
    //         telephone: formData['person.telephones[0].telephone'] ?? undefined,
    //     },
    // ]

    const user = {
        // roles: formData['person.user.roles[0]'] ? [formData['person.user.roles[0]']] : undefined,
        username: formData['person.user.username'] ?? undefined,
        password: 'blahblah)(@J#F(N',
        currentPassword: 'blahblah)(@J#F(N',
        organization: languageHouseId,
        userGroups: ['efa3b8a5-49e4-46a8-86c2-6769b726b42a'],
    }

    const person: PostPutOrganizationEmployeeParams['person'] = {
        givenName: formData['person.givenName'] ?? undefined,
        additionalName: formData['person.additionalName'] ?? undefined,
        familyName: formData['person.familyName'] ?? undefined,
        // telephones,
        user,
    }

    return {
        id: defaultTaalhuisCoworker?.id,
        person,
        languageHouse: languageHouseId,
    }
}
