import { usePaginatedGet } from 'api/common/pagination'
import { MutationError, PaginatedResult, Supplier } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { RecursivePartial } from 'utils/objects/objects'

export interface SuppliersParams {}

export interface SuppliersData extends PaginatedResult<Supplier> {}

export type PostPutSupplierResponse = Supplier

export type PostPutSupplierParams = RecursivePartial<Supplier>

interface UseGetSuppliersOptions {
    limit?: number
    fields?: GetSupplierField[]
}

export enum GetSupplierField {
    Id = 'id',
    Name = 'name',
    AddressesStreet = 'addresses.street',
    AddressesHouseNumber = 'addresses.houseNumber',
    AddressesPostalCode = 'addresses.postalCode',
    AddressesLocality = 'addresses.locality',
}

export function useGetSuppliers(options: UseGetSuppliersOptions) {
    return usePaginatedGet<SuppliersData>(
        {
            path: '/organizations',
            queryParams: {
                type: 'aanbieder',
                fields: options.fields,
            },
        },
        { limit: options.limit || 30, page: 1 }
    )
}

export function useGetSupplier(supplierId: string) {
    return useGet<Supplier>({
        path: `/organizations/${supplierId}`,
    })
}

export function usePostSupplier() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutSupplierResponse, MutationError, any, PostPutSupplierParams>({
        verb: 'POST',
        path: '/organizations',
    })
}

export function usePutSupplier(supplierId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutSupplierResponse, MutationError, any, PostPutSupplierParams>({
        verb: 'PUT',
        path: `/organizations/${supplierId}`,
    })
}

export function useDeleteSupplier(supplierId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/organizations/${supplierId}`,
    })
}
