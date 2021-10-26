// import { Organization } from 'api/types/types'
import { OrganizationEmployee } from 'api/types/types'
import { useGet } from 'restful-react'

export interface OrganizationEmployeesData {
    results: OrganizationEmployee[]
}

export function useOrganizationEmployees(organizationId: string) {
    return useGet<OrganizationEmployeesData>({
        path: '/employees',
        queryParams: { organizationId },
    })
}

export function useGetOrganizationEmployee(employeeId: string) {
    return useGet<OrganizationEmployee>({
        path: `/employees/${employeeId}`,
    })
}
