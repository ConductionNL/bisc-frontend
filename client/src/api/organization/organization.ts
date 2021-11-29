import { usePaginatedGet } from 'api/common/pagination'
import { MutationError, Organization, PaginatedResult } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { RecursivePartial } from 'utils/objects/objects'

export interface OrganizationsParams {}

export interface OrganizationsData extends PaginatedResult<Organization> {}

export type PostPutOrganizationResponse = Organization

export type PostPutOrganizationParams = RecursivePartial<Organization>

export function useGetTaalhuisOrganizations() {
    return usePaginatedGet<OrganizationsData>(
        {
            path: '/organizations',
            queryParams: { type: 'taalhuis' },
        },
        { limit: 30, page: 1 }
    )
}

export function useGetOrganization(organizationId: string) {
    return useGet<Organization>({
        path: `/organizations/${organizationId}`,
    })
}

export function usePostOrganization() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutOrganizationResponse, MutationError, any, PostPutOrganizationParams>({
        verb: 'POST',
        path: '/organizations',
    })
}
