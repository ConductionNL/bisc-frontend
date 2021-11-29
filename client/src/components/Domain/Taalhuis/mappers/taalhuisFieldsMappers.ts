import { PostPutOrganizationParams } from 'api/organization/organization'
import { Organization, OrganizationTypeEnum } from 'api/types/types'
import { TaalhuisInformationFieldsetModel } from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'

export function getMappedTaalhuisFormFields(
    formData: TaalhuisInformationFieldsetModel,
    defaultTaalhuis?: Organization
): PostPutOrganizationParams {
    const addresses: PostPutOrganizationParams['addresses'] = [
        {
            id: defaultTaalhuis?.addresses?.[0].id,
            name: 'taalhuisAddress',
            street: formData['street'] ?? undefined,
            houseNumber: formData['houseNumber'] ?? undefined,
            houseNumberSuffix: formData['houseNumberSuffix'] ?? undefined,
            postalCode: formData['postalCode'],
            locality: formData['city'],
            country: 'NL',
        },
    ]

    const telephones: PostPutOrganizationParams['telephones'] = [
        {
            id: defaultTaalhuis?.telephones?.[0].id,
            name: 'taalhuisPhone',
            telephone: formData['phoneNumber'],
        },
    ]

    const emails: PostPutOrganizationParams['emails'] = [
        {
            id: defaultTaalhuis?.emails?.[0].id,
            name: 'taalhuisEmail',
            email: formData['email'],
        },
    ]

    return {
        id: defaultTaalhuis?.id,
        name: formData['taalhuis'],
        type: OrganizationTypeEnum.Taalhuis,
        addresses,
        telephones,
        emails,
    }
}
