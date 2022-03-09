import { usePaginatedGet } from 'api/common/pagination'
import { MutationError, Organization, PaginatedResult } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { RecursivePartial } from 'utils/objects/objects'

export interface OrganizationsParams {}

export interface OrganizationsData extends PaginatedResult<Organization> {}

export type PostPutOrganizationResponse = Organization

export type PostPutOrganizationParams = RecursivePartial<Omit<Organization, 'languageHouse_postalCodes'>> & {
    languageHouse_postalCodes?: {
        id?: string
        code: number
    }[]
}

interface UseGetOrganizationsOptions {
    lazy?: boolean
    limit?: number
    parentId?: string
    type: 'taalhuis' | 'team'
    fields?: GetOrganizationField[]
}

export enum GetOrganizationField {
    Id = 'id',
    Name = 'name',
    Type = 'type',
    Emails = 'emails',
    Telephones = 'telephones',
    AddressesStreet = 'addresses.street',
    AddressesHouseNumber = 'addresses.houseNumber',
    AddressesPostalCode = 'addresses.postalCode',
    AddressesLocality = 'addresses.locality',
    LanguageHousePostalCodesId = 'languageHouse_postalCodes.id',
    LanguageHousePostalCodesCode = 'languageHouse_postalCodes.code',
}

export function useGetOrganizations(options: UseGetOrganizationsOptions) {
    return usePaginatedGet<OrganizationsData>(
        {
            path: '/organizations',
            queryParams: {
                type: options.type,
                'parentOrganization.id': options.parentId,
                fields: options.fields,
            },
            lazy: options.lazy,
        },
        { limit: options.limit ?? 30, page: 1 }
    )
}

export function useGetOrganization(organizationId: string) {
    return useGet<Organization>({
        path: `/organizations/${organizationId}`,
        queryParams: {
            fields: [
                GetOrganizationField.Id,
                GetOrganizationField.Name,
                GetOrganizationField.Type,
                GetOrganizationField.Emails,
                GetOrganizationField.Telephones,
                GetOrganizationField.AddressesStreet,
                GetOrganizationField.AddressesHouseNumber,
                GetOrganizationField.AddressesPostalCode,
                GetOrganizationField.AddressesLocality,
                GetOrganizationField.LanguageHousePostalCodesId,
                GetOrganizationField.LanguageHousePostalCodesCode,
            ],
        },
    })
}

export function usePostOrganization() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutOrganizationResponse, MutationError, any, PostPutOrganizationParams>({
        verb: 'POST',
        path: '/organizations',
    })
}

export function usePutOrganization(organizationId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutOrganizationResponse, MutationError, any, PostPutOrganizationParams>({
        verb: 'PUT',
        path: `/organizations/${organizationId}`,
    })
}

export function useDeleteOrganization(organizationId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/organizations/${organizationId}`,
    })
}
