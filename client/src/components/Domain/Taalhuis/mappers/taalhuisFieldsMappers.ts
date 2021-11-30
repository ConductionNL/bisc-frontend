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
