// import { Organization } from 'api/types/types'
import { usePaginatedGet } from 'api/common/pagination'
import { OrganizationEmployee, PaginatedResult } from 'api/types/types'
import { useGet } from 'restful-react'

export interface OrganizationEmployeesData extends PaginatedResult<OrganizationEmployee> {}

export function useOrganizationEmployees(organizationId: string) {
    return usePaginatedGet<OrganizationEmployeesData>(
        {
            path: '/employees',
            queryParams: { 'languageHouse.id': organizationId },
        },
        { limit: 30, page: 1 }
    )
}

export function useGetOrganizationEmployee(employeeId: string) {
    return useGet<OrganizationEmployee>({
        path: `/employees/${employeeId}`,
    })
}
