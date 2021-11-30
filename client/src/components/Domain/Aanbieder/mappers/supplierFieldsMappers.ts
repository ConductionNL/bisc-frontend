import { PostPutSupplierParams } from 'api/supplier/supplier'
import { OrganizationTypeEnum, Supplier } from 'api/types/types'
import { BiscSupplierFieldsetModel } from 'components/Domain/Bisc/Supplier/BiscSupplierFieldset'
import { areAllKeysUndefined } from 'utils/objects/objects'

export function getMappedSupplierFormFields(
    formData: BiscSupplierFieldsetModel,
    defaultSupplier?: Supplier
): PostPutSupplierParams {
    const addresses: PostPutSupplierParams['addresses'] = [
        {
            id: defaultSupplier?.addresses?.[0].id,
            street: formData['addresses[0].street'] ?? undefined,
            houseNumber: formData['addresses[0].houseNumber'] ?? undefined,
            houseNumberSuffix: formData['addresses[0].houseNumberSuffix'] ?? undefined,
            postalCode: formData['addresses[0].postalCode'] ?? undefined,
            locality: formData['addresses[0].locality'] ?? undefined,
        },
    ]

    const telephones: PostPutSupplierParams['telephones'] = [
        {
            id: defaultSupplier?.telephones?.[0].id,
            telephone: formData['telephones[0].telephone'] ?? undefined,
        },
    ]

    const emails: PostPutSupplierParams['emails'] = [
        {
            id: defaultSupplier?.emails?.[0].id,
            email: formData['emails[0].email'] ?? undefined,
        },
    ]

    return {
        id: defaultSupplier?.id,
        type: defaultSupplier?.id ? undefined : OrganizationTypeEnum.Aanbieder,
        name: formData.name ?? undefined,
        addresses: areAllKeysUndefined(addresses[0]) ? undefined : addresses,
        telephones: areAllKeysUndefined(telephones[0]) ? undefined : telephones,
        emails: areAllKeysUndefined(emails[0]) ? undefined : emails,
    }
}
