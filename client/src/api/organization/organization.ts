import { usePaginatedGet } from 'api/common/pagination'
import { Organization, PaginatedResult } from 'api/types/types'
import { useGet } from 'restful-react'

export interface OrganizationsParams {}

export interface OrganizationsData extends PaginatedResult<Organization> {}

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
