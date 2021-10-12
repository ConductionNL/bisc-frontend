import { Organization } from 'api/types/types'
import { useGet } from 'restful-react'

export interface OrganizationsParams {}

export interface OrganizationsData {
    results: Organization[]
}

export function useGetOrganizations() {
    return useGet<OrganizationsData>({
        path: '/organizations',
    })
}

export function useGetOrganization(organizationId: string) {
    return useGet<Organization>({
        path: `/organizations/${organizationId}`,
    })
}
